import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function UserHome() {
  const router = useRouter();

  return (
    <View>
      <Text>Eventos</Text>
      <Button title="Ver evento" onPress={() => router.push("/user/event")} />
    </View>
  );
}