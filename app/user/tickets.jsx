import { Text } from "react-native";
import UserFooter from "../../src/components/UserFooter";

export default function Tickets() {
  return (
    <Layout footer={<UserFooter />}>
      <Text>Mis tickets</Text>
    </Layout>
  );
}