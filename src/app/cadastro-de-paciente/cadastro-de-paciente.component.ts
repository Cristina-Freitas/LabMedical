import { Component, Inject } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro-de-paciente',
    standalone: true,
    templateUrl: './cadastro-de-paciente.component.html',
    styleUrl: './cadastro-de-paciente.component.scss',
    imports: [MenuLateralComponent, 
              ToolbarComponent, 
              FooterComponent,
              ReactiveFormsModule,
              CommonModule]
})
export class CadastroDePacienteComponent {


    constructor(private router: Router ){
      };

    cadastro = new FormGroup({
        nomePaciente: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
        genero: new FormControl('', Validators.required),
        cpf: new FormControl('', Validators.required),
        datanascimento: new FormControl('', Validators.required),
        rg: new FormControl('', [Validators.maxLength(20), Validators.required]),
        estadocivil: new FormControl('', Validators.required),
        telefonePaciente: new FormControl('', Validators.required),
        emailPaciente: new FormControl('', Validators.required),
        naturalidade: new FormControl('', [Validators.minLength(8), Validators.maxLength(64),  Validators.required]),
        contatoemergencia: new FormControl('', Validators.required),
        alergias: new FormControl(''),
        cuidados: new FormControl(''),
        convenio: new FormControl(''),
        numeroconvenio: new FormControl(''),    
        validadeconvenio: new FormControl(''),
        cep: new FormControl('', Validators.required),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        logradouro: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        pontodereferencia: new FormControl('')
      });
cadastrar() {
throw new Error('Method not implemented.');
}

}
