import { Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import CustomButton from "../src/components/CustomButton";
import useAuth from "../src/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <Text style={{ marginBottom: 10 }}>Login</Text>

      <Input placeholder="Email" onChangeText={setEmail} />
      <Input placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <CustomButton
        title="Login"
        onPress={() => handleLogin(email, password, router)}
      />
    </Layout>
  );
}