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
          {viewPassword ?  <ViewIcon /> : <ViewOffIcon />}
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
      {areDiferrentsPasswords() ? (
        <Text variant="alert">{"The passwords doesn't match"}</Text>
      ) : null}
    </>
  );
};
