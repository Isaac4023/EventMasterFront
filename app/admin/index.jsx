import { View, Text } from "react-native";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Admin() {
  const router = useRouter();

  return (
    <View>
      <Text>Admin Panel</Text>

      <CustomButton
        title="Crear Evento"
        onPress={() => router.push("/admin/create-event")}
      />

      <CustomButton
        title="Lugares"
        onPress={() => router.push("/admin/places")}
      />
    </View>
  );
}