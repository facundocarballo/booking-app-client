import React from "react";
import { Input } from "@chakra-ui/react";
import { useBookProvider } from "@/src/contexts/book";
import { useBranchProvider } from "@/src/contexts/branch";
import { compareTimes, getCleanDate } from "@/src/handlers/dates";

const DAY_TIME = 1000 * 60 * 60 * 24;

export const SelectDay = () => {
  // Attributes
  // Context
  const { branchSelected } = useBranchProvider();
  const { setDaySelected, setBooksAvailables, setBooks } = useBookProvider();
  // Methods
  const handleChangeDate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(
      new Date(event.currentTarget.value).getTime() + DAY_TIME
    );
    date.setHours(0);
    setDaySelected(date);
    await handleGetBooks(date);
  };

  const handleGetBooks = async (date: Date) => {
    if (!branchSelected) return;
    const minDate = getCleanDate(date, false);
    const maxDate = getCleanDate(date, true);
    const busyBooks = await branchSelected.GetBusyBooks(minDate, maxDate);
    const books = await branchSelected.GetAvailableBooks(busyBooks);
    const busyBooksSorted = busyBooks.toSorted(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const booksSorted = books.toSorted((a, b) => compareTimes(a, b));
    setBooksAvailables(booksSorted);
    setBooks(busyBooksSorted);
  };
  // Component
  return (
    <>
      <Input type="date" w="200px" onChange={(e) => handleChangeDate(e)} />
    </>
  );
};
