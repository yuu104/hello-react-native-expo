export type EventData = {
  id: string;
  title: string;
  start: string;
  end: string;
  isAllDay: boolean;
  isLongDay?: boolean;
};

export const mockEvents: EventData[] = [
  {
    id: "eu48cnhjcke474vjvs6kib474g",
    title: "予定1",
    start: "2023-04-17T11:00:00+09:00",
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
    end: "2023-06-17T20:30:00+09:00",
    isAllDay: false,
  },
  {
    id: "ek8nrmu8ha9r3rr9khkdodlgjtfok",
    title: "超長い予定",
    start: "2023-11-20T00:00:00.000+09:00",
    end: "2024-02-20T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "jgdkkdkdkgijrneniksoskskkfmfifm",
    title: "わーい",
    start: "2023-06-09T00:00:00.000+09:00",
    end: "2023-06-19T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "gjenindincinnchbgeekmvoosmdllgj",
    title: "よてーーー",
    start: "2023-06-18T00:00:00.000+09:00",
    end: "2023-06-21T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "mgjnenuvnubyegbhbhybhbvhbyel",
    title: "hello",
    start: "2023-06-19T00:00:00.000+09:00",
    end: "2023-06-22T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "kgkgkgkgkgkgkgkgkjsjsjsjjsktmgmm",
    title: "yotei",
    start: "2023-06-20T00:00:00.000+09:00",
    end: "2023-06-29T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "jgjjjeuvlpwejlefndnffjffemwnsm",
    title: "pppp",
    start: "2023-06-25T00:00:00.000+09:00",
    end: "2023-06-30T00:00:00.000+09:00",
    isAllDay: true,
    isLongDay: true,
  },
  {
    id: "kfjeuejugjgnjdjsnandjddfmmf",
    title: "インターン",
    start: "2023-06-19T11:00:00.000+09:00",
    end: "2023-06-19T18:00:00.000+09:00",
    isAllDay: false,
    isLongDay: false,
  },
];
