import { Link } from "expo-router";
import { FC, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { EventData, useGetMonthlyEvents } from "../hooks/useGetMonthlyEvents";

export default function ReactNativeCalendar() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const handleMonthChange = (date: DateData) => {
    setMonth(date.month);
  };

  const { monthlyEvents } = useGetMonthlyEvents(month);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        showSixWeeks
        style={styles.calendar}
        dayComponent={({ date }) => {
          return date ? (
            <DayComponent date={date} monthlyEvents={monthlyEvents} />
          ) : null;
        }}
        enableSwipeMonths={true}
        onMonthChange={handleMonthChange}
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

type DayComponentPops = {
  date: DateData;
  monthlyEvents: EventData[];
};

const DayComponent: FC<DayComponentPops> = ({ date, monthlyEvents }) => {
  if (!date) return null;

  const day = date.day;
  const month = date.month;

  const events = monthlyEvents.filter((event) => {
    const startMonth = new Date(event.start).getMonth() + 1;
    const startDate = new Date(event.start).getDate();
    const endMonth = new Date(event.end).getMonth() + 1;
    const endDate = new Date(event.end).getDate();

    if (startMonth === endMonth && day >= startDate && day <= endDate)
      return true;
    if (startMonth !== endMonth) {
      if (month === startMonth && day >= startDate) return true;
      if (month === endMonth && day <= endDate) return true;
      if (startMonth > endMonth) {
        if ((month > startMonth && month <= 12) || month < endMonth) {
          return true;
        }
      }
    }
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
          numberOfLines={1}
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
    // width: "110%",
    // zIndex: 100,
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
