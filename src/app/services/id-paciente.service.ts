import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdPacienteService {

  constructor() { }

  obterListaPacientes(): any[] {
    return JSON.parse(localStorage.getItem('pacientes') || '[]');
  }

  cadastrarPaciente(paciente: any): void {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const id = this.gerarIdUnico(pacientes);
    paciente.id = id;
    paciente.consultas = [];
    paciente.exames = [];
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  cadastrarConsulta(idPaciente: string, consulta: any): void {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((pac: any) => pac.id === idPaciente);
      if (paciente) {
      paciente.consultas = paciente.consultas || [];
      const idConsulta = this.gerarIdUnico(paciente.consultas); // Gera um ID único para a consulta
      consulta.id = idConsulta;
      paciente.consultas.push(consulta);
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }
  }

  cadastrarExame(idPaciente: string, exame: any): void {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find((pac: any) => pac.id === idPaciente);
      if (paciente) {
      paciente.exames = paciente.exames || [];
      const idExame = this.gerarIdUnico(paciente.exames); 
      exame.id = idExame;
      paciente.exames.push(exame);
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }
  }

  private gerarIdUnico(lista: any[]): string {
    // Verifica se a lista está vazia
    if (lista.length === 0) {
      return '1'; // Se estiver vazia, retorna o ID '1'
    } else {
      // Se não estiver vazia, encontra o maior ID existente e adiciona 1
      const maxId = lista.reduce((max, item) => Math.max(max, parseInt(item.id)), 0);
      return String(maxId + 1);
    }
  }
  // private gerarIdUnico(): string {
  //   const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
  //   return String(pacientes.length + 1);

    
  // }
}
