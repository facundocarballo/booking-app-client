import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Input,
  Box
} from "@chakra-ui/react";
import { useHomeProvider } from "@/src/contexts/home";
import { InputInfo } from "../../inputs/InputInfo";
import { InputPassword } from "../../inputs/InputPassword";

export const SignIn = () => {
  // Attributes
  const [open, setOpen] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const cancelRef = React.useRef(null);
  // Context
  const { jsonLanguague } = useHomeProvider();
  // Methods
  const onClose = () => setOpen(false);
  const handleCreateUser = async () => {
    console.log(email, password, confirmPassword);
  };
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
            {jsonLanguague.create_user_title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <InputInfo 
              handler={setEmail}
              placeholder="youremail@bookingapp.com"
              title="Email"
              type="email"
              value={email}
            />
            <InputPassword
            handlerA={setPassword}
            valueA={password}
            valueB={confirmPassword}
            handlerB={setConfirmPassword}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {jsonLanguague.create_user_title}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
