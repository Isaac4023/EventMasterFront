import { TextInput, StyleSheet } from "react-native";

export default function Input(props) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: "80%",
    margin: 5,
    padding: 8,
  },
});