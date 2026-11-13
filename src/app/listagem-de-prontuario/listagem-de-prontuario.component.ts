import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MenuLateralComponent } from '../shared/components/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BuscaComponent } from '../shared/components/busca/busca.component';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/models';

@Component({
  selector: 'app-listagem-de-prontuario',
  standalone: true,
  templateUrl: './listagem-de-prontuario.component.html',
  styleUrl: './listagem-de-prontuario.component.scss',
  imports: [MenuLateralComponent, ToolbarComponent, FooterComponent, BuscaComponent, TableModule, CommonModule, CardModule],
})
export class ListagemDeProntuarioComponent implements OnInit {
  pacientesExibidos: Paciente[] = [];

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {
    this.pacientesExibidos = this.pacienteService.obterListaPacientes();
  }

  receberResultadoBusca(pacientes: Paciente[]): void {
    this.pacientesExibidos = pacientes;
  }

  clicarPaciente(paciente: Paciente): void {
    this.router.navigate(['/prontuario', paciente.id]);
  }
}
