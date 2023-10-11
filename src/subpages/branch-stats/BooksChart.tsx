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
  HStack,
} from "@chakra-ui/react";
import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  BarChart,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

export const BooksChart = () => {
  // Attributes
  const bg = useColorModeValue("#B794F4", "#6B46C1");
  const lineColor = useColorModeValue("#000000", "#ffffff");
  const displayCharts = {
    lg: "flex",
    md: "flex",
    sm: "none",
    base: "none",
  };
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
  const getAmountEarned = (): number => {
    let amount = 0;
    for (const book of books) {
      amount += book.price;
    }
    return amount;
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
            <Heading>
              {books.length} Books | $ {getAmountEarned()}
            </Heading>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              <SelectBarCharRange />
              <Box h="10px" />

              <HStack w="full" display={displayCharts}>
                <BarChart
                  width={900}
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
                <Spacer />
                <ComposedChart
                  width={900}
                  height={400}
                  data={chooseDataToDisplay()}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke={lineColor} />
                </ComposedChart>
              </HStack>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
