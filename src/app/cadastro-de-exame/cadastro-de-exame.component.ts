import { Component, EventEmitter, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

constructor(private router: Router) {}

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


salvar() {
        throw new Error('Method not implemented.');
        }

carregarExames() {
            throw new Error('Method not implemented.');
            }

editar() {
                throw new Error('Method not implemented.');
                }

deletarExame() {
        throw new Error('Method not implemented.');
        }

        

}
