import { useBranchStatsProvider } from "@/src/contexts/branch-stats";
import React from "react";

export const BooksChart = () => {
  // Attributes
  // Context
  const { books } = useBranchStatsProvider();
  // Methods
  // Component
  return (
    <>
      <h2>{books.length} Books</h2>
    </>
  );
};
