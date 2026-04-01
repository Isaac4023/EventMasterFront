import { View, Text } from "react-native";
import useEvents from "../../src/hooks/useEvents";

export default function UserHome() {
  const { events } = useEvents();

  return (
    <View>
      <Text>Eventos</Text>

      {events.map((e) => (
        <Text key={e.id}>{e.name}</Text>
      ))}
    </View>
  );
}