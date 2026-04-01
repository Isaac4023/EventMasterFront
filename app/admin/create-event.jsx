import AdminFooter from "../../src/components/AdminFooter";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";
import Layout from "../../src/components/Layout";
import Input from "../../src/components/Input";


export default function CreateEvent() {
  const router = useRouter();

  return (
    <Layout footer={<AdminFooter />}>
      <Input placeholder="Nombre" />
      <Input placeholder="Ubicación" />
      <Input placeholder="Fecha" />
      <Input placeholder="Capacidad" />
      <Input placeholder="Descripción" />

      <CustomButton title="Subir imagen" onPress={() => {}} />

      <CustomButton
        title="Guardar"
        onPress={() => router.replace("/admin")}
      />
    </Layout>
  );
}