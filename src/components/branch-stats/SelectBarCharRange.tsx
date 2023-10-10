import React from "react";
import { HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { useBranchStatsProvider } from "@/src/contexts/branch-stats";

export const SelectBarCharRange = () => {
  // Attributes
  const borderColor = useColorModeValue("gray.200", "gray.600");
  // Context
  const { range, setRange } = useBranchStatsProvider();
  // Methods
  const isSelected = (idx: number): boolean => {
    return range === idx;
  };
  // Component
  return (
    <>
      <HStack border="2px" borderColor={borderColor} borderRadius={10}>
        <Button
          variant={isSelected(0) ? "switchSelected" : "switchUnselected"}
          onClick={() => setRange(0)}
        >
          Days
        </Button>
        <Button
          variant={isSelected(1) ? "switchSelected" : "switchUnselected"}
          onClick={() => setRange(1)}
        >
          Weeks
        </Button>
        <Button
          variant={isSelected(2) ? "switchSelected" : "switchUnselected"}
          onClick={() => setRange(2)}
        >
          Months
        </Button>
        <Button
          variant={isSelected(3) ? "switchSelected" : "switchUnselected"}
          onClick={() => setRange(3)}
        >
          Years
        </Button>
      </HStack>
    </>
  );
};
