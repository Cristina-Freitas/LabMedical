import { TestBed } from '@angular/core/testing';

import { IdPacienteService } from './id-paciente.service';

describe('IdPacienteService', () => {
  let service: IdPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
