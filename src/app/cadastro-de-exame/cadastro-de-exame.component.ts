import { Component, EventEmitter, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdPacienteService } from '../services/id-paciente.service';

@Component({
    selector: 'app-cadastro-de-exame',
    standalone: true,
    templateUrl: './cadastro-de-exame.component.html',
    styleUrl: './cadastro-de-exame.component.scss',
    imports: [MenuLateralComponent, 
              ToolbarComponent, 
              FooterComponent, 
              BuscaComponent,
              CommonModule,
              FormsModule,
              ReactiveFormsModule]
})
export class CadastroDeExameComponent {
    @Output() resultadoBusca: EventEmitter<string> = new EventEmitter<string>();

editando: boolean = false;
pacienteFiltrado: any ;
pacientesFiltrados: any; 
exameEmAndamento: boolean = false;
idGerado: string = '';

constructor(private router: Router,
            private idPacienteService: IdPacienteService) {
                this.exame = new FormGroup({
                    nomeexame: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
                    dataexame: new FormControl('', Validators.required),
                    horaexame: new FormControl('', Validators.required),
                    tipoexame: new FormControl('', [Validators.minLength(4), Validators.maxLength(32),  Validators.required]),
                    laboratorio: new FormControl('', [Validators.minLength(4), Validators.maxLength(32),  Validators.required]),
                    url: new FormControl(''),
                    resultados: new FormControl('', [Validators.minLength(16), Validators.maxLength(1024),  Validators.required])
                });
            }

exame = new FormGroup({
    nomeexame: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
    dataexame: new FormControl('', Validators.required),
    horaexame: new FormControl('', Validators.required),
    tipoexame: new FormControl('', [Validators.minLength(4), Validators.maxLength(32),  Validators.required]),
    laboratorio: new FormControl('', [Validators.minLength(4), Validators.maxLength(32),  Validators.required]),
    url: new FormControl(''),
    resultados: new FormControl('', [Validators.minLength(16), Validators.maxLength(1024),  Validators.required])

});

receberResultadoBusca(pacientesFiltrados: any) {
    if (pacientesFiltrados && pacientesFiltrados.length > 0) { // Verifica se há pacientes filtrados
        this.pacienteFiltrado = pacientesFiltrados[0];
        } else {
            this.pacienteFiltrado = null; // Limpa o paciente filtrado se não houver resultados
        };
    }

camposValidos(): boolean {
    return!!(
           this.exame.value.nomeexame && 
           this.exame.value.dataexame && 
           this.exame.value.horaexame && 
           this.exame.value.tipoexame && 
           this.exame.value.laboratorio && 
           this.exame.value.resultados
           );
}

pacienteSelecionado(paciente: any) {
    this.pacienteFiltrado = paciente;
    if (this.pacienteFiltrado) {
      this.pacienteFiltrado.consulta = this.pacienteFiltrado.exame || {}; // Garante que consulta não seja undefined
    }
  }

salvar() {
    if(this.camposValidos()){
        if(confirm("Deseja salvar o cadastro do Exame?")){
          this.exameEmAndamento = true;   
          
          if (this.editando) {
            this.editar();
          } else {
            this.cadastrarNovo();
          }
        }
      } else{
        console.error('Preencha todos os campos obrigatórios adequadamente!');
      }
        }

cadastrarNovo(){
    if (this.pacienteFiltrado) {
      if (!this.pacienteFiltrado.exames) {
           this.pacienteFiltrado.exames = []; // Inicializa o array de exames se não existir
                }
           this.idPacienteService.cadastrarExame(this.pacienteFiltrado.id, this.exame.value);
           this.exibirAlertaConfirmacao();
           this.exameEmAndamento = false;
           this.exame.reset();
   } else {
      window.alert('Nenhum paciente selecionado!');
    }
};

exibirAlertaConfirmacao(): void {
    const confirmacao = window.confirm('Cadastro salvo com sucesso!');
    if (confirmacao) {
      this.router.navigate(['/inicio']);
    } else {
      window.alert('Confira os dados e tente novamente.')
    }
  }

carregarExames() {
    const nomeexame = this.exame.value.nomeexame;
    if (!nomeexame) {
      alert("Por favor, preencha o nome do exame para editar.");
      return;
    }
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((p: any) => p.id === this.pacienteFiltrado.id);
    if (!paciente) {
        console.error('Paciente não encontrado.');
        return;
    }
    const exame = paciente.exames.find((c: any) => c.nomeexame === nomeexame);
    if (exame) {
      // Carregando os dados da exame no formulário para edição
      this.exame.patchValue(exame);
      this.idGerado = exame.id;
      this.editando = true; // Indicando que estamos editando
    } else {
      alert("Exame não encontrado.");
    }
}

editar(): void {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((p: any) => p.id === this.pacienteFiltrado.id);
    const index = paciente.exames.findIndex((c: any) => c.id === this.idGerado);
  if (index !== -1) {
    const exameOriginal = paciente.exames[index];
    const exameEditado = { ...exameOriginal, ...this.exame.value }; // Combinar os dados originais com os dados editados
    paciente.exames[index] = exameEditado;
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    alert("Alterações salvas com sucesso!");
    this.exame.reset();
  } else {
    alert("Exame não encontrado.");
  }
};

deletarExame() {
    const nomeexame = this.exame.value.nomeexame;
    if (!nomeexame) {
      alert("Por favor, preencha o nome do exame para deletar.");
      return;
    }
  
    if (confirm("Deseja realmente deletar este exame?")) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const paciente = pacientes.find((p: any) => p.id === this.pacienteFiltrado.id);
      if (!paciente) {
        console.error('Paciente não encontrado.');
        return;
      }
      const index = paciente.exames.findIndex((c: any) => c.nomeexame === nomeexame);
      if (index !== -1) {
        paciente.exames.splice(index, 1);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        alert("Exame deletado com sucesso!");
        this.exame.reset();
      } else {
        alert("Exame não encontrado.");
      }
    }
}

        

}
