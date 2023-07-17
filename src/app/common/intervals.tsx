export interface Interval {
  interval: number;
  displayedInterval: string;
}

export const intervals: Interval[] = [
  { interval: 5, displayedInterval: "5m" },
  { interval: 15, displayedInterval: "15m" },
  { interval: 30, displayedInterval: "30m" },
  { interval: 60, displayedInterval: "1h" },
  //   { interval: 5, dispayedInterval: "4h" },
  //   { interval: 5, dispayedInterval: "1D" },
  //   { interval: 5, dispayedInterval: "1W" },
];
