import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";

@Component({
    selector: 'app-listagem-de-prontuario',
    standalone: true,
    templateUrl: './listagem-de-prontuario.component.html',
    styleUrl: './listagem-de-prontuario.component.scss',
    imports: [MenuLateralComponent]
})
export class ListagemDeProntuarioComponent {

}
