import type { Resultado } from "../types/jogo";
import { Jogador } from "./Jogador";
import { JogadorCPU } from "./JogadorCPU";
import { Tabuleiro } from "./Tabuleiro";

export class JogoDaVelha {
  private tabuleiro: Tabuleiro;
  private jogadorHumano: Jogador;
  private jogadorCPU: JogadorCPU;
  private jogadorDaVez: Jogador;
  private finalizado: boolean;
  private ultimoResultado: Resultado;

  constructor() {
    this.tabuleiro = new Tabuleiro();
    this.jogadorHumano = new Jogador("Você", "X");
    this.jogadorCPU = new JogadorCPU("CPU", "O");
    this.jogadorDaVez = this.jogadorHumano;
    this.finalizado = false;
    this.ultimoResultado = null;
  }

  getTabuleiro() {
    return this.tabuleiro.getCasas();
  }

  getJogadorHumano() {
    return this.jogadorHumano;
  }

  getJogadorCPU() {
    return this.jogadorCPU;
  }

  getResultado() {
    return this.ultimoResultado;
  }

  acabou() {
    return this.finalizado;
  }

  reiniciar() {
    this.tabuleiro.limpar();
    this.jogadorDaVez = this.jogadorHumano;
    this.finalizado = false;
    this.ultimoResultado = null;
  }

  getMensagemStatus() {
    if (this.finalizado) {
      if (this.ultimoResultado === this.jogadorHumano.getSimbolo()) {
        return "Você venceu";
      }

      if (this.ultimoResultado === this.jogadorCPU.getSimbolo()) {
        return "Computador venceu";
      }

      if (this.ultimoResultado === "EMPATE") {
        return "Deu velha";
      }
    }

    return this.jogadorDaVez === this.jogadorHumano
      ? "Sua vez"
      : "Vez do computador";
  }

  jogarHumano(posicao: number) {
    if (this.finalizado || this.jogadorDaVez !== this.jogadorHumano) {
      return null;
    }

    const jogou = this.tabuleiro.fazerJogada(
      posicao,
      this.jogadorHumano.getSimbolo(),
    );

    if (!jogou) {
      return null;
    }

    const resultado = this.verificarResultado();

    if (resultado) {
      return resultado;
    }

    this.jogadorDaVez = this.jogadorCPU;
    return null;
  }

  jogarCPU() {
    if (this.finalizado || this.jogadorDaVez !== this.jogadorCPU) {
      return null;
    }

    const posicao = this.jogadorCPU.escolherJogada(this.tabuleiro);

    if (posicao === -1) {
      return null;
    }

    this.tabuleiro.fazerJogada(posicao, this.jogadorCPU.getSimbolo());

    const resultado = this.verificarResultado();

    if (resultado) {
      return resultado;
    }

    this.jogadorDaVez = this.jogadorHumano;
    return null;
  }

  private verificarResultado() {
    const vencedor = this.tabuleiro.verificarVencedor();

    if (vencedor) {
      this.finalizado = true;
      this.ultimoResultado = vencedor;
      return vencedor;
    }

    if (this.tabuleiro.verificarEmpate()) {
      this.finalizado = true;
      this.ultimoResultado = "EMPATE";
      return "EMPATE";
    }

    return null;
  }
}
