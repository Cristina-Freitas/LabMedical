import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";

@Component({
    selector: 'app-listagem-de-prontuario',
    standalone: true,
    templateUrl: './listagem-de-prontuario.component.html',
    styleUrl: './listagem-de-prontuario.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent]
})
export class ListagemDeProntuarioComponent {

}
