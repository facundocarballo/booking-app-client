import React from "react";
import {
  VStack,
  HStack,
  Box,
  Spacer,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBranchStatsProvider } from "@/src/contexts/branch-stats";

export const SelectDates = () => {
  // Attributes

  // Context
  const { branchSelected } = useBranchProvider();
  const { books, dateFrom, handlerSetDateFrom, dateTo, handlerSetDateTo } =
    useBranchStatsProvider();
  // Methods

  // Component
  if (!branchSelected)
    return (
      <VStack w="full">
        <Box h="200px" />
        <Spinner />
      </VStack>
    );
  return (
    <>
      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Text variant="caption">{branchSelected.name}</Text>
          <Spacer />
          <Input
            type="date"
            onChange={handlerSetDateFrom}
            w="200px"
            size="md"
          />
          <Text>to</Text>
          <Input type="date" onChange={handlerSetDateTo} w="200px" size="md" />
          <Box w="10px" />
        </HStack>
      </VStack>
    </>
  );
};
