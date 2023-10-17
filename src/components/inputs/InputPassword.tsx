import React from "react";
import { Input, Text, Box, HStack, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export interface IInputPassword {
  valueA: string | undefined;
  handlerA: (_value: string) => void;
  valueB: string | undefined;
  handlerB: (_value: string) => void;
}

export const InputPassword = ({
  valueA,
  handlerA,
  valueB,
  handlerB,
}: IInputPassword) => {
  // Attributes
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  // Context
  // Methods
  const areDiferrentsPasswords = () => {
    if (valueA === valueB) return false;
    if (valueB === undefined) return false;
    if (valueB.length === 0) return false;
    return true;
  };
  const isPasswordLengthOk = (): boolean => {
    if (!valueA) return true;
    if (valueA.length === 0) return true;
    if (valueA.length < 6) return false;
    return true;
  };
  const showMessage = (): boolean => {
    return areDiferrentsPasswords() || !isPasswordLengthOk();
  };
  const getMessageToShow = (): string => {
    if (areDiferrentsPasswords()) return "The passwords doesn't match.";
    if (!isPasswordLengthOk())
      return "Password should be at least 6 characters.";
    return "";
  };
  // Component
  return (
    <>
      <Text fontWeight="bold">Password</Text>
      <HStack w="full">
        <Input
          placeholder="Write your password"
          value={valueA}
          onChange={(e) => handlerA(e.currentTarget.value)}
          type={viewPassword ? "text" : "password"}
          w="full"
        />
        <Button w="50px" onClick={() => setViewPassword(!viewPassword)}>
          {viewPassword ? <ViewIcon /> : <ViewOffIcon />}
        </Button>
      </HStack>
      <Box h="10px" />
      <HStack w="full">
        <Input
          placeholder="Repeat your password"
          value={valueB}
          onChange={(e) => handlerB(e.currentTarget.value)}
          type={viewPassword ? "text" : "password"}
          w="full"
        />
        <Box w="55px" />
      </HStack>
      <Box h="10px" />
      {showMessage() ? <Text variant="alert">{getMessageToShow()}</Text> : null}
    </>
  );
};
