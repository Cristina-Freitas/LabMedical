import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { CadastroDePacienteComponent } from './cadastro-de-paciente.component';

describe('CadastroDePacienteComponent', () => {
  let component: CadastroDePacienteComponent;
  let fixture: ComponentFixture<CadastroDePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDePacienteComponent],
      providers: [provideRouter([]), provideHttpClient(), provideNoopAnimations(), provideEnvironmentNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroDePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
