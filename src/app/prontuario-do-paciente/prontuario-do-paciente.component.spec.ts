import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { ProntuarioDoPacienteComponent } from './prontuario-do-paciente.component';

describe('ProntuarioDoPacienteComponent', () => {
  let component: ProntuarioDoPacienteComponent;
  let fixture: ComponentFixture<ProntuarioDoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProntuarioDoPacienteComponent],
      providers: [provideRouter([]), provideHttpClient(), provideNoopAnimations(), provideEnvironmentNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProntuarioDoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
