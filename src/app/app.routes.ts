import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { authGuard } from './shared/guards/auth.guard';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar/toolbar.component';
import { CadastroDePacienteComponent } from './cadastro-de-paciente/cadastro-de-paciente.component';
import { CadastroDeConsultaComponent } from './cadastro-de-consulta/cadastro-de-consulta.component';
import { CadastroDeExameComponent } from './cadastro-de-exame/cadastro-de-exame.component';
import { ListagemDeProntuarioComponent } from './listagem-de-prontuario/listagem-de-prontuario.component';
import { ProntuarioDoPacienteComponent } from './prontuario-do-paciente/prontuario-do-paciente.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent

    },

    {
        path: 'inicio',
        component: InicioComponent
        // canActivate: [authGuard],

    },

    {
        path: 'menu',
        component: MenuLateralComponent

    },

    {
        path: 'toolbar',
        component: ToolbarComponent

    },

    {
        path: 'pacientes',
        component: CadastroDePacienteComponent

    },

    {
        path: 'consultas',
        component: CadastroDeConsultaComponent
    },

    {
        path: 'exames',
        component: CadastroDeExameComponent

    },

    {
        path: 'lista',
        component: ListagemDeProntuarioComponent

    },

    {
        path: 'prontuario',
        component: ProntuarioDoPacienteComponent

    },
];
