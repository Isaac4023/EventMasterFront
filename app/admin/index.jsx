import { Text } from "react-native";
import AdminFooter from "../../src/components/AdminFooter";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Admin() {
  const router = useRouter();

  return (
    <Layout footer={<AdminFooter />}>
      <Text>Ganancias: $25,000</Text>
      <Text>Aforo: 70%</Text>

      <CustomButton
        title="Crear Evento"
        onPress={() => router.push("/admin/create-event")}
      />

      <CustomButton
        title="Agregar Lugar"
        onPress={() => router.push("/admin/places")}
      />
    </Layout>
  );
}