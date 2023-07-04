import { Link } from "expo-router";
import { Text, StyleSheet, SafeAreaView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home page</Text>
      <Link href="/google-calendar" style={styles.link}>
        Googleカレンダー連携
      </Link>
      <Link href="/react-native-calendar" style={styles.link}>
        React Native Calendar
      </Link>
      <Link href="/react-native-big-calendar" style={styles.link}>
        React Native Big Calendar
      </Link>
      <Link href="/sample" style={styles.link}>
        Sample
      </Link>
      <Link href="/calendar" style={styles.link}>
        Calendar
      </Link>
    </SafeAreaView>
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
