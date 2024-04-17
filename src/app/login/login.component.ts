import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, 
            CommonModule,
            ButtonModule,
            DialogModule,
            DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
cadastrarUsuario: any;
visible: any;
showDialog() {
throw new Error('Method not implemented.');
}

}
