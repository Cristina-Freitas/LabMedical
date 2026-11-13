import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../models/models';
import { PacienteService } from '../../../services/paciente.service';

/**
 * Barra de busca reutilizável. Emite TODOS os pacientes encontrados
 * (ou a lista completa quando o campo está vazio); quem usa decide o que mostrar.
 */
@Component({
  selector: 'app-busca',
  standalone: true,
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
  imports: [FormsModule],
})
export class BuscaComponent {
  @Input() title = 'Encontre o Paciente';
  @Output() resultadoBusca = new EventEmitter<Paciente[]>();
  pesquisarPaciente = '';

  constructor(private pacienteService: PacienteService) {}

  pesquisar(): void {
    const encontrados = this.pacienteService.buscarPacientes(this.pesquisarPaciente);
    if (this.pesquisarPaciente.trim() && encontrados.length === 0) {
      window.alert('Sua busca não encontrou resultados.');
    }
    this.resultadoBusca.emit(encontrados);
  }
}
