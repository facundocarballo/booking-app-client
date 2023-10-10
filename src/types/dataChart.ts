import {
  areInTheSameDay,
  areInTheSameMonth,
  areInTheSameWeek,
  areInTheSameYear,
  getDateString,
  getMonthString,
  getWeekRange,
} from "../handlers/dates";
import { Book } from "./book";

export class DataChart {
  name: string;
  value: number;

  constructor(name: string, value: number, date: string) {
    this.name = name;
    this.value = value;
  }

  static CreateDataChartPerDay(books: Book[]): DataChart[] {
    if (books.length === 0) return [];
    let charts: DataChart[] = [];
    let date = new Date(books[0].date);
    let value = 0;
    for (const book of books) {
      if (areInTheSameDay(date, book.date)) value++;
      else {
        charts.push({
          name: getDateString(date),
          value,
        });
        date = new Date(book.date);
        value = 1;
      }
    }
    charts.push({
      name: getDateString(date),
      value,
    });
    charts = charts.toSorted((a, b) => {
      const aDate = new Date(a.name);
      const bDate = new Date(b.name);
      return aDate.getTime() - bDate.getTime();
    });
    return charts;
  }

  static CreateDataChartPerWeek(books: Book[]): DataChart[] {
    if (books.length === 0) return [];
    let charts: DataChart[] = [];
    let date = new Date(books[0].date);
    let value = 0;
    for (const book of books) {
      if (areInTheSameWeek(date, book.date)) value++;
      else {
        charts.push({
          name: getWeekRange(date),
          value,
        });
        date = new Date(book.date);
        value = 1;
      }
    }
    charts.push({
      name: getWeekRange(date),
      value,
    });
    charts = charts.toSorted((a, b) => {
      const aDate = new Date(a.name);
      const bDate = new Date(b.name);
      return aDate.getTime() - bDate.getTime();
    });
    return charts;
  }

  static CreateDataChartPerMonth(books: Book[]): DataChart[] {
    if (books.length === 0) return [];
    let charts: DataChart[] = [];
    let date = new Date(books[0].date);
    let value = 0;
    for (const book of books) {
      if (areInTheSameMonth(date, book.date)) value++;
      else {
        charts.push({
          name: getMonthString(date),
          value,
        });
        date = new Date(book.date);
        value = 1;
      }
    }
    charts.push({
      name: getMonthString(date),
      value,
    });
    charts = charts.toSorted((a, b) => {
      const aDate = new Date(a.name);
      const bDate = new Date(b.name);
      return aDate.getTime() - bDate.getTime();
    });
    return charts;
  }

  static CreateDataChartPerYear(books: Book[]): DataChart[] {
    if (books.length === 0) return [];
    let charts: DataChart[] = [];
    let date = new Date(books[0].date);
    let value = 0;
    for (const book of books) {
      if (areInTheSameYear(date, book.date)) value++;
      else {
        charts.push({
          name: `${date.getFullYear()}`,
          value,
        });
        date = new Date(book.date);
        value = 1;
      }
    }
    charts.push({
      name: `${date.getFullYear()}`,
      value,
    });
    charts = charts.toSorted((a, b) => {
      const aDate = new Date(a.name);
      const bDate = new Date(b.name);
      return aDate.getTime() - bDate.getTime();
    });
    return charts;
  }
}
