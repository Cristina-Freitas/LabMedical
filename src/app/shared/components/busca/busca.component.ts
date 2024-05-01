import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
    selector: 'app-busca',
    standalone: true,
    templateUrl: './busca.component.html',
    styleUrl: './busca.component.scss',
    imports: [FormsModule, MenuLateralComponent, ToolbarComponent, FooterComponent]
})
export class BuscaComponent {
    @Input() title = 'Encontre o Paciente';
    @Output() resultadoBusca: EventEmitter<string> = new EventEmitter<string>();
    pesquisarPaciente: string = '';
    pacientes: any[] = [];
    pacientesFiltrados: any[] = [];
    localStorage: any;

    constructor() { }
    
pesquisar() {
    this.localStorage = window.localStorage
    let pacientesString = this.localStorage.getItem('pacientes');
    if (pacientesString) {
        let pacientes = JSON.parse(pacientesString);         
        let pacienteFiltrado = pacientes.filter((value: any) => {
            const pesquisa = this.pesquisarPaciente.toLocaleLowerCase();
            return(
                value.id.toString().toLowerCase() === pesquisa ||
                value.nomePaciente.toLowerCase().includes(pesquisa) ||
                value.telefonePaciente.toLowerCase().includes(pesquisa) ||
                value.emailPaciente.toLowerCase().includes(pesquisa)
            );
            
        });
        console.log('Pacientes filtrados:', pacienteFiltrado);
        if (pacienteFiltrado.length === 0) {
            alert('Sua busca não encontrou resultados');
        }
        this.resultadoBusca.emit(pacienteFiltrado);
        this.pesquisarPaciente = '';
    } else {
        console.log('Nenhum paciente encontrado no localStorage');
    }
    }
}
