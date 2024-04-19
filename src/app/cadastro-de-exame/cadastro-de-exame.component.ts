import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";

@Component({
    selector: 'app-cadastro-de-exame',
    standalone: true,
    templateUrl: './cadastro-de-exame.component.html',
    styleUrl: './cadastro-de-exame.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent]
})
export class CadastroDeExameComponent {

}
