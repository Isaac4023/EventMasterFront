import { TextInput } from "react-native";
import Input from "../../src/components/Input";
import Layout from "../../src/components/Layout";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function CreateEvent() {
  const router = useRouter();

  return (
    <Layout>
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