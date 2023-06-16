import { useState, useEffect } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import ENV from "../environments";
import { Link } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: ENV.EXPO_CLIENT_ID,
    iosClientId: ENV.IOS_CLIENT_ID,
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  });

  const [token, setToken] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  console.log(events);

  const getGoogleCalendarEvents = async () => {
    const month = 6;
    const timeMin = new Date(2023, month - 1, 1, 0, 0, 0).toISOString();
    const timeMax = new Date(2023, month, 0, 23, 59, 59).toISOString();

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setEvents(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      setToken(response.authentication.accessToken);
    }
  }, [response, token]);

  return (
    <SafeAreaView style={styles.container}>
      {!token ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View>
          <Button
            title="Googleカレンダーと連携する"
            onPress={getGoogleCalendarEvents}
          />
          {!!events.length &&
            events.map((item: any) => (
              <Text key={item.id} style={styles.text}>
                {item.summary}
              </Text>
            ))}
        </View>
      )}
      <Link href="/home" style={styles.link}>
        Homeに戻る
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
    fontSize: 20,
    fontWeight: "bold",
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
