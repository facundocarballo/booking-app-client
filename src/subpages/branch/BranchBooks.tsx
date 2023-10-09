import React from "react";
import { VStack, HStack, Spacer, Box, Text } from "@chakra-ui/react";
import { SwitchAvailableBusy } from "@/src/components/branch/SwitchAvailableBusy";
import { SelectDay } from "@/src/components/branch/SelectDay";
import { MyBooks } from "../books/MyBooks";
import { useBookProvider } from "@/src/contexts/book";

export const BranchBooks = () => {
  // Attributes
  // Context
  const { books } = useBookProvider();
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <SwitchAvailableBusy />
          <Spacer />
          <Text variant="caption">
            {books === undefined ? 0 : books.length} Books
          </Text>
          <Spacer />
          <SelectDay />
          <Box w="10px" />
        </HStack>
        <Box h="10px" />
        <MyBooks />
      </VStack>
    </>
  );
};
