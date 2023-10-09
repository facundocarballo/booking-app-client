import {
  Button,
  VStack,
  Text,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Box,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Book } from "@/src/types/book";
import { getTimeString } from "@/src/handlers/dates";
import { BookShowInfo } from "./BookShowInfo";
import { InfoIcon } from "@chakra-ui/icons";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBookProvider } from "@/src/contexts/book";

interface IBookUnvailable {
  book: Book;
}
export const BookUnavailable = ({ book }: IBookUnvailable) => {
  // Attributes
  const [openShowInfo, setOpenShowInfo] = React.useState<boolean>(false);
  const [openCancelBook, setOpenCancelBook] = React.useState<boolean>(false);
  const bg = useColorModeValue("gray.300", "gray.700");
  const cancelRef = React.useRef(null);
  // Context
  const { branchSelected } = useBranchProvider();
  const { handleRemoveBook, books, handleSetBooksAvailables } =
    useBookProvider();
  // Methods
  const onCloseShowInfo = () => setOpenShowInfo(false);
  const onOpenShowInfo = () => setOpenShowInfo(true);
  const onCloseCancelBook = () => setOpenCancelBook(false);
  const onOpenCancelBook = () => setOpenCancelBook(true);

  const handleCancelBook = async () => {
    if (!branchSelected || !books) return;
    await branchSelected.DeleteBook(book);
    handleSetBooksAvailables(getTimeString(book.date));
    handleRemoveBook(book);
  };
  // Component
  return (
    <>
      {/* Book info */}
      <AlertDialog
        isOpen={openShowInfo}
        leastDestructiveRef={cancelRef}
        onClose={onCloseShowInfo}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {book.client.name} - {getTimeString(book.date)}
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <BookShowInfo book={book} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Cancel Book */}
      <AlertDialog
        isOpen={openCancelBook}
        leastDestructiveRef={cancelRef}
        onClose={onCloseCancelBook}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {book.client.name} - {getTimeString(book.date)}
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Are you sure to cancel this book?</Text>
              <HStack w="full">
                <Spacer />
                <Button variant="callToAction" onClick={handleCancelBook}>
                  CANCEL
                </Button>
              </HStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="200px" h="130px" bg={bg} borderRadius={10}>
        <HStack w="full">
          <Box w="10px" />
          <Text variant="caption">{getTimeString(book.date)}</Text>
          <Spacer />
          <Button variant="info" onClick={onOpenShowInfo}>
            <InfoIcon />
          </Button>
        </HStack>

        <Text
          variant="caption"
          fontSize={book.client.name.length > 20 ? "12px" : "20px"}
        >
          {book.client.name}
        </Text>
        <Button variant="callToAction" w="full" onClick={onOpenCancelBook}>
          CANCEL
        </Button>
      </VStack>
    </>
  );
};
