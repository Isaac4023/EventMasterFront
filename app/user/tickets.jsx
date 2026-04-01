import { Text } from "react-native";
import Layout from "../../src/components/Layout";
import UserFooter from "../../src/components/UserFooter";

export default function Tickets() {
  return (
    <Layout footer={<UserFooter />}>
      <Text>Mis tickets</Text>
    </Layout>
  );
}