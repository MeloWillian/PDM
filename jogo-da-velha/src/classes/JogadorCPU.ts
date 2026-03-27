import { Jogador } from "./Jogador";
import { Tabuleiro } from "./Tabuleiro";

export class JogadorCPU extends Jogador {
  escolherJogada(tabuleiro: Tabuleiro) {
    const jogadasDisponiveis = tabuleiro.getJogadasDisponiveis();

    if (jogadasDisponiveis.length === 0) {
      return -1;
    }

    return jogadasDisponiveis[0];
  }
}