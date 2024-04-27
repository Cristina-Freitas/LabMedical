import { Component, EventEmitter, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

constructor(private router: Router) {}

consulta = new FormGroup({
    motivoConsulta: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
    dataconsulta: new FormControl('', Validators.required),
    horaconsulta: new FormControl('', Validators.required),
    descricaoProblema: new FormControl('', [Validators.minLength(16), Validators.maxLength(1024),  Validators.required]),
    medicacaoReceitada: new FormControl(''),
    dosagemEprecaucoes: new FormControl('', [Validators.minLength(16), Validators.maxLength(256),  Validators.required])

});

receberResultadoBusca(pacientesFiltrados: any) {
        // Verifica se há pacientes filtrados
        if (pacientesFiltrados && pacientesFiltrados.length > 0) {
            // Neste exemplo, estamos apenas pegando o primeiro paciente da lista
            this.pacienteFiltrado = pacientesFiltrados[0];
        } else {
            this.pacienteFiltrado = null; // Limpa o paciente filtrado se não houver resultados
        }
    }
deletarConsulta() {
throw new Error('Method not implemented.');
}
carregarConsulta() {
throw new Error('Method not implemented.');
}
salvar() {
throw new Error('Method not implemented.');
}

}
