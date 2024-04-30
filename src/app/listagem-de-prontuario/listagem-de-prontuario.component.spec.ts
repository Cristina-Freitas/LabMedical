import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDeProntuarioComponent } from './listagem-de-prontuario.component';

describe('ListagemDeProntuarioComponent', () => {
  let component: ListagemDeProntuarioComponent;
  let fixture: ComponentFixture<ListagemDeProntuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemDeProntuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemDeProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
