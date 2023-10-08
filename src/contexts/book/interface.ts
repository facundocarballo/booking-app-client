import { Book } from "@/src/types/book";

export interface IBookContext {
  // Attributes
  bookSelected?: Book;
  books?: Book[];
  showAvailable: boolean;
  daySelected: Date;
  booksAvailables: string[];

  // React useState Methods
  setBookSelected: (_book: Book) => void;
  setBooks: (_books: Book[]) => void;
  setShowAvailable: (_showAvailable: boolean) => void;
  setDaySelected: (_daySelected: Date) => void;
  setBooksAvailables: (_booksAvailables: string[]) => void;
  // Methods
}
