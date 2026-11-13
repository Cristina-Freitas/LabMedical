import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EnderecoViaCep {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  /** O ViaCEP responde { erro: true } quando o CEP tem formato válido mas não existe. */
  erro?: boolean | string;
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  /** Recebe o CEP com ou sem máscara; envia apenas os dígitos. */
  getAddress(cep: string): Observable<EnderecoViaCep> {
    const somenteDigitos = cep.replace(/\D/g, '');
    return this.httpClient.get<EnderecoViaCep>(`https://viacep.com.br/ws/${somenteDigitos}/json/`);
  }
}
