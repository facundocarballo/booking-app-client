import { Branch } from "@/src/types/branch";

export interface IBranchContext {
    // Attributes
    branchSelected?: Branch;
    branches?: Branch[];
    searchBranches?: Branch[];
    favouriteBranches?: Branch[];

    // React useState Methods
    setBranchesSelected: (_business: Branch) => void,
    setBranches: (_business: Branch[]) => void,
    setSearchBranches: (_business: Branch[]) => void,
    setFavouriteBranches: (_business: Branch[]) => void,

    // Methods
};