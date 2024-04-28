import { Component, EventEmitter, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdPacienteService } from '../services/id-paciente.service';

@Component({
    selector: 'app-cadastro-de-consulta',
    standalone: true,
    templateUrl: './cadastro-de-consulta.component.html',
    styleUrl: './cadastro-de-consulta.component.scss',
    imports: [MenuLateralComponent, 
              ToolbarComponent, 
              FooterComponent, 
              BuscaComponent,
              CommonModule,
              FormsModule,
              ReactiveFormsModule]
})
export class CadastroDeConsultaComponent {
    @Output() resultadoBusca: EventEmitter<string> = new EventEmitter<string>();
cadastroEmAndamento: boolean = false;
editando: boolean = false;
pacienteFiltrado: any ;
pacientesFiltrados: any; 
consultaEmAndamento: boolean = false;
idGerado: string = '';

constructor(private router: Router, 
            private idPacienteService: IdPacienteService) {
                this.consulta = new FormGroup({
                    motivoConsulta: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
                    dataconsulta: new FormControl('', Validators.required),
                    horaconsulta: new FormControl('', Validators.required),
                    descricaoProblema: new FormControl('', [Validators.minLength(16), Validators.maxLength(1024),  Validators.required]),
                    medicacaoReceitada: new FormControl(''),
                    dosagemEprecaucoes: new FormControl('', [Validators.minLength(16), Validators.maxLength(256),  Validators.required])
                });
            }

consulta = new FormGroup({
    motivoConsulta: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
    dataconsulta: new FormControl('', Validators.required),
    horaconsulta: new FormControl('', Validators.required),
    descricaoProblema: new FormControl('', [Validators.minLength(16), Validators.maxLength(1024),  Validators.required]),
    medicacaoReceitada: new FormControl(''),
    dosagemEprecaucoes: new FormControl('', [Validators.minLength(16), Validators.maxLength(256),  Validators.required])

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
           this.consulta.value.motivoConsulta && 
           this.consulta.value.dataconsulta && 
           this.consulta.value.horaconsulta && 
           this.consulta.value.descricaoProblema && 
           this.consulta.value.dosagemEprecaucoes
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
deletarConsulta() {
    const motivoConsulta = this.consulta.value.motivoConsulta;
    if (!motivoConsulta) {
      alert("Por favor, preencha o motivo da consulta para deletar.");
      return;
    }
  
    if (confirm("Deseja realmente deletar esta consulta?")) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const paciente = pacientes.find((p: any) => p.id === this.pacienteFiltrado.id);
      if (!paciente) {
        console.error('Paciente não encontrado.');
        return;
      }
      const index = paciente.consultas.findIndex((c: any) => c.motivoConsulta === motivoConsulta);
      if (index !== -1) {
        paciente.consultas.splice(index, 1);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        alert("Consulta deletada com sucesso!");
        this.consulta.reset();
      } else {
        alert("Consulta não encontrada.");
      }
    }
}

pacienteSelecionado(paciente: any) {
    this.pacienteFiltrado = paciente;
    if (this.pacienteFiltrado) {
      this.pacienteFiltrado.consulta = this.pacienteFiltrado.consulta || {}; // Garante que consulta não seja undefined
    }
  }

carregarConsulta(){
    const motivoConsulta = this.consulta.value.motivoConsulta;
    if (!motivoConsulta) {
      alert("Por favor, preencha o motivo da consulta para editar.");
      return;
    }
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((p: any) => p.id === this.pacienteFiltrado.id);
    if (!paciente) {
        console.error('Paciente não encontrado.');
        return;
    }
    const consulta = paciente.consultas.find((c: any) => c.motivoConsulta === motivoConsulta);
    if (consulta) {
      // Carregando os dados da consulta no formulário para edição
      this.consulta.patchValue(consulta);
      this.idGerado = consulta.id;
      this.editando = true; // Indicando que estamos editando
    } else {
      alert("Consulta não encontrado.");
    }
}
editar(): void {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((p: any) => p.id === this.pacienteFiltrado.id);
    const index = paciente.consultas.findIndex((c: any) => c.id === this.idGerado);
  if (index !== -1) {
    const consultaOriginal = paciente.consultas[index];
    const consultaEditada = { ...consultaOriginal, ...this.consulta.value }; // Combinar os dados originais com os dados editados
    paciente.consultas[index] = consultaEditada;
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    alert("Alterações salvas com sucesso!");
    this.consulta.reset();
  } else {
    alert("Consulta não encontrada.");
  }
};
salvar() {
    if(this.camposValidos()){
        if(confirm("Deseja salvar o cadastro da Consulta?")){
          this.cadastroEmAndamento = true;   
          
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
        if (!this.pacienteFiltrado.consultas) {
          this.pacienteFiltrado.consultas = []; // Inicializa o array de consultas se não existir
        }
        this.idPacienteService.cadastrarConsulta(this.pacienteFiltrado.id, this.consulta.value);
        this.exibirAlertaConfirmacao();
        this.cadastroEmAndamento = false;
        this.consulta.reset();
      } else {
        window.alert('Nenhum paciente selecionado!');
      }
};
}

