import { View, Text } from "react-native";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Staff() {
  const router = useRouter();

  return (
    <View>
      <Text>Staff Panel</Text>

      <CustomButton
        title="Escanear"
        onPress={() => router.push("/staff/scan")}
      />
    </View>
  );
}