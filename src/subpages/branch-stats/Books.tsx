import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Box,
  Spacer,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { getCleanDate } from "@/src/handlers/dates";
import { useBranchProvider } from "@/src/contexts/branch";

const DAY_TIME = 1000 * 60 * 60 * 24;

export const Books = () => {
  // Attributes
  const [dateFrom, setDateFrom] = React.useState<Date>(
    new Date(Date.now() - 30 * DAY_TIME)
  );
  const [dateTo, setDateTo] = React.useState<Date>(new Date(Date.now()));
  // Context
  const { branchSelected } = useBranchProvider();
  // Methods
  const handlerSetDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(
      new Date(e.currentTarget.value).getTime() + DAY_TIME
    );
    setDateFrom(getCleanDate(newDate));
  };

  const handlerSetDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(
      new Date(e.currentTarget.value).getTime() + DAY_TIME
    );
    setDateTo(getCleanDate(newDate));
  };

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
          <Text variant='caption'>{branchSelected.name}</Text>
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
