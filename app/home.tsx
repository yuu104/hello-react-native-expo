import { Link } from "expo-router";
import { Text, StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home page</Text>
      <Link href="/google-calendar" style={styles.link}>
        Googleカレンダー連携
      </Link>
      <Link href="react-native-calendar" style={styles.link}>
        React Native Calendar
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    fontSize: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 5,
    borderRadius: 6,
  },
});