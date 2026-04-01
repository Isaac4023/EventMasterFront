import { Text } from "react-native";
import Layout from "../src/components/Layout";
import UserFooter from "../../src/components/UserFooter";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Reserve() {
  const router = useRouter();

  return (
    <Layout footer={<UserFooter />}>
      <Text>Reservar evento</Text>

      <CustomButton
        title="Confirmar"
        onPress={() => router.push("/user/success")}
      />
    </Layout>
  );
}