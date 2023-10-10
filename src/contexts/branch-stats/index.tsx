import React from "react";
import { IBranchStatsContext } from "./interface";
import { Book } from "@/src/types/book";

const BranchStatsContext = React.createContext<IBranchStatsContext>({
  // Attributes
  books: [],
  // React useState Methods
  setBooks: () => {},
});

export const BranchStatsContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [books, setBooks] = React.useState<Book[]>([]);
  // Methods

  const values = {
    books,

    setBooks,
  };

  const memo = React.useMemo(() => values, [books]);

  return (
    <BranchStatsContext.Provider value={memo}>
      {props.children}
    </BranchStatsContext.Provider>
  );
};

export function useBranchProvider(): IBranchStatsContext {
  const context = React.useContext(BranchStatsContext);
  if (!context)
    throw new Error("useProvider have to be inside of the BranchStatsContext.");
  return context;
}
