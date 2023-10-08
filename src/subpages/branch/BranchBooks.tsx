import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import { SwitchAvailableBusy } from "@/src/components/branch/SwitchAvailableBusy";

export const BranchBooks = () => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <HStack w='full'>
            <Box w='10px' />
            <SwitchAvailableBusy />
            <Spacer />
        </HStack>
      </VStack>
    </>
  );
};
