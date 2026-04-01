import { Text } from "react-native";
import Layout from "../src/components/Layout";
import UserFooter from "../../src/components/UserFooter";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Event() {
  const router = useRouter();

  return (
    <Layout footer={<UserFooter />}>
      <Text>Detalle del evento</Text>

      <CustomButton
        title="Reservar"
        onPress={() => router.push("/user/reserve")}
      />
    </Layout>
  );
}