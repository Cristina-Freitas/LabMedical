import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IdPacienteService } from '../services/id-paciente.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-listagem-de-prontuario',
    standalone: true,
    templateUrl: './listagem-de-prontuario.component.html',
    styleUrl: './listagem-de-prontuario.component.scss',
    imports: [MenuLateralComponent, 
              ToolbarComponent, 
              FooterComponent, 
              BuscaComponent,
              TableModule,
              CommonModule,
              CardModule]
})
export class ListagemDeProntuarioComponent implements OnInit{
 @Output() resultadoBusca: EventEmitter<string> = new EventEmitter<string>();

 lista: any[] = [];
 pacientes: any;
 paciente: any;
 pacienteFiltrado: any ;
 pacientesFiltrados: any; 

constructor(private idPacienteService: IdPacienteService, private router: Router) {}

ngOnInit(): void {
    this.carregarListaPacientes();
    // this.pacienteFiltrado = [...this.lista];
  }

  carregarListaPacientes(): void {
    this.lista = this.idPacienteService.obterListaPacientes();
  }

receberResultadoBusca(pacientesFiltrados: any) {
    if (pacientesFiltrados && pacientesFiltrados.length > 0) { // Verifica se há pacientes filtrados
        this.pacienteFiltrado = pacientesFiltrados[0];
    } else {
        this.pacienteFiltrado = null; // Limpa o paciente filtrado se não houver resultados
    };
}

clicarPaciente(paciente: any): void {
    this.router.navigate(['/prontuario', paciente.id]);
 
    }
}
