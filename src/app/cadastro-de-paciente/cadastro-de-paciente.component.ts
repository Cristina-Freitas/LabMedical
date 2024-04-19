import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";

@Component({
    selector: 'app-cadastro-de-paciente',
    standalone: true,
    templateUrl: './cadastro-de-paciente.component.html',
    styleUrl: './cadastro-de-paciente.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent]
})
export class CadastroDePacienteComponent {

}
