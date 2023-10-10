import { useBranchStatsProvider } from "@/src/contexts/branch-stats";
import { VStack, Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const BooksChart = () => {
  // Attributes
  // Context
  const { booksPerDay, books } = useBranchStatsProvider();
  // Methods
  const areDataToDisplay = (): boolean => {
    if (booksPerDay.length === 0) return false;
    console.log(booksPerDay);
    return true;
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
      <VStack w="full">
        <h2>{books.length} Books</h2>
        <BarChart
          width={1000}
          height={400}
          data={booksPerDay}
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
          <Bar dataKey="value" fill="#B794F4" />
        </BarChart>
      </VStack>
    </>
  );
};
