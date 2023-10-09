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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { CreateBookForm } from "./CreateBookForm";

interface IBookAvailable {
  time: string;
}
export const BookAvailable = ({ time }: IBookAvailable) => {
  // Attributes
  const bg = useColorModeValue("gray.300", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  // Context
  // Methods
  // Component
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {time} - APPOINT BOOK
            </AlertDialogHeader>

            <AlertDialogBody>
              <CreateBookForm time={time} onClose={onClose} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="200px" bg={bg} borderRadius={10}>
        <Text variant="caption">{time}</Text>
        <Button variant="callToAction" w="full" onClick={onOpen}>
          APPOINT
        </Button>
      </VStack>
    </>
  );
};
