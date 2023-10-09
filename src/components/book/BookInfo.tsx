import React from "react";
import { VStack, HStack, Text, Spacer, Divider } from "@chakra-ui/react";
interface IBookInfo {
  title: string;
  value?: string;
}
export const BookInfo = ({ title, value }: IBookInfo) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Text variant="caption">{title}</Text>
          <Spacer />
        </HStack>
        <Text>{value}</Text>
        <Divider />
      </VStack>
    </>
  );
};
