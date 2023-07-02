import { useEffect, useState } from "react";
import { EventData, mockEvents } from "../mocks/mockEvents";

export const useGetMonthlyEvents = (
  targetDate: Date
): { monthlyEvents: EventData[][][]; firstDate: Date; lastDate: Date } => {
  const [monthlyEvents, setMonthlyEvents] = useState<EventData[][][]>([]);

  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const monthFirstDate = new Date(targetYear, targetMonth, 1);
  const monthLastDate = new Date(targetYear, targetMonth + 1, 1);
  monthLastDate.setDate(0);

  const firstDate = new Date(targetYear, targetMonth, 1);
  firstDate.setDate(-monthFirstDate.getDay() + 1);
  const lastDate = new Date(targetYear, targetMonth);
  lastDate.setDate(monthLastDate.getDate() + 6 - monthLastDate.getDay());
  const moreDateNum =
    42 - (lastDate.getTime() - firstDate.getTime()) / 86400000;
  lastDate.setDate(lastDate.getDate() + moreDateNum - 1);

  useEffect(() => {
    const events = mockEvents.filter((event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const newStartDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const newEndDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );

      const isNowEvent =
        (newStartDate >= firstDate && newStartDate <= lastDate) ||
        (newEndDate >= firstDate && newEndDate <= lastDate) ||
        (newStartDate <= firstDate && newEndDate >= lastDate);
      return isNowEvent;
    });

    const alignedEvents = alignEvents(events, firstDate, lastDate);

    setMonthlyEvents(alignedEvents);
  }, [mockEvents, targetDate]);

  return { monthlyEvents, firstDate, lastDate };
};

const alignEvents = (events: EventData[], firstDate: Date, lastDate: Date) => {
  const tmpDate = new Date(firstDate);

  const alignedEvents: EventData[][][] = Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => [])
  );

  let day = 0;
  let week = 0;
  while (tmpDate <= lastDate) {
    const daylyEvents = getDaylyEvents(events, tmpDate);
    sortEvents(daylyEvents);
    alignedEvents[week][day] = daylyEvents;

    tmpDate.setDate(tmpDate.getDate() + 1);
    if (day === 6) {
      day = 0;
      week++;
    } else {
      day++;
    }
  }

  return alignedEvents.map((weeklyEvents) => {
    const longDayEvents: (EventData & { index?: number })[] = [];
    weeklyEvents.forEach((daylyEvents) => {
      daylyEvents.forEach((event) => {
        if (
          new Date(event.start).getDate() !== new Date(event.end).getDate() &&
          !longDayEvents.some((obj) => obj.id === event.id)
        ) {
          longDayEvents.push({ ...event });
        }
      });
    });
    if (!longDayEvents.length) return weeklyEvents;

    let eventsLength = 0;
    for (let i = 0; i < weeklyEvents.length; i++) {
      const length = weeklyEvents[i].length;
      if (length > eventsLength) eventsLength = length;
    }

    const weeklyItem = weeklyEvents.map((daylyEvents, daylyEventsIndex) => {
      if (daylyEventsIndex === 0) {
        daylyEvents.forEach((daylyEvent, daylyEventIndex) => {
          const longDayEventIndex = longDayEvents.findIndex(
            (obj) => obj.id === daylyEvent.id
          );

          if (longDayEventIndex >= 0) {
            longDayEvents[longDayEventIndex].index = daylyEventIndex;
          }
        });

        const copyDaylyEvents = daylyEvents.map((event) => ({ ...event }));
        const copyDaylyEventsLength = copyDaylyEvents.length;
        if (copyDaylyEventsLength !== eventsLength) {
          for (let i = 0; i < eventsLength - copyDaylyEventsLength; i++) {
            copyDaylyEvents.push({
              id: `null_${i}`,
              title: "",
              start: "",
              end: "",
              isAllDay: false,
            });
          }
        }

        return copyDaylyEvents;
      } else {
        const copyDaylyEvents = daylyEvents.map((event) => ({ ...event }));

        const copyDaylyEventsLength = copyDaylyEvents.length;
        if (copyDaylyEventsLength !== eventsLength) {
          for (let i = 0; i < eventsLength - copyDaylyEventsLength; i++) {
            copyDaylyEvents.push({
              id: `null_${i}`,
              title: "",
              start: "",
              end: "",
              isAllDay: false,
            });
          }
        }

        const indexedLongDaylyEvents = longDayEvents.filter(
          (item) =>
            item.index !== undefined &&
            daylyEvents.find((e) => e.id === item.id)
        );
        const indexedCopyDaylyEvents = copyDaylyEvents.filter(
          (e) =>
            indexedLongDaylyEvents.findIndex((item) => e.id === item.id) >= 0
        );
        const noIndexedCopyDaylyEvents = copyDaylyEvents.filter((item) => {
          return (
            indexedCopyDaylyEvents.findIndex((item2) => item.id === item2.id) <
            0
          );
        });

        let noIndexedCopyDaylyEventsIndex = 0;
        for (let i = 0; i < copyDaylyEvents.length; i++) {
          const indexedLongDaylyEventsIndex = indexedLongDaylyEvents.findIndex(
            (item) => item.index === i
          );
          if (indexedLongDaylyEventsIndex >= 0) {
            copyDaylyEvents[i] = indexedCopyDaylyEvents.find(
              (item2) =>
                item2.id ===
                indexedCopyDaylyEvents[indexedLongDaylyEventsIndex].id
            )!;
          } else {
            copyDaylyEvents[i] =
              noIndexedCopyDaylyEvents[noIndexedCopyDaylyEventsIndex];
            noIndexedCopyDaylyEventsIndex++;
          }
        }

        copyDaylyEvents.forEach((event, eventIndex) => {
          if (
            event.start &&
            event.end &&
            new Date(event.start).getDate() !== new Date(event.end).getDate()
          ) {
            const longDayEventIndex = longDayEvents.findIndex(
              (obj) => obj.id === event.id
            )!;

            if (longDayEvents[longDayEventIndex].index === undefined) {
              longDayEvents[longDayEventIndex].index = eventIndex;
            }
          }
        });

        return copyDaylyEvents;
      }
    });

    return weeklyItem;
  });
};

const getDaylyEvents = (events: EventData[], targetDate: Date) => {
  const tmpTargetDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  return events.filter((event) => {
    const eventStartDate = new Date(event.start);
    const eventEndDate = new Date(event.end);

    return isSameDate(eventStartDate, eventEndDate)
      ? isSameDate(eventStartDate, tmpTargetDate)
      : eventStartDate <= tmpTargetDate && eventEndDate >= tmpTargetDate;
  });
};

const sortEvents = (events: EventData[]) => {
  // 連日 -> 終日 -> 開始時刻が早い の順に並べ替える
  events.sort((a, b) => {
    if (a.isLongDay && !b.isLongDay) return -1;
    if (!a.isLongDay && b.isLongDay) return 1;
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;

    const startTimeA = new Date(a.start).getTime();
    const startTimeB = new Date(b.start).getTime();
    return startTimeA - startTimeB;
  });

  // 連日の予定を開始日順でソート（開始日が同じ場合は予定が長い順でソート）
  events.sort((a, b) => {
    if (a.isLongDay && b.isLongDay) {
      if (a.start < b.start) return -1;
      if (a.start === b.start) {
        const aLength = new Date(a.end).getTime() - new Date(a.start).getTime();
        const bLength = new Date(b.end).getTime() - new Date(b.start).getTime();
        if (aLength > bLength) return -1;
        return 1;
      }
    }
    return 0;
  });
};

const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
