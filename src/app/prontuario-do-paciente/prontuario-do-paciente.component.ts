import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";

@Component({
    selector: 'app-prontuario-do-paciente',
    standalone: true,
    templateUrl: './prontuario-do-paciente.component.html',
    styleUrl: './prontuario-do-paciente.component.scss',
    imports: [MenuLateralComponent]
})
export class ProntuarioDoPacienteComponent {

}
