import { Text } from "react-native";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";
import Layout from "../../src/components/Layout";

export default function Success() {
  const router = useRouter();

  return (
    <Layout>
      <Text>Evento: Concert 2026</Text>
      <Text>Zona: A</Text>
      <Text>Asiento: 45</Text>
      <Text>Aforo: 45/200</Text>

      <CustomButton
        title="Escanear otro"
        onPress={() => router.replace("/staff")}
      />
    </Layout>
  );
}