import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { ListagemDeProntuarioComponent } from './listagem-de-prontuario.component';

describe('ListagemDeProntuarioComponent', () => {
  let component: ListagemDeProntuarioComponent;
  let fixture: ComponentFixture<ListagemDeProntuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemDeProntuarioComponent],
      providers: [provideRouter([]), provideHttpClient(), provideNoopAnimations(), provideEnvironmentNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemDeProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
