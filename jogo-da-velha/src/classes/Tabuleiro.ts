import type { Casa, Simbolo } from "../types/jogo";

export class Tabuleiro {
  private casas: Casa[];

  constructor() {
    this.casas = Array(9).fill(null);
  }

  getCasas() {
    return [...this.casas];
  }

  limpar() {
    this.casas = Array(9).fill(null);
  }

  casaEstaVazia(posicao: number) {
    return this.casas[posicao] === null;
  }

  fazerJogada(posicao: number, simbolo: Simbolo) {
    if (!this.casaEstaVazia(posicao)) {
      return false;
    }

    this.casas[posicao] = simbolo;
    return true;
  }

  getJogadasDisponiveis() {
    return this.casas
      .map((valor, indice) => (valor === null ? indice : -1))
      .filter((indice) => indice !== -1);
  }

  verificarVencedor(): Simbolo | null {
    const combinacoes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of combinacoes) {
      if (
        this.casas[a] &&
        this.casas[a] === this.casas[b] &&
        this.casas[a] === this.casas[c]
      ) {
        return this.casas[a];
      }
    }

    return null;
  }

  verificarEmpate() {
    return this.casas.every((casa) => casa !== null);
  }
}
