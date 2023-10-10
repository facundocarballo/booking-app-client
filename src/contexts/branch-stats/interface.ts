import { Book } from "@/src/types/book";

export interface IBranchStatsContext {
  // Attributes
  books: Book[];
  dateFrom: Date;
  dateTo: Date;

  // React useState Methods
  setBooks: (_books: Book[]) => void;
  setDateFrom: (_date: Date) => void;
  setDateTo: (_date: Date) => void;

  // Methods
  handlerSetDateFrom: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handlerSetDateTo: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}
