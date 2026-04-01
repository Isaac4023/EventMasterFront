import { View, Text } from "react-native";
import useEvents from "../../src/hooks/useEvents";
import EventCard from "../../src/components/EventCard";
import CustomButton from "../../src/components/CustomButton";
import { useRouter } from "expo-router";

export default function UserHome() {
  const { events } = useEvents();
  const router = useRouter();

  return (
    <View>
      <Text>Eventos</Text>

      {events.map((e) => (
        <View key={e.id}>
          <EventCard name={e.name} date={e.date} />
          <CustomButton
            title="Ver detalles"
            onPress={() => router.push("/user/event")}
          />
        </View>
      ))}
    </View>
  );
}