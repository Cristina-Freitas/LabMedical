import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { CadastroDeConsultaComponent } from './cadastro-de-consulta.component';

describe('CadastroDeConsultaComponent', () => {
  let component: CadastroDeConsultaComponent;
  let fixture: ComponentFixture<CadastroDeConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDeConsultaComponent],
      providers: [provideRouter([]), provideHttpClient(), provideNoopAnimations(), provideEnvironmentNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroDeConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
