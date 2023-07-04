import React, { FC } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGetMonthlyEvents } from "../hooks/useGetMonthlyEvents";
import { EventData } from "../mocks/mockEvents";

export default function CalendarPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar />
      </View>
      <View style={styles.linkContainer}>
        <Link href="/home" style={styles.link}>
          Homeへ戻る
        </Link>
      </View>
    </SafeAreaView>
  );
}

const Calendar: FC = () => {
  const [displayDateData, setDisplayDateData] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const { monthlyEvents, firstDate, lastDate } =
    useGetMonthlyEvents(displayDateData);

  const handleDisplayDateDataChange = (a: "prev" | "next") => {
    setDisplayDateData((prevState) => {
      const year = prevState.getFullYear();
      const month = prevState.getMonth();
      return a === "prev"
        ? new Date(year, month - 1, 1)
        : new Date(year, month + 1, 1);
    });
  };

  return (
    <View style={calendarStyles.container}>
      <View style={calendarStyles.header}>
        <TouchableOpacity onPress={() => handleDisplayDateDataChange("prev")}>
          <View>
            <Text>Prev</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={calendarStyles.monthLabel}
          >{`${displayDateData.getFullYear()}年${
            displayDateData.getMonth() + 1
          }月`}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDisplayDateDataChange("next")}>
          <View>
            <Text>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={calendarStyles.dayLabel}>
        <Text style={[calendarStyles.dayLabelText, { color: "#37BFD2" }]}>
          日
        </Text>
        <Text style={calendarStyles.dayLabelText}>月</Text>
        <Text style={calendarStyles.dayLabelText}>火</Text>
        <Text style={calendarStyles.dayLabelText}>水</Text>
        <Text style={calendarStyles.dayLabelText}>木</Text>
        <Text style={calendarStyles.dayLabelText}>金</Text>
        <Text style={[calendarStyles.dayLabelText, { color: "#2F7EF0" }]}>
          土
        </Text>
      </View>
      <View style={calendarStyles.eventMatrix}>
        {monthlyEvents.map((weeklyEvents, weeklyIndex) => (
          <View key={weeklyIndex} style={calendarStyles.weeklyEvents}>
            {weeklyEvents.map((daylyEvents, daylyIndex) => (
              <View
                key={daylyIndex}
                style={[
                  calendarStyles.daylyEvents,
                  daylyIndex === 6 && { borderRightWidth: 0 },
                ]}
              >
                <View
                  style={[
                    calendarStyles.dateLabelLayout,
                    isEqualDay(
                      new Date(),
                      getDate(firstDate, weeklyIndex, daylyIndex)
                    ) && {
                      backgroundColor: "#37BFD2",
                      borderWidth: 1,
                      borderColor: "#37BFD2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      calendarStyles.dateLabel,
                      daylyIndex === 0 && { color: "#37BFD2" },
                      daylyIndex === 6 && { color: "#2F7EF0" },
                      ,
                      isEqualDay(
                        new Date(),
                        getDate(firstDate, weeklyIndex, daylyIndex)
                      ) && { color: "#fff" },
                    ]}
                  >
                    {getDate(firstDate, weeklyIndex, daylyIndex).getDate()}
                  </Text>
                </View>
                {/* <View>
                  {daylyEvents.map((event) => (
                    <View key={event.id}>
                      <Text
                        style={[
                          !isEqualDay(
                            new Date(event.start),
                            new Date(event.end)
                          ) && { opacity: 0 },
                        ]}
                      >
                        {event.title}
                      </Text>
                      {!isEqualDay(
                        new Date(event.start),
                        new Date(event.end)
                      ) && <Text>{event.title}</Text>}
                    </View>
                  ))}
                </View> */}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const getDate = (firstDate: Date, weeklyIndex: number, daylyIndex: number) => {
  return new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate() + weeklyIndex * 7 + daylyIndex
  );
};

const isEqualDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// const isLongDay = (event: EventData) => {
//   const start = new Date(event.start);
//   const end = new Date(event.end);
//   return (
//     start.getFullYear() === end.getFullYear() &&
//     start.getMonth() === end.getMonth() &&
//     start.getDate() === end.getDate()
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  calendarContainer: {
    flexGrow: 0.8,
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
});

const calendarStyles = StyleSheet.create({
  container: {
    height: "80%",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#485354",
  },
  dayLabel: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 22,
    marginTop: 7,
  },
  dayLabelText: {
    fontSize: 10,
    textAlign: "center",
    color: "#394959",
  },
  eventMatrix: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#E0E7EC",
  },
  weeklyEvents: {
    flex: 1,
    flexDirection: "row",
  },
  daylyEvents: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E7EC",
  },
  dateLabelLayout: {
    borderBottomWidth: 1,
    borderColor: "#E0E7EC",
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#394959",
  },
});
