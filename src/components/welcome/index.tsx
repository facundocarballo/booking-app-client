import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Button,
  Input,
  Spacer,
  Box,
  HStack,
} from "@chakra-ui/react";

export const Welcome = () => {
  // Attributes
  const [open, setOpen] = React.useState<boolean>(true);
  const cancelRef = React.useRef(null);
  // Context
  // Methods
  const onClose = () => setOpen(false);
  // Component
  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Welcome to Booking App
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              {
                "You are not logged in Booking App. Please Login or create your account."
              }
            </Text>
            <HStack w="full">
              <Spacer />
              <Button variant='callToAction'>Log In</Button>
              <Button variant='callToAction'>Sign Up</Button>
            </HStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
