import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IdPacienteService } from '../../../services/id-paciente.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatIcon, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnChanges{
  @Output() resultadoBusca: EventEmitter<string> = new EventEmitter<string>();
  @Input() pacientes: any[];
  lista: any[] = [];
  // pacientes: any;
  pacienteFiltrado: any ;
 
  constructor(private idPacienteService: IdPacienteService, 
    private router: Router, private cdr: ChangeDetectorRef){
      this.pacientes = [];
    }

  ngOnChanges(){
    this.carregarListaPacientes();
    //this.pacienteFiltrado = [...this.lista];
  }

  carregarListaPacientes(): void {
    this.lista = this.idPacienteService.obterListaPacientes();
  }

receberResultadoBusca(pacientesFiltrados: any[]): void {
    if (pacientesFiltrados && pacientesFiltrados.length > 0) { // Verifica se há pacientes filtrados
        this.pacienteFiltrado = pacientesFiltrados[0];
        // this.pacientes = [this.pacienteFiltrado].slice();
    } else {
        this.pacienteFiltrado = null; // Limpa o paciente filtrado se não houver resultados
        this.pacientes = this.lista;
      };
      this.cdr.detectChanges();
}

calcularIdade(dataNascimento: string): number {
  const hoje = new Date();
  const dataNasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  const mesAtual = hoje.getMonth() + 1;
  const diaAtual = hoje.getDate();
  const mesNasc = dataNasc.getMonth() + 1;
  const diaNasc = dataNasc.getDate();

  if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
    idade--;
  }

  return idade;
}

verMais(paciente: any): void {
    this.router.navigate(['/pacientes']);
 
    }

}
