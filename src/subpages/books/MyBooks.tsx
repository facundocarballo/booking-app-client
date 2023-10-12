import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Spacer,
  Box,
  Text,
  Grid,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { MdOutlineQueryStats } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useBookProvider } from "@/src/contexts/book";
import { BookAvailable } from "@/src/components/book/BookAvailable";
import { BookUnavailable } from "@/src/components/book/BookUnavailable";
import { useBranchProvider } from "@/src/contexts/branch";
import { compareTimes, getCleanDate } from "@/src/handlers/dates";
import NextLink from "next/link";

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

  React.useEffect(() => {
    if (books) return;
    handleGetBooks(daySelected);
  }, []);
  // Component
  if (!branchSelected) {
    return (
      <VStack w="full">
        <Box h="200px" />
        <Spinner />
      </VStack>
    );
  }
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Heading>My Books</Heading>
          <Spacer />
          <NextLink href={`/clients/${branchSelected.id}`} target="_blank">
            <Button variant="callToAction">
              <FaUsers />
              <Box w="5px" />
              <Text>Clients</Text>
            </Button>
          </NextLink>
          <NextLink href={`/branch-stats/${branchSelected.id}`} target="_blank">
            <Button variant="callToAction">
              <MdOutlineQueryStats />
              <Box w="5px" />
              <Text>Stadistics</Text>
            </Button>
          </NextLink>
          <Box w="10px" />
        </HStack>
        <Box h="10px" />
        <HStack>
          <Box w="10px" />
          <Grid w="full" templateColumns={templeteColumns} gap={6}>
            {showAvailable
              ? booksAvailables.map((b) => (
                  <BookAvailable time={b} key={`${b}-key`} />
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
