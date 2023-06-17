import { Link } from "expo-router";
import { ComponentType } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";

export default function ReactNativeCalendar() {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        showSixWeeks
        style={styles.calendar}
        dayComponent={DayComponent}
        enableSwipeMonths={true}
        theme={{
          "stylesheet.calendar.main": {
            monthView: {
              flex: 1,
              height: "100%",
              justifyContent: "space-around",
            },
            week: {
              flex: 1,
              marginVertical: 0,
              flexDirection: "row",
              justifyContent: "space-around",
            },
            dayContainer: {
              borderColor: "#f5f5f5",
              borderWidth: 1,
              flex: 1,
            },
          },
        }}
      />
      <View style={styles.linkContainer}>
        <Link href="/home" style={styles.link}>
          Homeへ戻る
        </Link>
      </View>
    </SafeAreaView>
  );
}

const DayComponent: ComponentType<
  DayProps & { date?: DateData | undefined }
> = ({ date, state }) => {
  if (!date) return null;

  const day = date.day;

  const events = mockData.filter((data) => {
    const startDate = new Date(data.start).getDate();
    const endDate = new Date(data.end).getDate();
    if (day >= startDate && day <= endDate) return data;
  });

  events.sort((a, b) => {
    if (a.isLongDay && !b.isLongDay) return -1;
    if (!a.isLongDay && b.isLongDay) return 1;
    if (a.isLongDay && b.isLongDay) {
      const aDiffTime = new Date(a.end).getTime() - new Date(a.start).getTime();
      const bDiffTime = new Date(b.end).getTime() - new Date(b.start).getTime();
      return aDiffTime > bDiffTime ? -1 : 1;
    }

    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;

    const startTimeA = new Date(a.start).getTime();
    const startTimeB = new Date(b.start).getTime();
    return startTimeA - startTimeB;
  });

  return (
    <View style={styles.dateBox}>
      <Text style={styles.day}>{day}</Text>
      {events.map((event) => (
        <Text
          key={event.id}
          style={(styles.eventTitle, event.isLongDay && styles.longDayEvent)}
        >
          {event.title}
        </Text>
      ))}
    </View>
  );
};

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
  dateBox: {
    width: "100%",
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
  },
  eventTitle: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 5,
  },
  longDayEvent: {
    backgroundColor: "#00bfff",
  },
});

type EventData = {
  id: string;
  title: string;
  start: string;
  end: string;
  isAllDay: boolean;
  isLongDay?: boolean;
};

const mockData: EventData[] = [
  {
    id: "eu48cnhjcke474vjvs6kib474g",
    title: "予定1",
    start: "023-04-17T11:00:00+09:00",
    end: "2023-04-17T18:00:00+09:00",
    isAllDay: false,
  },
  {
    id: "2ntasugrhfq8vs5al7s6od9tk0",
    title: "予定2",
    start: "2023-04-18T11:00:00+09:00",
    end: "2023-04-18T18:00:00+09:00",
    isAllDay: false,
  },
  {
    id: "ek8nrmu8ha9r3rr9f0oheqmufk",
    title: "予定3",
    start: "2023-06-17T19:20:00+09:00",
    end: "2023-06-17T20:20:00+09:00",
    isAllDay: false,
  },
  {
    id: "ek8nrmu8ha9r3rr9f0oheqmufp",
    title: "長い予定",
    start: "2023-06-17T00:00:00.000+09:00",
    end: "2023-06-25T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "ek8nrmu8ha9r3rr9f0oheqmufe",
    title: "長い予定2",
    start: "2023-06-20T00:00:00.000+09:00",
    end: "2023-06-26T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
];
