import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDePacienteComponent } from './cadastro-de-paciente.component';

describe('CadastroDePacienteComponent', () => {
  let component: CadastroDePacienteComponent;
  let fixture: ComponentFixture<CadastroDePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDePacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroDePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
