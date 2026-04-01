import { Text } from "react-native";
import UserFooter from "../../src/components/UserFooter";
import useEvents from "../../src/hooks/useEvents";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function UserHome() {
  const { events } = useEvents();
  const router = useRouter();

  return (
    <Layout footer={<UserFooter />}>
      <Text>Eventos</Text>

      {events.map((e) => (
        <CustomButton
          key={e.id}
          title={e.name}
          onPress={() => router.push("/user/event")}
        />
      ))}
    </Layout>
  );
}