import { Text } from "react-native";
import AdminFooter from "../../src/components/AdminFooter";
import Layout from "../../src/components/Layout";
import Input from "../../src/components/Input";

export default function Events() {
  return (
    <Layout footer={<AdminFooter />}>
      <Text>Eventos creados</Text>
    </Layout>
  );
}