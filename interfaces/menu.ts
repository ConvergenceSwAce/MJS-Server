export interface Menu {
  date: Date;
  day: string;
  cafeteria: number;
  lunchA?: Array<string>;
  lunchB?: Array<string>;
  lunch?: Array<string>;
  dinner?: Array<string>;
}
