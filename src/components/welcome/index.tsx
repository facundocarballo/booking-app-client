import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Button,
  Input,
  Box,
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
                {"You are not logged in Booking App. Please Login or create your account."}
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button>Log In</Button>
            <Button>Sign Up</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
