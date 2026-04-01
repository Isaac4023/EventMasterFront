import { useState } from "react";
import { login } from "../services/authService";

export default function useAuth() {
  const [error, setError] = useState("");

  const handleLogin = async (email, password, router) => {
    try {
      const res = await login(email, password);

      if (res.role === "admin") router.replace("/admin");
      else if (res.role === "staff") router.replace("/staff");
      else router.replace("/user");

    } catch (err) {
      setError(err);
    }
  };

  return { handleLogin, error };
}