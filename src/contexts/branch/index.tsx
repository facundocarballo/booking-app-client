import React from "react";
import { IBranchContext } from "./interface";
import { Branch } from "@/src/types/branch";
import { Client } from "@/src/types/Client";

const BranchContext = React.createContext<IBranchContext>({
  // Attributes
  branchSelected: undefined,
  branches: undefined,
  searchBranches: undefined,
  favouriteBranches: undefined,
  clients: undefined,
  clientsFiltered: undefined,

  // React useState Methods
  setBranchesSelected: () => {},
  setBranches: () => {},
  setSearchBranches: () => {},
  setFavouriteBranches: () => {},
  setClients: () => {},
  setClientsFiltered: () => {},
});

export const BranchContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [branchSelected, setBranchesSelected] = React.useState<
    Branch | undefined
  >(undefined);
  const [branches, setBranches] = React.useState<Branch[] | undefined>(
    undefined
  );
  const [searchBranches, setSearchBranches] = React.useState<
    Branch[] | undefined
  >(undefined);
  const [favouriteBranches, setFavouriteBranches] = React.useState<
    Branch[] | undefined
  >(undefined);
  const [clients, setClients] = React.useState<Client[] | undefined>(undefined);
  const [clientsFiltered, setClientsFiltered] = React.useState<
    Client[] | undefined
  >(undefined);

  // Methods

  const values = {
    branchSelected,
    branches,
    searchBranches,
    favouriteBranches,
    clients,
    clientsFiltered,

    setBranchesSelected,
    setBranches,
    setSearchBranches,
    setFavouriteBranches,
    setClients,
    setClientsFiltered,
  };

  const memo = React.useMemo(
    () => values,
    [
      branchSelected,
      branches,
      searchBranches,
      favouriteBranches,
      clients,
      clientsFiltered,
    ]
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
