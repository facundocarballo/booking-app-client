import { Book } from "@/src/types/book";
import { VStack, Box, Text, Divider, Spinner } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { BookInfo } from "./BookInfo";
import {
  formatDateToCustomString,
  getDateString,
  getDaysBetweenTwoDates,
} from "@/src/handlers/dates";
import { Client } from "@/src/types/Client";

interface IBookShowInfo {
  book: Book;
}
export const BookShowInfo = ({ book }: IBookShowInfo) => {
  // Attributes
  const [client, setClient] = React.useState<Client | undefined>(undefined);
  const [lastBook, setLastBook] = React.useState<Book | undefined>(undefined);
  // Context
  // Methods
  const handleGetClientInfo = async () => {
    const newClient = await Client.GetClientBookInfo(
      book.client,
      book.branch_id,
      book.date
    );
    if (!newClient) return;
    setClient(newClient);
    if (!newClient.books) return;
    setLastBook(newClient.books[newClient.books.length - 1]);
  };

  const handleGetAverageOfBooks = (): number => {
    if (!client) return 0;
    if (!client.books) return 0;
    const firstDate = new Date(client.books[0].date);
    const diffDays = getDaysBetweenTwoDates(firstDate, new Date(Date.now()));
    return Math.trunc(diffDays / client.books.length);
  };

  React.useEffect(() => {
    handleGetClientInfo();
  }, []);
  // Component
  return (
    <>
      <VStack w="full">
        <BookInfo
          title="Book Created At"
          value={formatDateToCustomString(book.created_at)}
        />
        <BookInfo title="Price" value={book.price.toString()} />
        <BookInfo title="Book Description" value={book.description} />
        <Box h="10px" />
        <BookInfo
          title={`Client Description`}
          value={book.client.description}
        />
        {!client || !lastBook ? (
          <>
            <Box h="20px" />
            <Spinner />
          </>
        ) : (
          <>
            <BookInfo
              title={`Previous Book`}
              value={getDateString(lastBook.date)}
            />
            <BookInfo
              title="Previous Book Description"
              value={lastBook.description}
            />
            <BookInfo
              title="Client Books Avarage"
              value={`Take a book every ${handleGetAverageOfBooks()} days`}
            />
          </>
        )}
        <Box h="10px" />
        <NextLink target="_blank" href={`/client/${book.client.id}`}>
          <Text variant="link">See more info about this client.</Text>
        </NextLink>
      </VStack>
    </>
  );
};
