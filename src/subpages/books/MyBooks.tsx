import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Spacer,
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useBookProvider } from "@/src/contexts/book";
import { BookAvailable } from "@/src/components/book/BookAvailable";
import { BookUnavailable } from "@/src/components/book/BookUnavailable";
import { useBranchProvider } from "@/src/contexts/branch";
import { compareTimes } from "@/src/handlers/dates";

export const MyBooks = () => {
  // Attributes
  const templeteColumns = {
    "2xl": "repeat(10, 1fr)",
    xl: "repeat(9, 1fr)",
    lg: "repeat(7, 1fr)",
    md: "repeat(5, 1fr)",
    sm: "repeat(3, 1fr)",
    base: "repeat(2, 1fr)",
  };
  // Context
  const { branchSelected } = useBranchProvider();
  const {
    booksAvailables,
    showAvailable,
    books,
    daySelected,
    setBooksAvailables,
    setBooks,
  } = useBookProvider();
  // Methods
  const handleGetBooks = async (date: Date) => {
    if (!branchSelected) return;
    const busyBooks = await branchSelected.GetBusyBooks(date);
    const books = await branchSelected.GetAvailableBooks(busyBooks);
    const busyBooksSorted = busyBooks.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const booksSorted = books.sort((a, b) => compareTimes(a, b));
    setBooksAvailables(booksSorted);
    setBooks(busyBooksSorted);
  };

  React.useEffect(() => {
    if (books) return;
    handleGetBooks(daySelected);
  }, []);
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Heading>My Books</Heading>
          <Spacer />
        </HStack>
        <Box h="10px" />
        <HStack>
          <Box w="10px" />
          <Grid w="full" templateColumns={templeteColumns} gap={6}>
            {showAvailable
              ? booksAvailables.map((b, idx) => (
                  <BookAvailable time={b} key={idx} />
                ))
              : books !== undefined
              ? books.map((b) => <BookUnavailable key={b.id} book={b} />)
              : null}
          </Grid>
          <Box w="10px" />
        </HStack>
        {showAvailable && booksAvailables.length === 0 ? (
          <Text variant="empty">
            {"Don't have a book availables for this day."}
          </Text>
        ) : null}
        {!showAvailable && books !== undefined && books.length === 0 ? (
          <Text variant="empty">{"Don't have a book appointment yet."}</Text>
        ) : null}
      </VStack>
    </>
  );
};
