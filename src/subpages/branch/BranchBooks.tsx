import React from "react";
import { VStack, HStack, Spacer, Box } from "@chakra-ui/react";
import { SwitchAvailableBusy } from "@/src/components/branch/SwitchAvailableBusy";
import { useBookProvider } from "@/src/contexts/book";
import { SelectDay } from "@/src/components/branch/SelectDay";
import { MyBooks } from "../books/MyBooks";

export const BranchBooks = () => {
  // Attributes
  // Context
  const { setBooks, showAvailable, daySelected } = useBookProvider();
  // Methods
  const handleGetBooks = async () => {};

  React.useEffect(() => {
    handleGetBooks();
  }, [showAvailable, daySelected]);
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
