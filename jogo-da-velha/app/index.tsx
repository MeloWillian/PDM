import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JOGADOR = "X";
const MAQUINA = "O";
const TAMANHO = 3;
const BORDA = 2;

export default function Index() {
  const { width } = useWindowDimensions();

  const tamanhoTabuleiro = Math.min(width - 32, 330);
  const tamanhoCasa = (tamanhoTabuleiro - BORDA * 2) / TAMANHO;

  const [tabuleiro, setTabuleiro] = useState<(string | null)[]>(
    Array(9).fill(null),
  );
  const [vez, setVez] = useState<"X" | "O">("X");

  const [placarJogador] = useState(0);
  const [placarMaquina] = useState(0);
  const [placarEmpates] = useState(0);

  function jogadaHumana(posicao: number) {
    if (tabuleiro[posicao]) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[posicao] = vez;
    setTabuleiro(novoTabuleiro);

    setVez(vez === JOGADOR ? MAQUINA : JOGADOR);
  }

  function reiniciarJogo() {
    setTabuleiro(Array(9).fill(null));
    setVez(JOGADOR);
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
      <Text style={styles.subtitulo}>
        Vez: {vez === JOGADOR ? "Você" : "Computador"}
      </Text>

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
          <Text style={styles.rotuloPlacar}>Máquina</Text>
          <Text style={styles.valorPlacar}>{placarMaquina}</Text>
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
                  onPress={() => jogadaHumana(index)}
                  activeOpacity={0.8}
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
        onPress={reiniciarJogo}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>Nova partida</Text>
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
});
