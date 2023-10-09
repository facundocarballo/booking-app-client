import { Book } from "@/src/types/book";
import { VStack, Box, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { BookInfo } from "./BookInfo";
import { formatDateToCustomString } from "@/src/handlers/dates";

interface IBookShowInfo {
  book: Book;
}
export const BookShowInfo = ({ book }: IBookShowInfo) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <BookInfo
          title="Created At"
          value={formatDateToCustomString(book.created_at)}
        />
        <BookInfo title="Price" value={book.price.toString()} />
        <BookInfo title="Description" value={book.description} />
        <Box h="10px" />
        <NextLink target="_blank" href={`/client/${book.client.id}`}>
          <Text variant="link">See more info about this client.</Text>
        </NextLink>
      </VStack>
    </>
  );
};
