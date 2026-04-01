import { Text } from "react-native";
import Layout from "../src/components/Layout";
import AdminFooter from "../../src/components/AdminFooter";

export default function Events() {
  return (
    <Layout footer={<AdminFooter />}>
      <Text>Eventos creados</Text>
    </Layout>
  );
}