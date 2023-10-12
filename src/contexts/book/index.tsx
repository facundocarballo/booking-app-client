import React from "react";
import { IBookContext } from "./interface";
import { Book } from "@/src/types/book";
import { compareTimes } from "@/src/handlers/dates";

const BookContext = React.createContext<IBookContext>({
  // Attributes
  bookSelected: undefined,
  books: undefined,
  showAvailable: true,
  daySelected: new Date(Date.now()),
  booksAvailables: [],
  clientIdSelected: "",
  productIdSelected: "",

  // React useState Methods
  setBookSelected: () => {},
  setDaySelected: () => {},
  setShowAvailable: () => {},
  setBooks: () => {},
  setBooksAvailables: () => {},
  setClientIdSelected: () => {},
  setProductIdSelected: () => {},

  // Methods
  handleSetBooks: () => {},
  handleSetBooksAvailables: () => {},
  handleRemoveBook: () => {},
});

export const BookContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [bookSelected, setBookSelected] = React.useState<Book | undefined>(
    undefined
  );
  const [books, setBooks] = React.useState<Book[] | undefined>(undefined);
  const [showAvailable, setShowAvailable] = React.useState<boolean>(true);
  const [daySelected, setDaySelected] = React.useState<Date>(
    new Date(Date.now())
  );
  const [booksAvailables, setBooksAvailables] = React.useState<string[]>([]);
  const [clientIdSelected, setClientIdSelected] = React.useState<string>("");
  const [productIdSelected, setProductIdSelected] = React.useState<string>("");

  // Methods
  const handleSetBooks = (book: Book): void => {
    if (!books) {
      setBooks([book]);
      return;
    }
    let booksSorted = books;
    booksSorted.push(book);
    booksSorted = booksSorted.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    setBooks(booksSorted);
  };

  const handleRemoveBook = (book: Book): void => {
    if (!books) {
      return;
    }
    let newBooks: Book[] = [];
    for (const b of books) {
      if (b.id !== book.id) newBooks.push(b);
    }
    setBooks(newBooks);
  };

  const handleSetBooksAvailables = (time: string): void => {
    if (!booksAvailables) {
      setBooksAvailables([time]);
      return;
    }
    let timeSorted = booksAvailables;
    timeSorted.push(time);
    timeSorted = timeSorted.sort((a, b) => compareTimes(a, b));
    setBooksAvailables(timeSorted);
  };

  const values = {
    bookSelected,
    books,
    showAvailable,
    daySelected,
    booksAvailables,
    clientIdSelected,
    productIdSelected,

    setBookSelected,
    setBooks,
    setBooksAvailables,
    setShowAvailable,
    setDaySelected,
    setClientIdSelected,
    setProductIdSelected,

    handleSetBooks,
    handleSetBooksAvailables,
    handleRemoveBook,
  };

  const memo = React.useMemo(
    () => values,
    [
      bookSelected,
      books,
      showAvailable,
      daySelected,
      booksAvailables,
      clientIdSelected,
      productIdSelected,
    ]
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
