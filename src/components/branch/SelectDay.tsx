import React from "react";
import { Input } from "@chakra-ui/react";
import { useBookProvider } from "@/src/contexts/book";
import { useBranchProvider } from "@/src/contexts/branch";

const DAY_TIME = 1000 * 60 * 60 * 24;

export const SelectDay = () => {
  // Attributes
  // Context
  const { branchSelected } = useBranchProvider();
  const { setDaySelected, setBooksAvailables } = useBookProvider();
  // Methods
  const handleChangeDate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(
      new Date(event.currentTarget.value).getTime() + DAY_TIME
    );
    setDaySelected(date);
    await handleGetBooks(date);
  };

  const handleGetBooks = async (date: Date) => {
    if (!branchSelected) return;
    const books = await branchSelected.GetAvailableBooks(date);
    setBooksAvailables(books);
  };
  // Component
  return (
    <>
      <Input type="date" w="200px" onChange={(e) => handleChangeDate(e)} />
    </>
  );
};
