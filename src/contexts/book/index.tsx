import React from "react";
import { IBookContext } from "./interface";
import { Book } from "@/src/types/book";

const BookContext = React.createContext<IBookContext>({
  // Attributes
  bookSelected: undefined,
  books: undefined,
  showAvailable: true,

  // React useState Methods
  setBookSelected: () => {},
  setBooks: () => {},
  setShowAvailable: () => {},
});

export const BookContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [bookSelected, setBookSelected] = React.useState<Book | undefined>(
    undefined
  );
  const [books, setBooks] = React.useState<Book[] | undefined>(undefined);
  const [showAvailable, setShowAvailable] = React.useState<boolean>(true);

  // Methods

  const values = {
    bookSelected,
    books,
    showAvailable,

    setBookSelected,
    setBooks,
    setShowAvailable,
  };

  const memo = React.useMemo(
    () => values,
    [bookSelected, books, showAvailable]
  );

  return (
    <BookContext.Provider value={memo}>{props.children}</BookContext.Provider>
  );
};

export function useBookProvider(): IBookContext {
  const context = React.useContext(BookContext);
  if (!context)
    throw new Error("useProvider have to be inside of the BookContext.");
  return context;
}
