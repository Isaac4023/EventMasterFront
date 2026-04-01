import { Text } from "react-native";
import UserFooter from "../../src/components/UserFooter";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";
import Layout from "../../src/components/Layout";

export default function Profile() {
  const router = useRouter();

  return (
    <Layout footer={<UserFooter />}>
      <Text>Usuario: Juan Pérez</Text>

      <CustomButton title="Editar perfil" onPress={() => {}} />

      <CustomButton
        title="Logout"
        onPress={() => router.replace("/login")}
      />
    </Layout>
  );
}