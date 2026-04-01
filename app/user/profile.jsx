import { Text } from "react-native";
import Layout from "@/src/components/Layout";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <Layout>
      <Text>Usuario: Juan Pérez</Text>

      <CustomButton title="Editar perfil" onPress={() => {}} />

      <CustomButton
        title="Logout"
        onPress={() => router.replace("/login")}
      />
    </Layout>
  );
}