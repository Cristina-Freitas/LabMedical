import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { Router } from '@angular/router';
import { EstatisticaComponent } from "../shared/components/estatistica/estatistica.component";
import { CardsComponent } from "../shared/components/cards/cards.component";
import { IdPacienteService } from '../services/id-paciente.service';


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent, CommonModule, FooterComponent, BuscaComponent, EstatisticaComponent, CardsComponent]
})
export class InicioComponent implements OnInit{
@Output() resultadoBusca: EventEmitter<string> = new EventEmitter<string>();
    listaEstatistica = [
        'Pacientes',
        'Consultas',
        'Exames'
      ]
    
contador = [0,0,0]
localStorage: any;
pacienteFiltrado: any;
lista: any;
pacientes: any[] = [];
  cadastro: any;
  idGerado: any;
  editando: boolean = true;
      
constructor(private router: Router, private idPacienteService: IdPacienteService){
        
      }
    
      ngOnInit(): void {
        this.carregarListaPacientes();
        this.pacienteFiltrado = [...this.lista];   
        
      }

      carregarListaPacientes(): void {
        this.lista = this.idPacienteService.obterListaPacientes();
      }

      receberResultadoBusca(pacientesFiltrados: any): void {
        if (pacientesFiltrados && pacientesFiltrados.length > 0) { // Verifica se há pacientes filtrados
            this.pacienteFiltrado = pacientesFiltrados[0];
            this.pacientes = [this.pacienteFiltrado].slice();
        } else {
            this.pacienteFiltrado = null; // Limpa o paciente filtrado se não houver resultados
            this.pacientes = this.lista.slice();
        };
    }
    clicarPaciente(paciente: any): void {
      this.router.navigate(['/pacientes', paciente.id]);
   
      }
    
    }


