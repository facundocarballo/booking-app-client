import { Client } from "@/src/types/Client";
import { Branch } from "@/src/types/branch";

export interface IBranchContext {
  // Attributes
  branchSelected?: Branch;
  branches?: Branch[];
  searchBranches?: Branch[];
  favouriteBranches?: Branch[];
  clients?: Client[];
  clientsFiltered?: Client[];

  // React useState Methods
  setBranchesSelected: (_business: Branch) => void;
  setBranches: (_business: Branch[]) => void;
  setSearchBranches: (_business: Branch[]) => void;
  setFavouriteBranches: (_business: Branch[]) => void;
  setClients: (_clients: Client[]) => void;
  setClientsFiltered: (_clients: Client[]) => void;
  // Methods
}
