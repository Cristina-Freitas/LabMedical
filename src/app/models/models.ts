export interface Usuario {
  nome: string;
  email: string;
  /** Hash SHA-256 da senha. A senha nunca é guardada em texto puro. */
  senhaHash: string;
}

export interface Consulta {
  id: string;
  motivoConsulta: string;
  dataconsulta: string;
  horaconsulta: string;
  descricaoProblema: string;
  medicacaoReceitada: string;
  dosagemEprecaucoes: string;
}

export interface Exame {
  id: string;
  nomeexame: string;
  dataexame: string;
  horaexame: string;
  tipoexame: string;
  laboratorio: string;
  url: string;
  resultados: string;
}

export interface DadosPaciente {
  nomePaciente: string;
  genero: string;
  cpf: string;
  datanascimento: string;
  rg: string;
  estadocivil: string;
  telefonePaciente: string;
  emailPaciente: string;
  naturalidade: string;
  contatoemergencia: string;
  alergias: string;
  cuidados: string;
  convenio: string;
  numeroconvenio: string;
  validadeconvenio: string;
  cep: string;
  cidade: string;
  logradouro: string;
  estado: string;
  numero: string;
  complemento: string;
  bairro: string;
  pontodereferencia: string;
}

export interface Paciente extends DadosPaciente {
  id: string;
  consultas: Consulta[];
  exames: Exame[];
}

export type DadosConsulta = Omit<Consulta, 'id'>;
export type DadosExame = Omit<Exame, 'id'>;
