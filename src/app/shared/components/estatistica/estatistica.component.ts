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
 
  
  constructor(){}

  ngOnInit(){ 
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');

  let totalPacientes = 0;
  let totalConsultas = 0;
  let totalExames = 0;
  
pacientes.forEach((paciente: any) => {
  totalPacientes++;
  totalConsultas += paciente.consultas.length;
  totalExames += paciente.exames.length;
}); 
this.contador[0] = totalPacientes;
this.contador[1] = totalConsultas;
this.contador[2] = totalExames; 
}

getIconClass(index: number): string {
  switch (index) {
    case 0:
      return 'pi pi-users'; // pacientes
    case 1:
      return 'pi pi-folder-plus'; //consultas
    case 2:
      return 'pi pi-file'; //exames
    default:
      return '';
  }
}

}
