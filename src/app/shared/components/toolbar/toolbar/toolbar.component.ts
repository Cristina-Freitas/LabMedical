import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

const TITULOS: Record<string, string> = {
  inicio: 'ESTATÍSTICAS E INFORMAÇÕES',
  pacientes: 'CADASTRO DE PACIENTE',
  consultas: 'CADASTRO DE CONSULTA',
  exames: 'CADASTRO DE EXAME',
  lista: 'LISTAGEM DE PRONTUÁRIO',
  prontuario: 'PRONTUÁRIO DO PACIENTE',
};

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class ToolbarComponent implements OnInit {
  currentPage = 'LABMedical';
  userLogin = '';

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.url.subscribe((segmentos) => {
      const primeiro = segmentos[0]?.path;
      this.currentPage = (primeiro && TITULOS[primeiro]) || 'LABMedical';
    });
    // Mostra o nome de quem está logado (antes mostrava sempre o primeiro usuário salvo).
    this.userLogin = this.auth.usuarioLogado()?.nome ?? '';
  }

  logout(): void {
    this.auth.sair();
    this.router.navigate(['/login']);
  }
}
