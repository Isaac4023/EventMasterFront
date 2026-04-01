import { Text } from "react-native";
import UserFooter from "../../src/components/UserFooter";

export default function Success() {
  return (
    <Layout footer={<UserFooter />}>
      <Text>Reserva exitosa</Text>
    </Layout>
  );
}