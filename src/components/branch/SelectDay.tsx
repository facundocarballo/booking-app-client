import React from "react";
import { Input } from "@chakra-ui/react";
import { useBookProvider } from "@/src/contexts/book";

const DAY_TIME = 1000 * 60 * 60 * 24;

export const SelectDay = () => {
  // Attributes
  // Context
  const { setDaySelected } = useBookProvider();
  // Methods
  // Component
  return (
    <>
      <Input
        type="date"
        w="200px"
        onChange={(e) =>
          setDaySelected(
            new Date(new Date(e.currentTarget.value).getTime() + DAY_TIME)
          )
        }
      />
    </>
  );
};
