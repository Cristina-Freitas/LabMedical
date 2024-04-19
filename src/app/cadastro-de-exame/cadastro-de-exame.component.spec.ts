import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeExameComponent } from './cadastro-de-exame.component';

describe('CadastroDeExameComponent', () => {
  let component: CadastroDeExameComponent;
  let fixture: ComponentFixture<CadastroDeExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDeExameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroDeExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
