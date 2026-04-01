import { Text } from "react-native";
import UserFooter from "../../src/components/UserFooter";
import Layout from "../../src/components/Layout";

export default function Tickets() {
  return (
    <Layout footer={<UserFooter />}>
      <Text>Mis tickets</Text>
    </Layout>
  );
}