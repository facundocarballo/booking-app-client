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
        <Grid w="full" templateColumns="repeat(6, 1fr)" gap={6}>
          {showAvailable
            ? booksAvailables.map((b, idx) => (
                <BookAvailable time={b} key={idx} />
              ))
            : books !== undefined
            ? books.map((b) => <BookUnavailable key={b.id} book={b} />)
            : null}
        </Grid>
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
