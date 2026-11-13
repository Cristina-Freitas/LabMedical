import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { NgxMaskPipe } from 'ngx-mask';
import { MenuLateralComponent } from '../shared/components/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { PacienteService } from '../services/paciente.service';
import { Consulta, Exame, Paciente } from '../models/models';

/** Ordena do mais recente para o mais antigo (data + hora no formato ISO). */
const maisRecentePrimeiro = (a: string, b: string) => b.localeCompare(a);

@Component({
  selector: 'app-prontuario-do-paciente',
  standalone: true,
  templateUrl: './prontuario-do-paciente.component.html',
  styleUrl: './prontuario-do-paciente.component.scss',
  imports: [MenuLateralComponent, ToolbarComponent, FooterComponent, StepperModule, CommonModule, DatePipe, NgxMaskPipe],
})
export class ProntuarioDoPacienteComponent implements OnInit {
  paciente: Paciente | undefined;
  consultas: Consulta[] = [];
  exames: Exame[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.paciente = this.pacienteService.obterPaciente(this.route.snapshot.paramMap.get('id'));
    if (!this.paciente) return;

    this.consultas = [...this.paciente.consultas].sort((a, b) =>
      maisRecentePrimeiro(`${a.dataconsulta}T${a.horaconsulta}`, `${b.dataconsulta}T${b.horaconsulta}`)
    );
    this.exames = [...this.paciente.exames].sort((a, b) =>
      maisRecentePrimeiro(`${a.dataexame}T${a.horaexame}`, `${b.dataexame}T${b.horaexame}`)
    );
  }

  editarCadastro(): void {
    if (this.paciente) this.router.navigate(['/pacientes', this.paciente.id]);
  }

  novaConsulta(): void {
    if (this.paciente) this.router.navigate(['/consultas', this.paciente.id]);
  }

  novoExame(): void {
    if (this.paciente) this.router.navigate(['/exames', this.paciente.id]);
  }

  editarConsulta(idConsulta: string): void {
    if (this.paciente) this.router.navigate(['/consultas', this.paciente.id, idConsulta]);
  }

  editarExame(idExame: string): void {
    if (this.paciente) this.router.navigate(['/exames', this.paciente.id, idExame]);
  }
}
