import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MenuService } from '../../../services/menu.service';

interface ItemMenu {
  rotulo: string;
  icone: string;
  rota: string;
}

interface GrupoMenu {
  titulo: string;
  itens: ItemMenu[];
}

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class MenuLateralComponent {
  grupos: GrupoMenu[] = [
    {
      titulo: 'Geral',
      itens: [{ rotulo: 'Início', icone: 'pi-chart-bar', rota: '/inicio' }],
    },
    {
      titulo: 'Pacientes',
      itens: [
        { rotulo: 'Cadastrar', icone: 'pi-user-plus', rota: '/pacientes' },
        { rotulo: 'Listar prontuário', icone: 'pi-list', rota: '/lista' },
      ],
    },
    {
      titulo: 'Exames',
      itens: [
        { rotulo: 'Cadastrar consulta', icone: 'pi-calendar-plus', rota: '/consultas' },
        { rotulo: 'Cadastrar exame', icone: 'pi-file', rota: '/exames' },
      ],
    },
  ];

  constructor(private router: Router, private auth: AuthService, public menu: MenuService) {}

  get recolhido(): boolean {
    return this.menu.recolhido;
  }

  ir(rota: string): void {
    this.router.navigate([rota]);
  }

  /** Destaca o item da página atual (ex.: /pacientes/3 marca "Cadastrar"). */
  estaAtivo(rota: string): boolean {
    const url = this.router.url.split('?')[0];
    return url === rota || url.startsWith(rota + '/');
  }

  alternar(): void {
    this.menu.alternar();
  }

  sair(): void {
    this.auth.sair();
    this.router.navigate(['/login']);
  }
}