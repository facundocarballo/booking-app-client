import React from "react";
import { IBranchStatsContext } from "./interface";
import { Book } from "@/src/types/book";
import { DataChart } from "@/src/types/dataChart";
import { DataClient } from "@/src/types/Client/data";
import { DataProduct } from "@/src/types/Product/data";

const BranchStatsContext = React.createContext<IBranchStatsContext>({
  // Attributes
  books: [],
  booksPerDay: [],
  booksPerWeek: [],
  booksPerMonth: [],
  booksPerYear: [],
  range: 0,
  clients: [],
  products: [],

  // Methods
  // React useState Methods
  setBooks: () => {},
  setBooksPerDay: () => {},
  setBooksPerWeek: () => {},
  setBooksPerMonth: () => {},
  setBooksPerYear: () => {},
  setRange: () => {},
  setClients: () => {},
  setProducts: () => {},
});

export const BranchStatsContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [books, setBooks] = React.useState<Book[]>([]);
  const [booksPerDay, setBooksPerDay] = React.useState<DataChart[]>([]);
  const [booksPerWeek, setBooksPerWeek] = React.useState<DataChart[]>([]);
  const [booksPerMonth, setBooksPerMonth] = React.useState<DataChart[]>([]);
  const [booksPerYear, setBooksPerYear] = React.useState<DataChart[]>([]);
  const [range, setRange] = React.useState<number>(0);
  const [clients, setClients] = React.useState<DataClient[]>([]);
  const [products, setProducts] = React.useState<DataProduct[]>([]);
  // Methods
  const values = {
    books,
    booksPerDay,
    booksPerWeek,
    booksPerMonth,
    booksPerYear,
    range,
    clients,
    products,

    setBooks,
    setBooksPerDay,
    setBooksPerWeek,
    setBooksPerMonth,
    setBooksPerYear,
    setRange,
    setClients,
    setProducts,
  };

  const memo = React.useMemo(
    () => values,
    [
      books,
      booksPerDay,
      booksPerWeek,
      booksPerMonth,
      booksPerYear,
      range,
      clients,
      products,
    ]
  );

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
