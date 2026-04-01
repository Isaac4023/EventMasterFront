import { Text, TextInput } from "react-native";
import Layout from "../../src/components/Layout";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Staff() {
  const router = useRouter();

  return (
    <Layout>
      <Text>Position the ticket QR code within the frame</Text>

      <Input placeholder="Código manual" />

      <CustomButton
        title="Verificar Ticket"
        onPress={() => router.push("/staff/success")}
      />
    </Layout>
  );
}