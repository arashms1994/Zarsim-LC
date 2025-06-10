import * as moment from 'moment-jalaali';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

export function getTodayPersianDate(): { year: number; month: number; day: number } {
  const m = moment();
  return {
    year: parseInt(m.format('jYYYY'), 10),
    month: parseInt(m.format('jM'), 10),
    day: parseInt(m.format('jD'), 10),
  };
}

export function formatPersianDate(year: number, month: number, day: number): string {
  return `${pad(year)}/${pad(month)}/${pad(day)}`;
}

export function pad(n: number | string, length: number = 2): string {
  const num = parseInt(n.toString(), 10);
  if (isNaN(num)) return "00";
  return num < 10 ? `0${num}` : `${num}`;
}
