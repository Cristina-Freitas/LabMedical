import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgxMaskPipe } from 'ngx-mask';
import { Paciente } from '../../../models/models';

/** Exibe os pacientes recebidos via @Input (lista completa ou resultado de busca). */
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatIcon, NgxMaskPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() pacientes: Paciente[] = [];

  constructor(private router: Router) {}

  /**
   * Lê a data "AAAA-MM-DD" como data local. new Date('AAAA-MM-DD') interpreta
   * como UTC e, no fuso do Brasil, voltava um dia (errando a idade no dia do aniversário).
   */
  calcularIdade(dataNascimento: string): number | string {
    const partes = (dataNascimento ?? '').split('-').map(Number);
    if (partes.length !== 3 || partes.some(Number.isNaN)) return '-';
    const [ano, mes, dia] = partes;
    const hoje = new Date();
    let idade = hoje.getFullYear() - ano;
    const mesAtual = hoje.getMonth() + 1;
    if (mesAtual < mes || (mesAtual === mes && hoje.getDate() < dia)) {
      idade--;
    }
    return idade;
  }

  verMais(paciente: Paciente): void {
    this.router.navigate(['/pacientes', paciente.id]);
  }
}
