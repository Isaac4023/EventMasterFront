import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function AdminFooter() {
  const router = useRouter();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <CustomButton title="Status" onPress={() => router.replace("/admin")} />
      <CustomButton title="Events" onPress={() => router.replace("/admin/events")} />
      <CustomButton title="Settings" onPress={() => {}} />
    </View>
  );
}