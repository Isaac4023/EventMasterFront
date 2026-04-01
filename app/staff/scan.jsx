import { View, Text } from "react-native";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Scan() {
  const router = useRouter();

  return (
    <View>
      <Text>Escaneo QR</Text>

      <CustomButton
        title="Validar"
        onPress={() => router.push("/staff/success")}
      />
    </View>
  );
}