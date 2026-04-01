import { Text } from "react-native";
import AdminFooter from "../../src/components/AdminFooter";

export default function Events() {
  return (
    <Layout footer={<AdminFooter />}>
      <Text>Eventos creados</Text>
    </Layout>
  );
}