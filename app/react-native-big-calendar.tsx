import { SafeAreaView, StyleSheet, Button } from "react-native";
import { Calendar, ICalendarEventBase } from "react-native-big-calendar";
import { mockEvents } from "../mocks/mockEvents";

export default function ReactNativeBigCalendar() {
  const eventsData: ICalendarEventBase[] = mockEvents.map((mockEvent) => {
    return {
      title: mockEvent.title,
      start: new Date(mockEvent.start),
      end: new Date(mockEvent.end),
    };
  });
  console.log(eventsData);
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Prev" />
      <Calendar
        events={eventsData}
        height={0}
        mode="month"
        onPressEvent={(e) => console.log(e)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  calendar: {
    backgroundColor: "#fff",
    height: "95%",
    borderColor: "#d3d3d3",
  },
  linkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    width: 150,
    textAlign: "center",
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 6,
  },
  day: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  eventBox: {
    position: "relative",
  },
  eventTitle: {
    fontSize: 10,
    marginBottom: 5,
  },
  longDayEvent: {
    position: "absolute",
    backgroundColor: "#00bfff",
    top: 0,
    left: 0,
  },
});
