import { Component, Inject } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AddressService } from '../services/address.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { IdPacienteService } from '../services/id-paciente.service';



@Component({
    selector: 'app-cadastro-de-paciente',
    standalone: true,
    templateUrl: './cadastro-de-paciente.component.html',
    styleUrl: './cadastro-de-paciente.component.scss',
    imports: [MenuLateralComponent, 
              ToolbarComponent, 
              FooterComponent,
              ReactiveFormsModule,
              CommonModule,
              FormsModule,
              RouterLink,
              NgxMaskDirective, NgxMaskPipe]
})
export class CadastroDePacienteComponent {
  address: any = {};
  http: any;
  usuario: any = [];
  cadastroEmAndamento: boolean = false;
  editando: boolean = false;
  idGerado: string = '';

    cadastro = new FormGroup({
        nomePaciente: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
        genero: new FormControl('', Validators.required),
        cpf: new FormControl('', Validators.required),
        datanascimento: new FormControl('', Validators.required),
        rg: new FormControl('', [Validators.maxLength(20), Validators.required]),
        estadocivil: new FormControl('', Validators.required),
        telefonePaciente: new FormControl('', Validators.required),
        emailPaciente: new FormControl('', Validators.required),
        naturalidade: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
        contatoemergencia: new FormControl('', Validators.required),
        alergias: new FormControl(''),
        cuidados: new FormControl(''),
        convenio: new FormControl(''),
        numeroconvenio: new FormControl(''),    
        validadeconvenio: new FormControl(''),
        cep: new FormControl('', Validators.required),
        cidade: new FormControl(''),
        logradouro: new FormControl(''),
        estado: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        pontodereferencia: new FormControl('', Validators.required)
      });
 
constructor(private router: Router,  
            private addressService: AddressService,
            private idPacienteService: IdPacienteService ){};
camposValidos(): boolean {
  return !!(
         this.cadastro.value.nomePaciente && 
         this.cadastro.value.genero && 
         this.cadastro.value.cpf && 
         this.cadastro.value.rg &&
         this.cadastro.value.estadocivil &&
         this.cadastro.value.telefonePaciente &&
         this.cadastro.value.emailPaciente &&
         this.cadastro.value.naturalidade &&
         this.cadastro.value.contatoemergencia &&
         this.cadastro.value.pontodereferencia
         
  );
};
exibirAlertaConfirmacao(): void {
  const confirmacao = window.confirm('Cadastro salvo com sucesso!');
  if (confirmacao) {
    this.router.navigate(['/inicio']);
  } else {
    window.alert('Confira os dados e tente novamente.')
  }
}


buscarCep(): void {
  const cep = this.cadastro.get('cep')?.value;
  if (cep) {
    this.addressService.getAddress(cep).subscribe({
      next: (response: any): void => {
        this.address = response;
        this.cadastro.patchValue({
          cep: this.cadastro.value.cep,
          cidade: response.localidade,
          estado: response.uf,
          numero: this.cadastro.value.numero,
          complemento: this.cadastro.value.complemento,
          bairro: response.bairro,
          pontodereferencia: this.cadastro.value.pontodereferencia,
          logradouro: response.logradouro,
        });
      },
      error: (error: any) => {
        console.error('Erro ao buscar endereço:', error);
      },
      // complete: () => {
      //   this.cadastroEmAndamento = false;
      // }
    });
  } else {
    console.error('CEP não especificado.');
  }

}

salvar() {
  if(this.camposValidos()){
    if(confirm("Deseja salvar o cadastro do paciente?")){
      this.cadastroEmAndamento = true;   
      
      if (this.editando) {
        this.editar();
      } else {
        this.cadastrarNovo();
      }
    }
  } else {
    window.alert('Preencha todos os campos obrigatórios!');
  }
}
cadastrarNovo(): void {
  const paciente = this.cadastro.value;
  this.idPacienteService.cadastrarPaciente(paciente);
  this.router.navigate(['/inicio']);
  this.cadastro.reset();
  this.exibirAlertaConfirmacao();
  this.cadastroEmAndamento = false;
}

deletarPaciente() {
  const nomePaciente = this.cadastro.value.nomePaciente;
  if (!nomePaciente) {
    alert("Por favor, preencha o nome do paciente para deletar.");
    return;
  }

  if (confirm("Deseja realmente deletar este paciente?")) {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const index = pacientes.findIndex((paciente: any) => paciente.nomePaciente === nomePaciente);
    if (index !== -1) {
      pacientes.splice(index, 1);
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
      alert("Paciente deletado com sucesso!");
      this.router.navigate(['/inicio']);
    } else {
      alert("Paciente não encontrado.");
    }
  }
}

carregarPaciente(): void {
  const nomePaciente = this.cadastro.get('nomePaciente')?.value;
    if (!nomePaciente) {
      alert("Por favor, preencha o nome do paciente para editar.");
      return;
    }

    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((p: any) => p.nomePaciente === nomePaciente);
    if (paciente) {
      // Carregando os dados do paciente no formulário para edição
      this.cadastro.patchValue(paciente);
      this.idGerado = paciente.id;
      this.editando = true; // Indicando que estamos editando
    } else {
      alert("Paciente não encontrado.");
    }
}

editar(): void {
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
  const index = pacientes.findIndex((p: any) => p.id === this.idGerado);
  if (index !== -1) {
    const pacienteOriginal = pacientes[index];
    const pacienteEditado = { ...pacienteOriginal, ...this.cadastro.value }; // Combinar os dados originais com os dados editados
    pacientes[index] = pacienteEditado;
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    alert("Alterações salvas com sucesso!");
    this.router.navigate(['/inicio']);
  } else {
    alert("Paciente não encontrado.");
  }
}

}
