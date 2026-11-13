import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Validador do grupo: a confirmação precisa ser igual à senha. */
function senhasIguais(grupo: AbstractControl): ValidationErrors | null {
  const senha = grupo.get('senhaUsuario')?.value;
  const confirmacao = grupo.get('confirmarSenhaUsuario')?.value;
  return senha && confirmacao && senha !== confirmacao ? { senhasDiferentes: true } : null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, CommonModule, ButtonModule, DialogModule, DividerModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  cadastro = new FormGroup(
    {
      nomeUsuario: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      emailUsuario: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      senhaUsuario: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(9)] }),
      confirmarSenhaUsuario: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(9)],
      }),
    },
    { validators: senhasIguais }
  );

  login = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  visible = false;
  entrando = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // Quem já está logado não precisa ver a tela de login.
    if (this.auth.estaLogado()) {
      this.router.navigate(['/inicio']);
    }
  }

  showDialog(): void {
    this.visible = true;
  }

  async cadastrar(): Promise<void> {
    if (this.cadastro.invalid) {
      this.cadastro.markAllAsTouched();
      const mensagem = this.cadastro.hasError('senhasDiferentes')
        ? 'As senhas não conferem.'
        : 'Preencha todos os campos corretamente: nome, e-mail válido e senha com pelo menos 9 caracteres.';
      window.alert(mensagem);
      return;
    }

    const { nomeUsuario, emailUsuario, senhaUsuario } = this.cadastro.getRawValue();
    const criado = await this.auth.cadastrar(nomeUsuario, emailUsuario, senhaUsuario);
    if (!criado) {
      window.alert('Já existe uma conta com este e-mail.');
      return;
    }

    window.alert('Conta criada! Agora entre com seu e-mail e senha.');
    this.login.patchValue({ email: emailUsuario.trim().toLowerCase() });
    this.cadastro.reset();
    this.visible = false;
  }

  async entrar(): Promise<void> {
    if (this.login.invalid) {
      window.alert('Informe e-mail e senha.');
      return;
    }

    const { email, password } = this.login.getRawValue();
    this.entrando = true;
    try {
      const ok = await this.auth.entrar(email, password);
      if (ok) {
        this.login.reset();
        this.router.navigate(['/inicio']);
      } else {
        window.alert('E-mail ou senha inválidos.');
      }
    } finally {
      this.entrando = false;
    }
  }

  voltar(): void {
    this.cadastro.reset();
    this.visible = false;
  }

  resetSenha(): void {
    window.alert('Funcionalidade em construção!');
  }
}
