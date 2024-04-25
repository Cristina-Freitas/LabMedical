import { Component, Inject } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AddressService } from '../services/address.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



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
        pontodereferencia: new FormControl('')
      });
 
constructor(private router: Router,  private addressService: AddressService ){};
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
         this.cadastro.value.contatoemergencia
         
  );
};
salvar() {
  if(this.camposValidos()){
       
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
     pacientes.push(this.cadastro.value);
     localStorage.setItem('pacientes', JSON.stringify(pacientes)); 
     this.router.navigate(['']);
     this.cadastro.reset();
 }else{
   window.alert('Preencha todos os campos obrigatórios!')
 }
}

buscarCep(): void {
  const cep = this.cadastro.get('cep')?.value;
  if (cep) {
    this.addressService.getAddress(cep).subscribe({
      next: (response: any): void => {
        this.address = response;
        this.cadastro.patchValue({
          nomePaciente: this.cadastro.value.nomePaciente,
          genero: this.cadastro.value.genero,
          cpf: this.cadastro.value.cpf,
          datanascimento: this.cadastro.value.datanascimento,
          rg: this.cadastro.value.rg,
          estadocivil: this.cadastro.value.estadocivil,
          telefonePaciente: this.cadastro.value.telefonePaciente,
          emailPaciente: this.cadastro.value.emailPaciente,
          naturalidade: this.cadastro.value.naturalidade,
          contatoemergencia: this.cadastro.value.contatoemergencia,
          alergias: this.cadastro.value.alergias,
          cuidados: this.cadastro.value.cuidados,
          convenio: this.cadastro.value.convenio,
          numeroconvenio: this.cadastro.value.numeroconvenio,
          validadeconvenio: this.cadastro.value.validadeconvenio,
          cep: this.cadastro.value.cep,
          cidade: this.cadastro.value.cidade,
          estado: this.cadastro.value.estado,
          numero: this.cadastro.value.numero,
          complemento: this.cadastro.value.complemento,
          bairro: this.cadastro.value.bairro,
          pontodereferencia: this.cadastro.value.pontodereferencia,
          logradouro: this.address.logradouro,
        });
      },
      error: (error: any) => {
        console.error('Erro ao buscar endereço:', error);
      }
    });
  } else {
    console.error('CEP não especificado.');
  }

}
}
