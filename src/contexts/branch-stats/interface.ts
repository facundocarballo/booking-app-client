import { Book } from "@/src/types/book";

export interface IBranchStatsContext {
  // Attributes
  books: Book[];

  // React useState Methods
  setBooks: (_books: Book[]) => void;

  // Methods
}
