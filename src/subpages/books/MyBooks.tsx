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
  const { booksAvailables, showAvailable, books } = useBookProvider();
  // Methods
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
