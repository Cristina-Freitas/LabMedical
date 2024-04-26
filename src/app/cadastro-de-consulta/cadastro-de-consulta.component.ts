import { Component } from '@angular/core';
import { MenuLateralComponent } from "../shared/components/menu-lateral/menu-lateral.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar/toolbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { BuscaComponent } from "../shared/components/busca/busca.component";

@Component({
    selector: 'app-cadastro-de-consulta',
    standalone: true,
    templateUrl: './cadastro-de-consulta.component.html',
    styleUrl: './cadastro-de-consulta.component.scss',
    imports: [MenuLateralComponent, ToolbarComponent, FooterComponent, BuscaComponent]
})
export class CadastroDeConsultaComponent {

}
