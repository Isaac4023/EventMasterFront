import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function UserFooter() {
  const router = useRouter();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <CustomButton title="Events" onPress={() => router.replace("/user")} />
      <CustomButton title="Tickets" onPress={() => router.replace("/user/tickets")} />
      <CustomButton title="Profile" onPress={() => router.replace("/user/profile")} />
    </View>
  );
}