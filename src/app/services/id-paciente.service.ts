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

  private gerarIdUnico(): string {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    return String(pacientes.length + 1);
  }
}
