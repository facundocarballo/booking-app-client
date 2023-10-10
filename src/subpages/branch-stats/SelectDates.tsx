import React from "react";
import {
  VStack,
  HStack,
  Box,
  Spacer,
  Input,
  Text,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBranchStatsProvider } from "@/src/contexts/branch-stats";
import { SearchIcon } from "@chakra-ui/icons";
import { getCleanDate } from "@/src/handlers/dates";

const DAY_TIME = 1000 * 60 * 60 * 24;

export const SelectDates = () => {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dateFrom, setDateFrom] = React.useState<Date>(
    new Date(Date.now() - 30 * DAY_TIME)
  );
  const [dateTo, setDateTo] = React.useState<Date>(new Date(Date.now()));
  // Context
  const { branchSelected } = useBranchProvider();
  const { setBooks } = useBranchStatsProvider();
  // Methods
  const handleSearchData = async () => {
    if (!branchSelected) return;
    setLoading(true);
    const books = await branchSelected.GetBusyBooks(dateFrom, dateTo);
    setBooks(books);
    setLoading(false);
  };

  const handlerSetDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(
      new Date(e.currentTarget.value).getTime() + DAY_TIME
    );
    setDateFrom(getCleanDate(newDate, false));
  };

  const handlerSetDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(
      new Date(e.currentTarget.value).getTime() + DAY_TIME
    );
    setDateTo(getCleanDate(newDate, true));
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
          <Button variant="callToAction" onClick={handleSearchData}>
            <SearchIcon />
          </Button>
          {loading ? <Spinner /> : null}
          <Box w="10px" />
        </HStack>
      </VStack>
    </>
  );
};
