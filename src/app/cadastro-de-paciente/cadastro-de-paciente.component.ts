import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MenuLateralComponent } from '../shared/components/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { AddressService } from '../services/address.service';
import { PacienteService } from '../services/paciente.service';
import { DadosPaciente } from '../models/models';

const campo = (validators: ValidatorFn[] = []) => new FormControl('', { nonNullable: true, validators });

@Component({
  selector: 'app-cadastro-de-paciente',
  standalone: true,
  templateUrl: './cadastro-de-paciente.component.html',
  styleUrl: './cadastro-de-paciente.component.scss',
  imports: [MenuLateralComponent, ToolbarComponent, FooterComponent, ReactiveFormsModule, CommonModule, FormsModule, RouterLink, NgxMaskDirective, NgxMaskPipe],
})
export class CadastroDePacienteComponent implements OnInit {
  /** Preenchido quando a rota é /pacientes/:id (modo edição). */
  idPaciente: string | null = null;
  nomeOriginal = '';

  cadastro = new FormGroup({
    nomePaciente: campo([Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    genero: campo([Validators.required]),
    cpf: campo([Validators.required]),
    datanascimento: campo([Validators.required]),
    rg: campo([Validators.required, Validators.maxLength(20)]),
    estadocivil: campo([Validators.required]),
    telefonePaciente: campo([Validators.required]),
    emailPaciente: campo([Validators.required, Validators.email]),
    naturalidade: campo([Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    contatoemergencia: campo([Validators.required]),
    alergias: campo(),
    cuidados: campo(),
    convenio: campo(),
    numeroconvenio: campo(),
    validadeconvenio: campo(),
    cep: campo([Validators.required]),
    cidade: campo(),
    logradouro: campo(),
    estado: campo(),
    numero: campo(),
    complemento: campo(),
    bairro: campo(),
    pontodereferencia: campo([Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const paciente = this.pacienteService.obterPaciente(id);
    if (!paciente) {
      window.alert('Paciente não encontrado.');
      this.router.navigate(['/pacientes']);
      return;
    }
    this.idPaciente = paciente.id;
    this.nomeOriginal = paciente.nomePaciente;
    // patchValue ignora as chaves extras (id, consultas, exames).
    // Valores antigos salvos como número viram texto para manter o tipo do formulário.
    const valores: Record<string, string> = {};
    Object.keys(this.cadastro.controls).forEach((chave) => {
      const valor = (paciente as unknown as Record<string, unknown>)[chave];
      valores[chave] = valor === null || valor === undefined ? '' : String(valor);
    });
    this.cadastro.patchValue(valores);
  }

  buscarCep(): void {
    const cep = this.cadastro.controls.cep.value.replace(/\D/g, '');
    if (cep.length !== 8) {
      window.alert('Digite um CEP com 8 dígitos.');
      return;
    }
    this.addressService.getAddress(cep).subscribe({
      next: (endereco) => {
        if (endereco.erro) {
          window.alert('CEP não encontrado.');
          return;
        }
        this.cadastro.patchValue({
          cidade: endereco.localidade ?? '',
          estado: endereco.uf ?? '',
          bairro: endereco.bairro ?? '',
          logradouro: endereco.logradouro ?? '',
        });
      },
      error: () => window.alert('Não foi possível consultar o CEP. Verifique sua conexão e tente novamente.'),
    });
  }

  salvar(): void {
    if (this.cadastro.invalid) {
      this.cadastro.markAllAsTouched();
      window.alert('Preencha corretamente todos os campos obrigatórios (marcados com *).');
      return;
    }
    if (!window.confirm('Deseja salvar o cadastro do paciente?')) return;

    const dados: DadosPaciente = this.cadastro.getRawValue();
    if (this.idPaciente) {
      if (!this.pacienteService.atualizarPaciente(this.idPaciente, dados)) {
        window.alert('Paciente não encontrado.');
        return;
      }
      window.alert('Alterações salvas com sucesso!');
    } else {
      this.pacienteService.cadastrarPaciente(dados);
      window.alert('Paciente cadastrado com sucesso!');
    }
    this.router.navigate(['/inicio']);
  }

  deletarPaciente(): void {
    if (!this.idPaciente) return;
    const confirmar = window.confirm(
      `Deseja realmente excluir ${this.nomeOriginal}? As consultas e exames deste paciente também serão excluídos.`
    );
    if (!confirmar) return;

    if (this.pacienteService.excluirPaciente(this.idPaciente)) {
      window.alert('Paciente excluído com sucesso!');
      this.router.navigate(['/inicio']);
    } else {
      window.alert('Paciente não encontrado.');
    }
  }
}
