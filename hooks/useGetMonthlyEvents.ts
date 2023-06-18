import { useEffect, useState } from "react";

export const useGetMonthlyEvents = (
  month: number
): { monthlyEvents: EventData[] } => {
  const [monthlyEvents, setMonthlyEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const events = mockData.filter((event) => {
      const startMonth = new Date(event.start).getMonth() + 1;
      const endMonth = new Date(event.end).getMonth() + 1;
      if (startMonth <= endMonth && month >= startMonth && month <= endMonth)
        return true;
      if (startMonth > endMonth) {
        const thisYearMonthRange = Array.from(
          { length: 12 - startMonth + 1 },
          (_, index) => startMonth + index
        );
        const nextYearMonthRange = Array.from(
          { length: endMonth },
          (_, index) => index + 1
        );
        if ([...thisYearMonthRange, ...nextYearMonthRange].includes(month)) {
          return true;
        }
      }
    });

    setMonthlyEvents(events);
  }, [month, mockData]);

  return { monthlyEvents };
};

export type EventData = {
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
  {
    id: "ek8nrmu8ha9r3rr9khkdodlgjtfok",
    title: "超長い予定",
    start: "2023-11-20T00:00:00.000+09:00",
    end: "2024-2-20T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
];
