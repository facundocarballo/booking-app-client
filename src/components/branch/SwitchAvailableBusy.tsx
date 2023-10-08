import React from "react";
import {
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useBookProvider } from "@/src/contexts/book";

export const SwitchAvailableBusy = () => {
  // Attributes
  const borderColor = useColorModeValue("gray.200", "gray.600");
  // Context
  const { showAvailable, setShowAvailable } = useBookProvider()
  // Methods
  // Component
  return (
    <>
      <HStack border="2px" borderColor={borderColor} borderRadius={10}>
        <Button
          variant={showAvailable ? "switchSelected" : "switchUnselected"}
          onClick={() => setShowAvailable(true)}
        >
          Available
        </Button>
        <Button
          variant={!showAvailable ? "switchSelected" : "switchUnselected"}
          onClick={() => setShowAvailable(false)}
        >
          Busy
        </Button>
      </HStack>
    </>
  );
};
