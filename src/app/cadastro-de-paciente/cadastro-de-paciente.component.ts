import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";

@Component({
    selector: 'app-cadastro-de-paciente',
    standalone: true,
    templateUrl: './cadastro-de-paciente.component.html',
    styleUrl: './cadastro-de-paciente.component.scss',
    imports: [MenuLateralComponent]
})
export class CadastroDePacienteComponent {

}
