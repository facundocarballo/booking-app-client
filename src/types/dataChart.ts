import { areInTheSameDay, getDateString } from "../handlers/dates";
import { Book } from "./book";

export class DataChart {
  name: string;
  value: number;

  constructor(name: string, value: number) {
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
        value = 0;
      }
    }
    charts.push({
      name: getDateString(date),
      value,
    });
    return charts;
  }
}
