import { Injectable } from '@angular/core';
import {
  Consulta,
  DadosConsulta,
  DadosExame,
  DadosPaciente,
  Exame,
  Paciente,
} from '../models/models';
import { gravarStorage, lerStorage } from './storage';

const CHAVE_PACIENTES = 'pacientes';

/**
 * Único ponto de acesso aos dados de pacientes, consultas e exames.
 * Toda busca, edição e exclusão é feita por id, nunca por nome.
 */
@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  // ---------- Pacientes ----------

  obterListaPacientes(): Paciente[] {
    const pacientes = lerStorage<Paciente[]>(CHAVE_PACIENTES, []);
    // Garante os arrays mesmo em registros antigos salvos sem eles.
    return pacientes.map((p) => ({
      ...p,
      consultas: p.consultas ?? [],
      exames: p.exames ?? [],
    }));
  }

  obterPaciente(id: string | null | undefined): Paciente | undefined {
    if (!id) return undefined;
    return this.obterListaPacientes().find((p) => p.id === id);
  }

  cadastrarPaciente(dados: DadosPaciente): Paciente {
    const pacientes = this.obterListaPacientes();
    const paciente: Paciente = {
      ...dados,
      id: this.gerarIdUnico(pacientes),
      consultas: [],
      exames: [],
    };
    pacientes.push(paciente);
    this.salvar(pacientes);
    return paciente;
  }

  atualizarPaciente(id: string, dados: DadosPaciente): boolean {
    const pacientes = this.obterListaPacientes();
    const index = pacientes.findIndex((p) => p.id === id);
    if (index === -1) return false;
    pacientes[index] = { ...pacientes[index], ...dados };
    this.salvar(pacientes);
    return true;
  }

  excluirPaciente(id: string): boolean {
    const pacientes = this.obterListaPacientes();
    const restantes = pacientes.filter((p) => p.id !== id);
    if (restantes.length === pacientes.length) return false;
    this.salvar(restantes);
    return true;
  }

  /** Busca por id exato ou por trecho de nome, telefone ou e-mail. Termo vazio retorna todos. */
  buscarPacientes(termo: string): Paciente[] {
    const pacientes = this.obterListaPacientes();
    const pesquisa = termo.trim().toLowerCase();
    if (!pesquisa) return pacientes;
    const apenasDigitos = pesquisa.replace(/\D/g, '');
    return pacientes.filter((p) => {
      const telefone = (p.telefonePaciente ?? '').replace(/\D/g, '');
      return (
        p.id === pesquisa ||
        (p.nomePaciente ?? '').toLowerCase().includes(pesquisa) ||
        (p.emailPaciente ?? '').toLowerCase().includes(pesquisa) ||
        (apenasDigitos.length > 0 && telefone.includes(apenasDigitos))
      );
    });
  }

  // ---------- Consultas ----------

  cadastrarConsulta(idPaciente: string, dados: DadosConsulta): Consulta | undefined {
    return this.adicionarItem(idPaciente, 'consultas', dados);
  }

  atualizarConsulta(idPaciente: string, idConsulta: string, dados: DadosConsulta): boolean {
    return this.atualizarItem(idPaciente, 'consultas', idConsulta, dados);
  }

  excluirConsulta(idPaciente: string, idConsulta: string): boolean {
    return this.excluirItem(idPaciente, 'consultas', idConsulta);
  }

  // ---------- Exames ----------

  cadastrarExame(idPaciente: string, dados: DadosExame): Exame | undefined {
    return this.adicionarItem(idPaciente, 'exames', dados);
  }

  atualizarExame(idPaciente: string, idExame: string, dados: DadosExame): boolean {
    return this.atualizarItem(idPaciente, 'exames', idExame, dados);
  }

  excluirExame(idPaciente: string, idExame: string): boolean {
    return this.excluirItem(idPaciente, 'exames', idExame);
  }

  // ---------- Estatísticas ----------

  obterTotais(): { pacientes: number; consultas: number; exames: number } {
    const pacientes = this.obterListaPacientes();
    return {
      pacientes: pacientes.length,
      consultas: pacientes.reduce((total, p) => total + p.consultas.length, 0),
      exames: pacientes.reduce((total, p) => total + p.exames.length, 0),
    };
  }

  // ---------- Internos ----------

  private adicionarItem<K extends 'consultas' | 'exames'>(
    idPaciente: string,
    lista: K,
    dados: Omit<Paciente[K][number], 'id'>
  ): Paciente[K][number] | undefined {
    const pacientes = this.obterListaPacientes();
    const paciente = pacientes.find((p) => p.id === idPaciente);
    if (!paciente) return undefined;
    const itens = paciente[lista] as Array<{ id: string }>;
    const novo = { ...dados, id: this.gerarIdUnico(itens) } as Paciente[K][number];
    itens.push(novo);
    this.salvar(pacientes);
    return novo;
  }

  private atualizarItem<K extends 'consultas' | 'exames'>(
    idPaciente: string,
    lista: K,
    idItem: string,
    dados: Omit<Paciente[K][number], 'id'>
  ): boolean {
    const pacientes = this.obterListaPacientes();
    const paciente = pacientes.find((p) => p.id === idPaciente);
    if (!paciente) return false;
    const itens = paciente[lista] as Array<{ id: string }>;
    const index = itens.findIndex((item) => item.id === idItem);
    if (index === -1) return false;
    itens[index] = { ...itens[index], ...dados, id: idItem };
    this.salvar(pacientes);
    return true;
  }

  private excluirItem(idPaciente: string, lista: 'consultas' | 'exames', idItem: string): boolean {
    const pacientes = this.obterListaPacientes();
    const paciente = pacientes.find((p) => p.id === idPaciente);
    if (!paciente) return false;
    const itens = paciente[lista] as Array<{ id: string }>;
    const index = itens.findIndex((item) => item.id === idItem);
    if (index === -1) return false;
    itens.splice(index, 1);
    this.salvar(pacientes);
    return true;
  }

  private salvar(pacientes: Paciente[]): void {
    gravarStorage(CHAVE_PACIENTES, pacientes);
  }

  /** Maior id existente + 1. Ignora ids não numéricos. */
  private gerarIdUnico(lista: Array<{ id: string }>): string {
    const maxId = lista.reduce((max, item) => {
      const n = parseInt(item.id, 10);
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 0);
    return String(maxId + 1);
  }
}
