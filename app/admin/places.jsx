import Layout from "../../src/components/Layout";
import AdminFooter from "../../src/components/AdminFooter";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function Places() {
  const router = useRouter();

  return (
    <Layout footer={<AdminFooter />}>
      <Input placeholder="Nombre del lugar" />
      <Input placeholder="Capacidad" />
      <Input placeholder="Ubicación" />

      <CustomButton title="Subir imagen" onPress={() => {}} />

      <CustomButton
        title="Guardar"
        onPress={() => router.replace("/admin")}
      />

      <CustomButton
        title="Archivar"
        onPress={() => router.replace("/admin")}
      />
    </Layout>
  );
}