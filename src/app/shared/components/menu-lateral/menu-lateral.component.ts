import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToolbarComponent } from "../toolbar/toolbar/toolbar.component";

@Component({
    selector: 'app-menu-lateral',
    standalone: true,
    templateUrl: './menu-lateral.component.html',
    styleUrl: './menu-lateral.component.scss',
    imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        RouterLink, 
        ToolbarComponent]
})
export class MenuLateralComponent {

constructor(private router: Router) { }

regExame() {
this.router.navigate(['exames']);
}
regConsulta() {
  this.router.navigate(['consultas']);
}
listarPront() {
  this.router.navigate(['lista']);
}
regPaciente() {
  this.router.navigate(['pacientes']);
}
sair() {
  this.router.navigate(['login']);
}
inicio() {
  this.router.navigate(['inicio']);
}
  expandido = false;
}
