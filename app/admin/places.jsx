import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../src/components/CustomButton";

export default function Places() {
  const router = useRouter();

  return (
    <View>
      <Text>Manage Places</Text>

      <CustomButton
        title="Ver Lugar"
        onPress={() => router.push("/admin/place-detail")}
      />
    </View>
  );
}