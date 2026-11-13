import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { CadastroDeExameComponent } from './cadastro-de-exame.component';

describe('CadastroDeExameComponent', () => {
  let component: CadastroDeExameComponent;
  let fixture: ComponentFixture<CadastroDeExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDeExameComponent],
      providers: [provideRouter([]), provideHttpClient(), provideNoopAnimations(), provideEnvironmentNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroDeExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
