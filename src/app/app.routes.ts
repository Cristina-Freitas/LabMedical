import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { authGuard } from './shared/guards/auth.guard';
import { CadastroDePacienteComponent } from './cadastro-de-paciente/cadastro-de-paciente.component';
import { CadastroDeConsultaComponent } from './cadastro-de-consulta/cadastro-de-consulta.component';
import { CadastroDeExameComponent } from './cadastro-de-exame/cadastro-de-exame.component';
import { ListagemDeProntuarioComponent } from './listagem-de-prontuario/listagem-de-prontuario.component';
import { ProntuarioDoPacienteComponent } from './prontuario-do-paciente/prontuario-do-paciente.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Todas as rotas abaixo exigem login.
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },

      // Paciente: /pacientes cria, /pacientes/:id edita
      { path: 'pacientes', component: CadastroDePacienteComponent },
      { path: 'pacientes/:id', component: CadastroDePacienteComponent },

      // Consulta: sem paciente, com paciente (nova) ou com paciente e consulta (edição)
      { path: 'consultas', component: CadastroDeConsultaComponent },
      { path: 'consultas/:pacienteId', component: CadastroDeConsultaComponent },
      { path: 'consultas/:pacienteId/:consultaId', component: CadastroDeConsultaComponent },

      // Exame: mesma lógica da consulta
      { path: 'exames', component: CadastroDeExameComponent },
      { path: 'exames/:pacienteId', component: CadastroDeExameComponent },
      { path: 'exames/:pacienteId/:exameId', component: CadastroDeExameComponent },

      { path: 'lista', component: ListagemDeProntuarioComponent },
      { path: 'prontuario/:id', component: ProntuarioDoPacienteComponent },
      { path: 'prontuario', redirectTo: 'lista', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'inicio' },
];
