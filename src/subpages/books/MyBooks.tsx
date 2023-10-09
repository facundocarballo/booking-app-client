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

export const MyBooks = () => {
  // Attributes
  // Context
  const { booksAvailables } = useBookProvider();
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
          {booksAvailables.length > 0
            ? booksAvailables.map((b, idx) => (
                <BookAvailable time={b} key={idx} />
              ))
            : null}
        </Grid>
        {booksAvailables.length === 0 ? (
          <Text variant="empty">{"Don't have a book appointment yet."}</Text>
        ) : null}
      </VStack>
    </>
  );
};
