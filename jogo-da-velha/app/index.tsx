import { useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JogoDaVelha } from "../src/classes/JogoDaVelha";
import type { Casa, Resultado } from "../src/types/jogo";

const TAMANHO = 3;
const BORDA = 2;

export default function Index() {
  const { width } = useWindowDimensions();

  const tamanhoTabuleiro = Math.min(width - 32, 330);
  const tamanhoCasa = (tamanhoTabuleiro - BORDA * 2) / TAMANHO;

  const [jogo] = useState(() => new JogoDaVelha());
  const [tabuleiro, setTabuleiro] = useState<Casa[]>(jogo.getTabuleiro());
  const [mensagem, setMensagem] = useState(jogo.getMensagemStatus());
  const [placarJogador, setPlacarJogador] = useState(0);
  const [placarCpu, setPlacarCpu] = useState(0);
  const [placarEmpates, setPlacarEmpates] = useState(0);

  function atualizarTela() {
    setTabuleiro(jogo.getTabuleiro());
    setMensagem(jogo.getMensagemStatus());
  }

  function atualizarPlacar(resultado: Resultado) {
    if (resultado === jogo.getJogadorHumano().getSimbolo()) {
      setPlacarJogador((valor) => valor + 1);
      Alert.alert("Fim de jogo", "Você venceu!");
      return;
    }

    if (resultado === jogo.getJogadorCPU().getSimbolo()) {
      setPlacarCpu((valor) => valor + 1);
      Alert.alert("Fim de jogo", "Computador venceu!");
      return;
    }

    if (resultado === "EMPATE") {
      setPlacarEmpates((valor) => valor + 1);
      Alert.alert("Fim de jogo", "Deu velha!");
    }
  }

  function jogar(posicao: number) {
    const resultadoHumano = jogo.jogarHumano(posicao);
    atualizarTela();

    if (resultadoHumano) {
      atualizarPlacar(resultadoHumano);
      return;
    }

    const resultadoCpu = jogo.jogarCPU();
    atualizarTela();

    if (resultadoCpu) {
      atualizarPlacar(resultadoCpu);
    }
  }

  function novaPartida() {
    jogo.reiniciar();
    atualizarTela();
  }

  function zerarPlacar() {
    jogo.reiniciar();
    setPlacarJogador(0);
    setPlacarCpu(0);
    setPlacarEmpates(0);
    atualizarTela();
  }

  const linhas = useMemo(() => {
    return [
      tabuleiro.slice(0, 3),
      tabuleiro.slice(3, 6),
      tabuleiro.slice(6, 9),
    ];
  }, [tabuleiro]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.subtitulo}>{mensagem}</Text>

      <View style={styles.placar}>
        <View style={styles.cardPlacar}>
          <Text style={styles.rotuloPlacar}>Você</Text>
          <Text style={styles.valorPlacar}>{placarJogador}</Text>
        </View>

        <View style={styles.cardPlacar}>
          <Text style={styles.rotuloPlacar}>Empates</Text>
          <Text style={styles.valorPlacar}>{placarEmpates}</Text>
        </View>

        <View style={styles.cardPlacar}>
          <Text style={styles.rotuloPlacar}>CPU</Text>
          <Text style={styles.valorPlacar}>{placarCpu}</Text>
        </View>
      </View>

      <View
        style={[
          styles.tabuleiro,
          { width: tamanhoTabuleiro, height: tamanhoTabuleiro },
        ]}
      >
        {linhas.map((linha, linhaIndex) => (
          <View key={linhaIndex} style={styles.linha}>
            {linha.map((valor, colunaIndex) => {
              const index = linhaIndex * 3 + colunaIndex;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.casa,
                    {
                      width: tamanhoCasa,
                      height: tamanhoCasa,
                    },
                  ]}
                  onPress={() => jogar(index)}
                  activeOpacity={0.8}
                  disabled={jogo.acabou()}
                >
                  <Text
                    style={[styles.textoCasa, { fontSize: tamanhoCasa * 0.45 }]}
                  >
                    {valor}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={novaPartida}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>Nova partida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={zerarPlacar}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoSecundario}>Zerar placar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
  },
  placar: {
    width: "100%",
    maxWidth: 330,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
  },
  cardPlacar: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  rotuloPlacar: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
    fontWeight: "600",
  },
  valorPlacar: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  tabuleiro: {
    borderWidth: BORDA,
    borderColor: "#222",
    backgroundColor: "#222",
  },
  linha: {
    flexDirection: "row",
  },
  casa: {
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#222",
  },
  textoCasa: {
    fontWeight: "700",
    color: "#111",
  },
  botao: {
    marginTop: 24,
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  botaoSecundario: {
    marginTop: 12,
    backgroundColor: "#d9d9d9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotaoSecundario: {
    color: "#111",
    fontSize: 14,
    fontWeight: "700",
  },
});
