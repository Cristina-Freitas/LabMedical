import { Injectable } from '@angular/core';
import { Usuario } from '../models/models';
import { gravarStorage, lerStorage, removerStorage } from './storage';

const CHAVE_USUARIOS = 'usuarios';
const CHAVE_SESSAO = 'usuarioLogado';

/**
 * Autenticação simulada no navegador.
 * ATENÇÃO: como não há back-end, isto NÃO é segurança real. Qualquer pessoa com
 * acesso ao DevTools pode alterar o localStorage. Serve apenas para fins didáticos.
 * Ao menos as senhas são guardadas como hash, e não em texto puro.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    // Versão antiga guardava usuários com senha em texto puro na chave "newUsers".
    removerStorage('newUsers');
  }

  private obterUsuarios(): Usuario[] {
    return lerStorage<Usuario[]>(CHAVE_USUARIOS, []);
  }

  emailJaCadastrado(email: string): boolean {
    const alvo = this.normalizarEmail(email);
    return this.obterUsuarios().some((u) => u.email === alvo);
  }

  async cadastrar(nome: string, email: string, senha: string): Promise<boolean> {
    const emailNormalizado = this.normalizarEmail(email);
    if (this.emailJaCadastrado(emailNormalizado)) return false;
    const usuarios = this.obterUsuarios();
    usuarios.push({
      nome: nome.trim(),
      email: emailNormalizado,
      senhaHash: await this.gerarHash(emailNormalizado, senha),
    });
    gravarStorage(CHAVE_USUARIOS, usuarios);
    return true;
  }

  async entrar(email: string, senha: string): Promise<boolean> {
    const emailNormalizado = this.normalizarEmail(email);
    const usuario = this.obterUsuarios().find((u) => u.email === emailNormalizado);
    if (!usuario) return false;
    const hash = await this.gerarHash(emailNormalizado, senha);
    if (hash !== usuario.senhaHash) return false;
    gravarStorage(CHAVE_SESSAO, usuario.email);
    return true;
  }

  sair(): void {
    removerStorage(CHAVE_SESSAO);
  }

  usuarioLogado(): Usuario | undefined {
    const email = lerStorage<string | null>(CHAVE_SESSAO, null);
    if (!email) return undefined;
    return this.obterUsuarios().find((u) => u.email === email);
  }

  estaLogado(): boolean {
    return !!this.usuarioLogado();
  }

  private normalizarEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /** SHA-256 de "email:senha" (o e-mail funciona como salt simples). */
  private async gerarHash(email: string, senha: string): Promise<string> {
    const dados = new TextEncoder().encode(`${email}:${senha}`);
    const buffer = await crypto.subtle.digest('SHA-256', dados);
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
