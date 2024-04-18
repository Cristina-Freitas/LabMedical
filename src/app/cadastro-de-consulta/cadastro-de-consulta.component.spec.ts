import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeConsultaComponent } from './cadastro-de-consulta.component';

describe('CadastroDeConsultaComponent', () => {
  let component: CadastroDeConsultaComponent;
  let fixture: ComponentFixture<CadastroDeConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDeConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroDeConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
