import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";
import { Router } from '@angular/router';
import { EstatisticaComponent } from "../shared/components/estatistica/estatistica.component";
import { CardsComponent } from "../shared/components/cards/cards.component";


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent, CommonModule, FooterComponent, BuscaComponent, EstatisticaComponent, CardsComponent]
})
export class InicioComponent {


    listaEstatistica = [
        'Pacientes',
        'Consultas',
        'Exames'
      ]
    
    contador = [0,0,0]
    localStorage: any;
    pacienteFiltrado: any;
lista: any;
      
      constructor(private router: Router){
        
      }
    
      ngOnInit(){
        
      }

      receberResultadoBusca(pacientesFiltrados: any) {
        if (pacientesFiltrados && pacientesFiltrados.length > 0) { // Verifica se há pacientes filtrados
            this.pacienteFiltrado = pacientesFiltrados[0];
        } else {
            this.pacienteFiltrado = null; // Limpa o paciente filtrado se não houver resultados
        };
    }

    clicarPaciente(paciente: any): void {
        this.router.navigate(['/paciente', paciente.id]);
     
        }

        recebeuPaciente($event: any) {
            throw new Error('Method not implemented.');
            }
    
    }


