import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-estatistica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatistica.component.html',
  styleUrl: './estatistica.component.scss'
})
export class EstatisticaComponent {
  listaEstatistica = [
    'Pacientes',
    'Consultas',
    'Exames'
  ]

  contador = [0,0,0]
  localStorage: any;
  
  constructor(){}

  ngOnInit(){
    
     const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
     const consultas = JSON.parse(localStorage.getItem('consultas') || '[]');
     const exames = JSON.parse(localStorage.getItem('exames') || '[]');
 
     this.contador[0] = pacientes.length;
     this.contador[1] = consultas.length;
     this.contador[2] = exames.length;
  }
}
