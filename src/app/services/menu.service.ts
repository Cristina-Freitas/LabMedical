import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { gravarStorage, lerStorage } from './storage';

const CHAVE_MENU = 'menuRecolhido';
const CLASSE_RECOLHIDO = 'menu-recolhido';

/**
 * Guarda se o menu lateral está recolhido ou estendido.
 * Fica num serviço (e não no componente) porque cada página cria o seu próprio
 * menu; assim o estado se mantém ao navegar e também depois de recarregar a página.
 * A classe "menu-recolhido" no <html> muda a variável CSS --menu-largura,
 * que todas as páginas usam para posicionar o conteúdo ao lado do menu.
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  recolhido: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const salvo = lerStorage<boolean | null>(CHAVE_MENU, null);
    // Sem preferência salva: começa recolhido em telas pequenas e estendido nas grandes.
    this.recolhido = salvo ?? window.innerWidth < 1024;
    this.aplicar();
  }

  alternar(): void {
    this.recolhido = !this.recolhido;
    gravarStorage(CHAVE_MENU, this.recolhido);
    this.aplicar();
  }

  private aplicar(): void {
    this.document.documentElement.classList.toggle(CLASSE_RECOLHIDO, this.recolhido);
  }
}
