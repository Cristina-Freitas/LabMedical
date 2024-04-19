import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioDoPacienteComponent } from './prontuario-do-paciente.component';

describe('ProntuarioDoPacienteComponent', () => {
  let component: ProntuarioDoPacienteComponent;
  let fixture: ComponentFixture<ProntuarioDoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProntuarioDoPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProntuarioDoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
