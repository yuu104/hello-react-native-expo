import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  LayoutChangeEvent,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGetMonthlyEvents } from "../hooks/useGetMonthlyEvents";

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

  const [eventMatrixWidth, setEventMatrixWidth] = useState(0);

  const handleDisplayDateDataChange = (a: "prev" | "next") => {
    setDisplayDateData((prevState) => {
      const year = prevState.getFullYear();
      const month = prevState.getMonth();
      return a === "prev"
        ? new Date(year, month - 1, 1)
        : new Date(year, month + 1, 1);
    });
  };

  const calculateLongDayWidth = (targetDate: Date, endDate: Date) => {
    const diff = 6 - targetDate.getDay();
    const saturdayDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate() + diff
    );

    let numOfDays: number;

    if (saturdayDate > endDate) {
      numOfDays = endDate.getDay() - targetDate.getDay() + 1;
    } else {
      numOfDays = 7 - targetDate.getDay();
    }

    return ((eventMatrixWidth - 6) / 7) * numOfDays + (numOfDays - 1);
  };

  const onLayoutEventMatrix = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setEventMatrixWidth(width);
  };

  console.log(monthlyEvents);

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
      <View style={calendarStyles.eventMatrix} onLayout={onLayoutEventMatrix}>
        {monthlyEvents.map((weeklyEvents, weeklyIndex) => (
          <View key={weeklyIndex} style={calendarStyles.weeklyEvents}>
            {weeklyEvents.map((daylyEvents, daylyIndex) => (
              <View
                key={daylyIndex}
                style={[
                  calendarStyles.daylyEvents,
                  { zIndex: 7 - daylyIndex },
                  daylyIndex === 6 && { borderRightWidth: 0 },
                ]}
              >
                <View
                  style={[
                    calendarStyles.dateLabelLayout,
                    isEqualDay(
                      new Date(),
                      getTargetDate(firstDate, weeklyIndex, daylyIndex)
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
                        getTargetDate(firstDate, weeklyIndex, daylyIndex)
                      ) && { color: "#fff" },
                    ]}
                  >
                    {getTargetDate(
                      firstDate,
                      weeklyIndex,
                      daylyIndex
                    ).getDate()}
                  </Text>
                </View>
                <View
                  style={[
                    calendarStyles.eventsLayout,
                    isEqualDay(
                      new Date(),
                      getTargetDate(firstDate, weeklyIndex, daylyIndex)
                    ) && { backgroundColor: "#F3F6F7" },
                  ]}
                >
                  {daylyEvents.map((event, eventIndex) => (
                    <View key={event.id} style={calendarStyles.eventLayout}>
                      {eventIndex === 3 && event.start ? (
                        <View>
                          <Text style={calendarStyles.event}>他2件</Text>
                        </View>
                      ) : eventIndex < 3 ? (
                        <>
                          <View>
                            <Text
                              style={[
                                (!isEqualDay(
                                  new Date(event.start),
                                  new Date(event.end)
                                ) ||
                                  !event.start) && { opacity: 0 },
                                calendarStyles.event,
                              ]}
                            >
                              {event.title}
                            </Text>
                          </View>
                          {!isEqualDay(
                            new Date(event.start),
                            new Date(event.end)
                          ) &&
                            event.start &&
                            (daylyIndex === 0 ||
                              isEqualDay(
                                getTargetDate(
                                  firstDate,
                                  weeklyIndex,
                                  daylyIndex
                                ),
                                new Date(event.start)
                              )) && (
                              <View
                                style={[
                                  calendarStyles.longEventLayout,
                                  {
                                    width: calculateLongDayWidth(
                                      getTargetDate(
                                        firstDate,
                                        weeklyIndex,
                                        daylyIndex
                                      ),
                                      new Date(event.end)
                                    ),
                                  },
                                ]}
                              >
                                <Text style={calendarStyles.longEvent}>
                                  {event.title}
                                </Text>
                              </View>
                            )}
                        </>
                      ) : null}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const getTargetDate = (
  firstDate: Date,
  weeklyIndex: number,
  daylyIndex: number
) => {
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
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E0E7EC",
    height: 16,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#394959",
  },
  eventsLayout: {
    flex: 1,
    position: "relative",
    paddingTop: 3,
  },
  eventLayout: {
    marginBottom: 2,
  },
  event: {
    fontSize: 10,
    color: "#555555",
  },
  longEventLayout: {
    position: "absolute",
    left: 0,
    backgroundColor: "#4CAF50",
  },
  longEvent: {
    fontSize: 10,
    color: "#fff",
  },
});
