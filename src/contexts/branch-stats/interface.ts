import { Book } from "@/src/types/book";
import { DataChart } from "@/src/types/dataChart";

export interface IBranchStatsContext {
  // Attributes
  books: Book[];
  booksPerDay: DataChart[];
  booksPerWeek: DataChart[];
  booksPerMonth: DataChart[];
  booksPerYear: DataChart[];
  range: number;

  // React useState Methods
  setBooks: (_books: Book[]) => void;
  setBooksPerDay: (_data: DataChart[]) => void;
  setBooksPerWeek: (_data: DataChart[]) => void;
  setBooksPerMonth: (_data: DataChart[]) => void;
  setBooksPerYear: (_data: DataChart[]) => void;
  setRange: (_range: number) => void;
  // Methods
}
