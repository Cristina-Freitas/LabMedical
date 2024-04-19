import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuLateralComponent } from "../../menu-lateral/menu-lateral.component";
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    imports: [MatToolbarModule, 
              MatButtonModule, 
              MatIconModule, 
              MenuLateralComponent, 
              MatMenuModule]
})
export class ToolbarComponent implements OnInit {
    currentPage: string = ''; 
    userLogin: string = '';
    menu: MatMenuPanel<any> | null | undefined;
  
    constructor(private route: ActivatedRoute, private router: Router) {}

    
    logout(): void {
        localStorage.removeItem('newUsers');
        this.router.navigate(['/login']);
      }
  
    ngOnInit(): void {
      this.route.url.subscribe(urlSegments => {
        if (urlSegments.length > 0) {
          switch (urlSegments[0].path) {
            case 'menu':
              this.currentPage = 'MENU';
              break;
            case 'inicio':
              this.currentPage = 'ESTATÍSTICAS E INFORMAÇÕES';
              break;
              case 'pacientes':
              this.currentPage = 'CADASTRO DE PACIENTE';
              break;
              case 'consultas':
              this.currentPage = 'CADASTRO DE CONSULTA';
              break;
            case 'exames':
              this.currentPage = 'CADASTRO DE EXAME';
              break;
            case 'lista':
              this.currentPage = 'LISTAGEM DE PRONTUÁRIO';
              break;
            case 'prontuario':
              this.currentPage = 'PRONTUÁRIO DO PACIENTE';
              break;
            default:
              this.currentPage = 'TOOLBAR';
          }
        } else {
          this.currentPage = 'LABMedical';
        }
      });

      const usersData = localStorage.getItem('newUsers');

      if (usersData) {
        const users = JSON.parse(usersData);
        if (users.length > 0) {
          this.userLogin = users[0].nomeUsuario; 
        }
      }

    }
   }
   

