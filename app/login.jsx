import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import useAuth from "../src/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { handleLogin, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Text>Login</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} />

      <Button
        title="Login"
        onPress={() => handleLogin(email, password, router)}
      />

      {error ? <Text>{error}</Text> : null}
    </View>
  );
}