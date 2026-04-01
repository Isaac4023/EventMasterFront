import { TextInput, StyleSheet } from "react-native";

export default function Input(props) {
  return <TextInput style={styles.input} 
   placeholderTextColor="#555" 
   {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: "80%",
    margin: 5,
    padding: 8,
  },
});