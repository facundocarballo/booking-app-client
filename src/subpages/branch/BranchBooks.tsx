import React from "react";
import { VStack, HStack, Spacer, Box } from "@chakra-ui/react";
import { SwitchAvailableBusy } from "@/src/components/branch/SwitchAvailableBusy";
import { SelectDay } from "@/src/components/branch/SelectDay";
import { MyBooks } from "../books/MyBooks";

export const BranchBooks = () => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <SwitchAvailableBusy />
          <Spacer />
          <SelectDay />
          <Box w="10px" />
        </HStack>
        <Box h='10px' />
        <MyBooks />
      </VStack>
    </>
  );
};
