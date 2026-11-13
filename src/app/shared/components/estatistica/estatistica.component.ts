import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-estatistica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatistica.component.html',
  styleUrl: './estatistica.component.scss',
})
export class EstatisticaComponent implements OnInit {
  listaEstatistica = ['Pacientes', 'Consultas', 'Exames'];
  contador = [0, 0, 0];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    const totais = this.pacienteService.obterTotais();
    this.contador = [totais.pacientes, totais.consultas, totais.exames];
  }

  getIconClass(index: number): string {
    return ['pi pi-users', 'pi pi-folder-plus', 'pi pi-file'][index] ?? '';
  }
}
