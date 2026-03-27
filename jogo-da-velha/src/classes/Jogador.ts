import type { Simbolo } from "../types/jogo";

export class Jogador {
  constructor(
    private nome: string,
    private simbolo: Simbolo,
  ) {}

  getNome() {
    return this.nome;
  }

  getSimbolo() {
    return this.simbolo;
  }
}
