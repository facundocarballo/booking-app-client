import React from "react";
import { IBranchContext } from "./interface";
import { Branch } from "@/src/types/branch";

const BranchContext = React.createContext<IBranchContext>({
  // Attributes
  branchSelected: undefined,
  branches: undefined,
  favouriteBranches: undefined,

  // React useState Methods
  setBranchesSelected: () => {},
  setBranches: () => {},
  setFavouriteBranches: () => {},
});

export const BranchContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [branchSelected, setBranchesSelected] = React.useState<
    Branch | undefined
  >(undefined);
  const [branches, setBranches] = React.useState<Branch[] | undefined>(
    undefined
  );
  const [favouriteBranches, setFavouriteBranches] = React.useState<
    Branch[] | undefined
  >(undefined);

  // Methods

  const values = {
    branchSelected,
    branches,
    favouriteBranches,

    setBranchesSelected,
    setBranches,
    setFavouriteBranches,
  };

  const memo = React.useMemo(
    () => values,
    [branchSelected, branches, favouriteBranches]
  );

  return (
    <BranchContext.Provider value={memo}>
      {props.children}
    </BranchContext.Provider>
  );
};

export function useBranchProvider(): IBranchContext {
  const context = React.useContext(BranchContext);
  if (!context)
    throw new Error("useProvider have to be inside of the BranchContext.");
  return context;
}
