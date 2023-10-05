import React from "react";
import { Input, Text, Box, HStack, Spacer } from "@chakra-ui/react";

export interface IInputInfo {
  title: string;
  placeholder: string;
  value: string | undefined;
  type: string;
  handler: (_value: string) => void;
}

export const InputInfo = ({
  title,
  placeholder,
  value,
  type,
  handler,
}: IInputInfo) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <HStack w="full">
        <Text fontWeight="bold">{title}</Text>
        <Spacer />
      </HStack>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => handler(e.currentTarget.value)}
        type={type}
        w="full"
      />
      <Box h="10px" />
    </>
  );
};
