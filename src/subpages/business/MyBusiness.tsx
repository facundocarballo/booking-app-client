import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Spacer,
  Button,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { CreateBusinessForm } from "@/src/components/business/CreateBusinessForm";
import { useBusinessProvider } from "@/src/contexts/business";
import { BusinessCategory } from "@/src/types/business/category";

export const MyBusiness = () => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  // Context
  const { business } = useBusinessProvider();
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
              Create Business
            </AlertDialogHeader>

            <AlertDialogBody>
              <CreateBusinessForm />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Heading>Your Business</Heading>
          <Spacer />
          <Button variant="callToAction" onClick={onOpen}>Create Business</Button>
          <Box w="10px" />
        </HStack>
        <Box h="10px" />
        { business !== undefined && business.length > 0 ? (
          business.map((b, idx) => <Text key={idx}>{b.name}</Text>)
        ) : (
          <Text variant="empty">
            {"Don't have a business yet? Create one now! It's Free. :)"}
          </Text>
        )}
      </VStack>
    </>
  );
};
