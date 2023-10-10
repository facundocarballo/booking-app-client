import React from "react";
import { IBranchStatsContext } from "./interface";
import { Book } from "@/src/types/book";
import { DataChart } from "@/src/types/dataChart";

const DAY_TIME = 1000 * 60 * 60 * 24;

const BranchStatsContext = React.createContext<IBranchStatsContext>({
  // Attributes
  books: [],
  booksPerDay: [],
  booksPerWeek: [],
  booksPerMonth: [],
  booksPerYear: [],
  range: 0,

  // Methods
  // React useState Methods
  setBooks: () => {},
  setBooksPerDay: () => {},
  setBooksPerWeek: () => {},
  setBooksPerMonth: () => {},
  setBooksPerYear: () => {},
  setRange: () => {},
});

export const BranchStatsContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [books, setBooks] = React.useState<Book[]>([]);
  const [booksPerDay, setBooksPerDay] = React.useState<DataChart[]>([]);
  const [booksPerWeek, setBooksPerWeek] = React.useState<DataChart[]>([]);
  const [booksPerMonth, setBooksPerMonth] = React.useState<DataChart[]>([]);
  const [booksPerYear, setBooksPerYear] = React.useState<DataChart[]>([]);
  const [range, setRange] = React.useState<number>(0);
  // Methods
  const values = {
    books,
    booksPerDay,
    booksPerWeek,
    booksPerMonth,
    booksPerYear,
    range,

    setBooks,
    setBooksPerDay,
    setBooksPerWeek,
    setBooksPerMonth,
    setBooksPerYear,
    setRange,
  };

  const memo = React.useMemo(() => values, [books, booksPerDay, range]);

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
