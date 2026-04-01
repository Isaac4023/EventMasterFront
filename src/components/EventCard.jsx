import { View, Text, StyleSheet } from "react-native";

export default function EventCard({ name, date }) {
  return (
    <View style={styles.card}>
      <Text>{name}</Text>
      <Text>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
});