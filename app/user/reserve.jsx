import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Reserve() {
  const router = useRouter();

  return (
    <View>
      <Text>Reservar</Text>
      <Button title="Confirmar" onPress={() => router.push("/user/success")} />
    </View>
  );
}