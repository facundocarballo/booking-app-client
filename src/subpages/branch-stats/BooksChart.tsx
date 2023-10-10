import { SelectBarCharRange } from "@/src/components/branch-stats/SelectBarCharRange";
import { useBranchStatsProvider } from "@/src/contexts/branch-stats";
import { DataChart } from "@/src/types/dataChart";
import {
  VStack,
  Box,
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const BooksChart = () => {
  // Attributes
  const bg = useColorModeValue("#B794F4", "#6B46C1");
  // Context
  const {
    booksPerDay,
    booksPerWeek,
    booksPerMonth,
    booksPerYear,
    books,
    range,
  } = useBranchStatsProvider();
  // Methods
  const areDataToDisplay = (): boolean => {
    if (booksPerDay.length === 0) return false;
    return true;
  };
  const chooseDataToDisplay = (): DataChart[] => {
    switch (range) {
      case 0:
        return booksPerDay;
      case 1:
        return booksPerWeek;
      case 2:
        return booksPerMonth;
      case 3:
        return booksPerYear;
      default:
        return [];
    }
  };
  // Component
  if (!areDataToDisplay())
    return (
      <>
        <VStack w="full">
          <Box h="100px" />
          <Text>No data to display...</Text>
        </VStack>
      </>
    );
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Heading>{books.length} Books</Heading>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              <BarChart
                width={1000}
                height={400}
                data={chooseDataToDisplay()}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={bg} />
              </BarChart>
              <Box h="10px" />
              <SelectBarCharRange />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
