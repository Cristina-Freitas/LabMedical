import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuLateralComponent } from '../shared/components/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BuscaComponent } from '../shared/components/busca/busca.component';
import { PacienteService } from '../services/paciente.service';
import { DadosConsulta, Paciente } from '../models/models';

const campo = (validators: ValidatorFn[] = []) => new FormControl('', { nonNullable: true, validators });

/**
 * Rotas:
 *  /consultas                          -> buscar o paciente
 *  /consultas/:pacienteId              -> nova consulta para o paciente
 *  /consultas/:pacienteId/:consultaId  -> editar consulta existente
 */
@Component({
  selector: 'app-cadastro-de-consulta',
  standalone: true,
  templateUrl: './cadastro-de-consulta.component.html',
  styleUrl: './cadastro-de-consulta.component.scss',
  imports: [MenuLateralComponent, ToolbarComponent, FooterComponent, BuscaComponent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CadastroDeConsultaComponent implements OnInit, OnDestroy {
  paciente: Paciente | undefined;
  consultaId: string | null = null;
  resultadosBusca: Paciente[] = [];
  private inscricao?: Subscription;

  consulta = new FormGroup({
    motivoConsulta: campo([Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    dataconsulta: campo([Validators.required]),
    horaconsulta: campo([Validators.required]),
    descricaoProblema: campo([Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    medicacaoReceitada: campo(),
    dosagemEprecaucoes: campo([Validators.required, Validators.minLength(16), Validators.maxLength(256)]),
  });

  constructor(private router: Router, private route: ActivatedRoute, private pacienteService: PacienteService) {}

  ngOnInit(): void {
    // paramMap (e não snapshot) porque o Angular reaproveita o componente ao trocar só os parâmetros.
    this.inscricao = this.route.paramMap.subscribe((params) => {
      this.carregar(params.get('pacienteId'), params.get('consultaId'));
    });
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }

  private carregar(pacienteId: string | null, consultaId: string | null): void {
    this.consulta.reset();
    this.resultadosBusca = [];
    this.consultaId = null;
    this.paciente = undefined;
    if (!pacienteId) return;

    this.paciente = this.pacienteService.obterPaciente(pacienteId);
    if (!this.paciente) {
      window.alert('Paciente não encontrado.');
      this.router.navigate(['/consultas']);
      return;
    }

    if (consultaId) {
      const consulta = this.paciente.consultas.find((c) => c.id === consultaId);
      if (!consulta) {
        window.alert('Consulta não encontrada.');
        this.router.navigate(['/consultas', pacienteId]);
        return;
      }
      this.consultaId = consulta.id;
      const { id, ...dados } = consulta;
      this.consulta.patchValue(dados);
    }
  }

  receberResultadoBusca(pacientes: Paciente[]): void {
    if (pacientes.length === 1) {
      this.selecionarPaciente(pacientes[0].id);
    } else {
      this.resultadosBusca = pacientes;
    }
  }

  selecionarPaciente(id: string): void {
    this.router.navigate(['/consultas', id]);
  }

  salvar(): void {
    if (!this.paciente) {
      window.alert('Busque e selecione um paciente antes de salvar.');
      return;
    }
    if (this.consulta.invalid) {
      this.consulta.markAllAsTouched();
      window.alert('Preencha corretamente todos os campos obrigatórios (marcados com *).');
      return;
    }
    if (!window.confirm('Deseja salvar a consulta?')) return;

    const dados: DadosConsulta = this.consulta.getRawValue();
    const ok = this.consultaId
      ? this.pacienteService.atualizarConsulta(this.paciente.id, this.consultaId, dados)
      : !!this.pacienteService.cadastrarConsulta(this.paciente.id, dados);

    if (!ok) {
      window.alert('Não foi possível salvar: paciente ou consulta não encontrados.');
      return;
    }
    window.alert(this.consultaId ? 'Alterações salvas com sucesso!' : 'Consulta cadastrada com sucesso!');
    this.router.navigate(['/prontuario', this.paciente.id]);
  }

  deletarConsulta(): void {
    if (!this.paciente || !this.consultaId) return;
    if (!window.confirm('Deseja realmente excluir esta consulta?')) return;

    if (this.pacienteService.excluirConsulta(this.paciente.id, this.consultaId)) {
      window.alert('Consulta excluída com sucesso!');
      this.router.navigate(['/prontuario', this.paciente.id]);
    } else {
      window.alert('Consulta não encontrada.');
    }
  }
}
