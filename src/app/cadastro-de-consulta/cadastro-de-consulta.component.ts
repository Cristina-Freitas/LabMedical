import { Component, EventEmitter, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdPacienteService } from '../services/id-paciente.service';
import { error } from 'console';

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
cadastroEmAndamento: any;
editando: any;
pacienteFiltrado: any | undefined;
pacientesFiltrados: any; 
consultaEmAndamento: any;

constructor(private router: Router, private idPacienteService: IdPacienteService) {}

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
throw new Error('Method not implemented.');
}
carregarConsulta() {
throw new Error('Method not implemented.');
}
editar(){};
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
     if (this.pacienteFiltrado) { // Verifica se há um paciente filtrado
        this.idPacienteService.cadastrarConsulta(
            this.pacienteFiltrado.id, this.consulta.value);
        // this.router.navigate(['/inicio']);
        this.exibirAlertaConfirmacao();
        this.cadastroEmAndamento = false;
        this.consulta.reset();
      } else {
        window.alert('Nenhum paciente selecionado!');
      }
    }
};


