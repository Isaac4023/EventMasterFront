import { View, StyleSheet } from "react-native";

export default function Layout({ children, footer }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
  },
});