import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  listaResultado  :any
  @Output() pacienteEscolhido: EventEmitter<any> = new EventEmitter<any>();
  @Input() resultado = []



  ngOnChanges(){
    this.listaResultado = Object.entries(this.resultado)
    console.log(this.resultado[0])

}

}
