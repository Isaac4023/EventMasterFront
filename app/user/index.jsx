import { Text, View } from "react-native";
import Layout from "@/src/components/Layout";
import useEvents from "../../src/hooks/useEvents";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function UserHome() {
  const { events } = useEvents();
  const router = useRouter();

  return (
    <Layout
      footer={
        <>
          <CustomButton title="Events" onPress={() => router.push("/user")} />
          <CustomButton title="Tickets" onPress={() => router.push("/user/tickets")} />
          <CustomButton title="Profile" onPress={() => router.push("/user/profile")} />
        </>
      }
    >
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