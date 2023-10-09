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
  setBooksAvailables: (_times: string[]) => void;
  handleSetBooks: (_book: Book) => void;
  handleRemoveBook: (_book: Book) => void;
  handleSetBooksAvailables: (_time: string) => void;
  setShowAvailable: (_showAvailable: boolean) => void;
  setDaySelected: (_daySelected: Date) => void;
  // Methods
}
