import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  descricao: string;
  prioridade: number;
  prazo: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ItemTarefa({
  descricao,
  prioridade,
  prazo,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View
      style={{
        marginTop: 12,
        backgroundColor: "#eaf8ff",
        borderWidth: 1,
        borderColor: "#90cdf4",
        borderRadius: 12,
        padding: 14,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#0f172a",
            flex: 1,
          }}
        >
          {descricao}
        </Text>

        <View
          style={{
            backgroundColor: "#dbeafe",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#1d4ed8",
              fontWeight: "700",
            }}
          >
            P{prioridade}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 15, color: "#334155" }}>Prazo: {prazo}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 16,
        }}
      >
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create-outline" size={22} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={22} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
