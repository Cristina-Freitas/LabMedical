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
import { DadosExame, Paciente } from '../models/models';

const campo = (validators: ValidatorFn[] = []) => new FormControl('', { nonNullable: true, validators });

/**
 * Rotas:
 *  /exames                          -> buscar o paciente
 *  /exames/:pacienteId              -> novo exame para o paciente
 *  /exames/:pacienteId/:exameId  -> editar exame existente
 */
@Component({
  selector: 'app-cadastro-de-exame',
  standalone: true,
  templateUrl: './cadastro-de-exame.component.html',
  styleUrl: './cadastro-de-exame.component.scss',
  imports: [MenuLateralComponent, ToolbarComponent, FooterComponent, BuscaComponent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CadastroDeExameComponent implements OnInit, OnDestroy {
  paciente: Paciente | undefined;
  exameId: string | null = null;
  resultadosBusca: Paciente[] = [];
  private inscricao?: Subscription;

  exame = new FormGroup({
    nomeexame: campo([Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    dataexame: campo([Validators.required]),
    horaexame: campo([Validators.required]),
    tipoexame: campo([Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
    laboratorio: campo([Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
    url: campo(),
    resultados: campo([Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
  });

  constructor(private router: Router, private route: ActivatedRoute, private pacienteService: PacienteService) {}

  ngOnInit(): void {
    // paramMap (e não snapshot) porque o Angular reaproveita o componente ao trocar só os parâmetros.
    this.inscricao = this.route.paramMap.subscribe((params) => {
      this.carregar(params.get('pacienteId'), params.get('exameId'));
    });
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }

  private carregar(pacienteId: string | null, exameId: string | null): void {
    this.exame.reset();
    this.resultadosBusca = [];
    this.exameId = null;
    this.paciente = undefined;
    if (!pacienteId) return;

    this.paciente = this.pacienteService.obterPaciente(pacienteId);
    if (!this.paciente) {
      window.alert('Paciente não encontrado.');
      this.router.navigate(['/exames']);
      return;
    }

    if (exameId) {
      const exame = this.paciente.exames.find((e) => e.id === exameId);
      if (!exame) {
        window.alert('Exame não encontrado.');
        this.router.navigate(['/exames', pacienteId]);
        return;
      }
      this.exameId = exame.id;
      const { id, ...dados } = exame;
      this.exame.patchValue(dados);
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
    this.router.navigate(['/exames', id]);
  }

  salvar(): void {
    if (!this.paciente) {
      window.alert('Busque e selecione um paciente antes de salvar.');
      return;
    }
    if (this.exame.invalid) {
      this.exame.markAllAsTouched();
      window.alert('Preencha corretamente todos os campos obrigatórios (marcados com *).');
      return;
    }
    if (!window.confirm('Deseja salvar o exame?')) return;

    const dados: DadosExame = this.exame.getRawValue();
    const ok = this.exameId
      ? this.pacienteService.atualizarExame(this.paciente.id, this.exameId, dados)
      : !!this.pacienteService.cadastrarExame(this.paciente.id, dados);

    if (!ok) {
      window.alert('Não foi possível salvar: paciente ou exame não encontrados.');
      return;
    }
    window.alert(this.exameId ? 'Alterações salvas com sucesso!' : 'Exame cadastrado com sucesso!');
    this.router.navigate(['/prontuario', this.paciente.id]);
  }

  deletarExame(): void {
    if (!this.paciente || !this.exameId) return;
    if (!window.confirm('Deseja realmente excluir este exame?')) return;

    if (this.pacienteService.excluirExame(this.paciente.id, this.exameId)) {
      window.alert('Exame excluído com sucesso!');
      this.router.navigate(['/prontuario', this.paciente.id]);
    } else {
      window.alert('Exame não encontrado.');
    }
  }
}
