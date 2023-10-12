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
import { DAY_TIME, getCleanDate } from "@/src/handlers/dates";
import { DataChart } from "@/src/types/dataChart";
import { Book } from "@/src/types/book";
import { DataClient } from "@/src/types/Client/data";
import { DataProduct } from "@/src/types/Product/data";

export const SelectDates = () => {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dateFrom, setDateFrom] = React.useState<Date>(
    new Date(Date.now() - 30 * DAY_TIME)
  );
  const [dateTo, setDateTo] = React.useState<Date>(new Date(Date.now()));
  // Context
  const { branchSelected } = useBranchProvider();
  const {
    setBooks,
    setBooksPerDay,
    setBooksPerWeek,
    setBooksPerMonth,
    setBooksPerYear,
    setClients,
    setProducts,
  } = useBranchStatsProvider();
  // Methods
  const setAllBooks = (booksSorted: Book[]) => {
    const booksPerDay = DataChart.CreateDataChartPerDay(booksSorted);
    const booksPerWeek = DataChart.CreateDataChartPerWeek(booksSorted);
    const booksPerMonth = DataChart.CreateDataChartPerMonth(booksSorted);
    const booksPerYear = DataChart.CreateDataChartPerYear(booksSorted);
    setBooks(booksSorted);
    setBooksPerDay(booksPerDay);
    setBooksPerWeek(booksPerWeek);
    setBooksPerMonth(booksPerMonth);
    setBooksPerYear(booksPerYear);
  };

  const handleSearchData = async () => {
    if (!branchSelected) return;
    setLoading(true);
    const books = await branchSelected.GetBusyBooks(dateFrom, dateTo);
    const booksSorted = books.toSorted(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const clients = DataClient.CreateDataChartClients(booksSorted);
    const products: DataProduct[] = [];
    setClients(clients);
    setProducts(products);
    setAllBooks(booksSorted);
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
