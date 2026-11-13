import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from '../shared/components/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BuscaComponent } from '../shared/components/busca/busca.component';
import { EstatisticaComponent } from '../shared/components/estatistica/estatistica.component';
import { CardsComponent } from '../shared/components/cards/cards.component';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/models';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  imports: [MenuLateralComponent, ToolbarComponent, CommonModule, FooterComponent, BuscaComponent, EstatisticaComponent, CardsComponent],
})
export class InicioComponent implements OnInit {
  pacientesExibidos: Paciente[] = [];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.pacientesExibidos = this.pacienteService.obterListaPacientes();
  }

  /** A busca já devolve a lista completa quando o termo está vazio. */
  receberResultadoBusca(pacientes: Paciente[]): void {
    this.pacientesExibidos = pacientes;
  }
}
