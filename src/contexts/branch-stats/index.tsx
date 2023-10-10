import React from "react";
import { IBranchStatsContext } from "./interface";
import { Book } from "@/src/types/book";
import { getCleanDate } from "@/src/handlers/dates";

const DAY_TIME = 1000 * 60 * 60 * 24;

const BranchStatsContext = React.createContext<IBranchStatsContext>({
  // Attributes
  books: [],
  dateFrom: new Date(),
  dateTo: new Date(),

  // Methods
  handlerSetDateFrom: () => {},
  handlerSetDateTo: () => {},
  // React useState Methods
  setBooks: () => {},
  setDateFrom: () => {},
  setDateTo: () => {},
});

export const BranchStatsContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [books, setBooks] = React.useState<Book[]>([]);
  const [dateFrom, setDateFrom] = React.useState<Date>(
    new Date(Date.now() - 30 * DAY_TIME)
  );
  const [dateTo, setDateTo] = React.useState<Date>(new Date(Date.now()));
  // Methods

  const handlerSetDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(
      new Date(e.currentTarget.value).getTime() + DAY_TIME
    );
    setDateFrom(getCleanDate(newDate));
  };

  const handlerSetDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(
      new Date(e.currentTarget.value).getTime() + DAY_TIME
    );
    setDateTo(getCleanDate(newDate));
  };

  const values = {
    books,
    dateFrom,
    dateTo,

    handlerSetDateFrom,
    handlerSetDateTo,

    setBooks,
    setDateFrom,
    setDateTo,
  };

  const memo = React.useMemo(() => values, [books]);

  return (
    <BranchStatsContext.Provider value={memo}>
      {props.children}
    </BranchStatsContext.Provider>
  );
};

export function useBranchStatsProvider(): IBranchStatsContext {
  const context = React.useContext(BranchStatsContext);
  if (!context)
    throw new Error("useProvider have to be inside of the BranchStatsContext.");
  return context;
}
