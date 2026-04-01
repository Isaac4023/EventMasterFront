import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Event() {
  const router = useRouter();

  return (
    <View>
      <Text>Detalle evento</Text>
      <Button title="Reservar" onPress={() => router.push("/user/reserve")} />
    </View>
  );
}