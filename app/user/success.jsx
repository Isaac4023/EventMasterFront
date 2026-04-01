import { Text } from "react-native";
import UserFooter from "../../src/components/UserFooter";
import Layout from "../../src/components/Layout";

export default function Success() {
  return (
    <Layout footer={<UserFooter />}>
      <Text>Reserva exitosa</Text>
    </Layout>
  );
}