import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter, UrlTree } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    localStorage.removeItem('usuarioLogado');
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('redireciona para /login quando não há sessão', () => {
    const resultado = executeGuard({} as any, {} as any);
    expect(resultado instanceof UrlTree).toBeTrue();
  });
});
