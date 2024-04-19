import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";

@Component({
    selector: 'app-prontuario-do-paciente',
    standalone: true,
    templateUrl: './prontuario-do-paciente.component.html',
    styleUrl: './prontuario-do-paciente.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent]
})
export class ProntuarioDoPacienteComponent {

}
