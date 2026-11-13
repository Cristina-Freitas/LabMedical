/**
 * Leitura e escrita em localStorage com tratamento de JSON inválido.
 * O app roda só no navegador (SSR foi desativado), então localStorage sempre existe.
 */
export function lerStorage<T>(chave: string, padrao: T): T {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? (JSON.parse(valor) as T) : padrao;
  } catch {
    return padrao;
  }
}

export function gravarStorage(chave: string, valor: unknown): void {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function removerStorage(chave: string): void {
  localStorage.removeItem(chave);
}
