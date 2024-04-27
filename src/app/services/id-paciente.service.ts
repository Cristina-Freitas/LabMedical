import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdPacienteService {

  constructor() { }

  cadastrarPaciente(paciente: any): void {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const id = this.gerarIdUnico();
    paciente.id = id;
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  cadastrarConsulta(idPaciente: string, consulta: any): void {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((pac: any) => pac.id === idPaciente);
      if (paciente) {
      paciente.consultas = paciente.consultas || [];
      const idConsulta = this.gerarIdUnico(); // Gera um ID único para a consulta
      consulta.id = idConsulta;
      paciente.consultas.push(consulta);
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }
  }

  private gerarIdUnico(): string {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    return String(pacientes.length + 1);
  }
}
