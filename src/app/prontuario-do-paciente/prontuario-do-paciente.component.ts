import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { StepperModule } from 'primeng/stepper';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IdPacienteService } from '../services/id-paciente.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
    selector: 'app-prontuario-do-paciente',
    standalone: true,
    templateUrl: './prontuario-do-paciente.component.html',
    styleUrl: './prontuario-do-paciente.component.scss',
    imports: [MenuLateralComponent, 
              ToolbarComponent,
              FooterComponent,
              StepperModule,
              CommonModule,
              DatePipe,
              NgxMaskDirective, NgxMaskPipe]
})
export class ProntuarioDoPacienteComponent implements OnInit {
    consulta: any;
consultas: any[] = [];
paciente: any;
exames: any[] = [];

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private idPacienteService: IdPacienteService) {
        // this.consultas = [];
    }

    ngOnInit() {
     // Obter o ID do paciente da rota
     const idPaciente = this.route.snapshot.params['id'];

     // Obter a lista de pacientes
     const pacientes = this.idPacienteService.obterListaPacientes();
 
     // Encontrar o paciente pelo ID
     this.paciente = pacientes.find(paciente => paciente.id === idPaciente);
 
     // Verificar se o paciente foi encontrado
     if (this.paciente) {
       // Se o paciente foi encontrado, atribuir as consultas e exames
       this.consultas = this.paciente.consultas || [];
       this.exames = this.paciente.exames || [];
     } else {
       // Caso contrário, tratar a situação em que o paciente não foi encontrado
       console.error('Paciente não encontrado');
     }
    }

carregarConsulta(consultas: any): void {
this.router.navigate(['consultas']);
    }
carregarExame() {
        this.router.navigate(['exames']);
        }
uploadDocumento($event: Event) {
    const fileInput = $event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = (event.target as FileReader).result;
            // conteúdo do arquivo e para processá-lo conforme necessário
            console.log(result);
        };

        reader.onerror = (event) => {
            console.error("Erro ao ler o arquivo: ", event);
        };

        reader.readAsDataURL(file); // ou reader.readAsText(file) para ler como texto
    }
  }
}


