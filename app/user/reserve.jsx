import { View, Text } from "react-native";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Reserve() {
  const router = useRouter();

  return (
    <View>
      <Text>Reservar evento</Text>
      <CustomButton
        title="Confirmar"
        onPress={() => router.push("/user/success")}
      />
    </View>
  );
}