export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@test.com" && password === "1234") {
        resolve({ token: "fake-token", role: "admin" });
      } else if (email === "user@test.com" && password === "1234") {
        resolve({ token: "fake-token", role: "user" });
      } else if (email === "staff@test.com" && password === "1234") {
        resolve({ token: "fake-token", role: "staff" });
      } else {
        reject("Credenciales incorrectas");
      }
    }, 500);
  });
};