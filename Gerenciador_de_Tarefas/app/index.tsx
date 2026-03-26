import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemTarefa from "../components/ItemTarefa";

type Tarefa = {
  id: string;
  descricao: string;
  prioridade: number;
  prazo: string;
};

const prioridades = [1, 2, 3, 4, 5];

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState(1);
  const [prazo, setPrazo] = useState("");
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

  function abrirModalNovaTarefa() {
    setDescricao("");
    setPrioridade(1);
    setPrazo("");
    setTarefaEmEdicao(null);
    setModalVisivel(true);
  }

  function abrirModalEdicao(tarefa: Tarefa) {
    setDescricao(tarefa.descricao);
    setPrioridade(tarefa.prioridade);
    setPrazo(tarefa.prazo);
    setTarefaEmEdicao(tarefa);
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
    setDescricao("");
    setPrioridade(1);
    setPrazo("");
    setTarefaEmEdicao(null);
  }

  function validarFormulario() {
    if (!descricao.trim()) {
      Alert.alert("Atenção", "Informe a descrição da tarefa.");
      return false;
    }

    if (!prazo.trim()) {
      Alert.alert("Atenção", "Informe o prazo da tarefa.");
      return false;
    }

    const partes = prazo.split("/");

    if (partes.length !== 3) {
      Alert.alert("Atenção", "Use o formato dd/mm/aaaa.");
      return false;
    }

    const [dia, mes, ano] = partes.map(Number);

    const data = new Date(ano, mes - 1, dia);

    if (
      Number.isNaN(data.getTime()) ||
      dia < 1 ||
      dia > 31 ||
      mes < 1 ||
      mes > 12
    ) {
      Alert.alert("Atenção", "Data inválida.");
      return false;
    }
    if (Number.isNaN(data.getTime())) {
      Alert.alert("Atenção", "Informe o prazo no formato YYYY-MM-DD.");
      return false;
    }

    return true;
  }

  function parseDataBR(data: string) {
    const [dia, mes, ano] = data.split("/");
    return new Date(Number(ano), Number(mes) - 1, Number(dia));
  }

  function formatarDataBR(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4)
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;

    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
  }

  function salvarTarefa() {
    if (!validarFormulario()) return;

    if (tarefaEmEdicao) {
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefa) =>
          tarefa.id === tarefaEmEdicao.id
            ? {
                ...tarefa,
                descricao: descricao.trim(),
                prioridade,
                prazo,
              }
            : tarefa,
        ),
      );
    } else {
      const novaTarefa: Tarefa = {
        id: Date.now().toString(),
        descricao: descricao.trim(),
        prioridade,
        prazo,
      };

      setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
    }

    fecharModal();
  }

  function deletarTarefa(id: string) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id),
    );
  }

  function deletarTodasTarefas() {
    Alert.alert("Limpar tudo", "Deseja remover todas as tarefas?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => setTarefas([]),
      },
    ]);
  }

  const tarefasOrdenadas = useMemo(() => {
    return [...tarefas].sort((a, b) => {
      const dataA = parseDataBR(a.prazo).getTime();
      const dataB = parseDataBR(b.prazo).getTime();
      if (dataA !== dataB) {
        return dataA - dataB;
      }

      return a.prioridade - b.prioridade;
    });
  }, [tarefas]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
      edges={["top", "left", "right"]}
    >
      <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: 8,
          }}
        >
          Gerenciador de Tarefas
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: "#475569",
            marginBottom: 20,
          }}
        >
          Organize suas tarefas por prazo e prioridade.
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={abrirModalNovaTarefa}
            style={{
              flex: 1,
              backgroundColor: "#2563eb",
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              Nova tarefa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={deletarTodasTarefas}
            style={{
              flex: 1,
              backgroundColor: "#dc2626",
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              Limpar tudo
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tarefasOrdenadas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemTarefa
              descricao={item.descricao}
              prioridade={item.prioridade}
              prazo={item.prazo}
              onEdit={() => abrirModalEdicao(item)}
              onDelete={() => deletarTarefa(item.id)}
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                marginTop: 40,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: "#64748b" }}>
                Nenhuma tarefa cadastrada.
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 30 }}
        />

        <Modal
          visible={modalVisivel}
          animationType="slide"
          transparent
          onRequestClose={fecharModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.35)",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: 18,
                }}
              >
                {tarefaEmEdicao ? "Editar tarefa" : "Nova tarefa"}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Descrição
              </Text>
              <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Digite a descrição"
                style={{
                  borderWidth: 1,
                  borderColor: "#cbd5e1",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  marginBottom: 16,
                  fontSize: 16,
                }}
              />

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Prioridade
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  gap: 8,
                }}
              >
                {prioridades.map((valor) => (
                  <TouchableOpacity
                    key={valor}
                    onPress={() => setPrioridade(valor)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 10,
                      alignItems: "center",
                      backgroundColor:
                        prioridade === valor ? "#2563eb" : "#e2e8f0",
                    }}
                  >
                    <Text
                      style={{
                        color: prioridade === valor ? "#fff" : "#0f172a",
                        fontWeight: "700",
                      }}
                    >
                      {valor}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Prazo
              </Text>
              <TextInput
                value={prazo}
                onChangeText={(texto) => setPrazo(formatarDataBR(texto))}
                keyboardType="numeric"
                placeholder="dd/mm/aaaa"
                style={{
                  borderWidth: 1,
                  borderColor: "#cbd5e1",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  marginBottom: 8,
                  fontSize: 16,
                }}
              />

              <Text
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginBottom: 20,
                }}
              >
                Exemplo: 10/04/2026
              </Text>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  onPress={fecharModal}
                  style={{
                    flex: 1,
                    backgroundColor: "#e2e8f0",
                    paddingVertical: 14,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#0f172a",
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={salvarTarefa}
                  style={{
                    flex: 1,
                    backgroundColor: "#16a34a",
                    paddingVertical: 14,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    Salvar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
