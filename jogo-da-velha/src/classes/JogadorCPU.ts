import type { Simbolo } from "../types/jogo";
import { Jogador } from "./Jogador";
import { Tabuleiro } from "./Tabuleiro";

export class JogadorCPU extends Jogador {
  constructor(nome: string, simbolo: Simbolo) {
    super(nome, simbolo);
  }

  escolherJogada(tabuleiro: Tabuleiro, simboloHumano: Simbolo) {
    const jogadasDisponiveis = tabuleiro.getJogadasDisponiveis();

    if (jogadasDisponiveis.length === 0) {
      return -1;
    }

    let melhorPontuacao = -Infinity;
    let melhorJogada = -1;

    for (const indice of jogadasDisponiveis) {
      const copiaTabuleiro = tabuleiro.clonar();
      copiaTabuleiro.fazerJogada(indice, this.getSimbolo());

      const pontuacao = this.minimax(
        copiaTabuleiro,
        0,
        false,
        this.getSimbolo(),
        simboloHumano,
      );

      if (pontuacao > melhorPontuacao) {
        melhorPontuacao = pontuacao;
        melhorJogada = indice;
      }
    }

    return melhorJogada;
  }

  private minimax(
    tabuleiro: Tabuleiro,
    profundidade: number,
    maximizando: boolean,
    simboloCpu: Simbolo,
    simboloHumano: Simbolo,
  ): number {
    const vencedor = tabuleiro.verificarVencedor();

    if (vencedor === simboloCpu) {
      return 10 - profundidade;
    }

    if (vencedor === simboloHumano) {
      return profundidade - 10;
    }

    if (tabuleiro.verificarEmpate()) {
      return 0;
    }

    if (maximizando) {
      let melhorPontuacao = -Infinity;

      for (const indice of tabuleiro.getJogadasDisponiveis()) {
        const copiaTabuleiro = tabuleiro.clonar();
        copiaTabuleiro.fazerJogada(indice, simboloCpu);

        const pontuacao = this.minimax(
          copiaTabuleiro,
          profundidade + 1,
          false,
          simboloCpu,
          simboloHumano,
        );

        melhorPontuacao = Math.max(melhorPontuacao, pontuacao);
      }

      return melhorPontuacao;
    }

    let melhorPontuacao = Infinity;

    for (const indice of tabuleiro.getJogadasDisponiveis()) {
      const copiaTabuleiro = tabuleiro.clonar();
      copiaTabuleiro.fazerJogada(indice, simboloHumano);

      const pontuacao = this.minimax(
        copiaTabuleiro,
        profundidade + 1,
        true,
        simboloCpu,
        simboloHumano,
      );

      melhorPontuacao = Math.min(melhorPontuacao, pontuacao);
    }

    return melhorPontuacao;
  }
}
