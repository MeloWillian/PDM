import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Gerenciador de Tarefas", headerShown: false }}
      />
    </Stack>
  );
}
