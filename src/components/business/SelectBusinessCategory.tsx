import React from "react";
import { Input, Text, Box, HStack, Spacer, Select } from "@chakra-ui/react";
import { BusinessCategory } from "@/src/types/business/category";

export interface ISelectBusinessCategory {
  title: string;
  options: BusinessCategory[];
  handler: (_value: string) => void;
}

export const SelectBusinessCategory = ({
  title,
  options,
  handler,
}: ISelectBusinessCategory) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <HStack w="full">
        <Text fontWeight="bold">{title}</Text>
        <Spacer />
      </HStack>
      <Select
        defaultValue={options[0].id}
        onChange={(e) => handler(e.currentTarget.value)}
      >
        {options.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.description}
          </option>
        ))}
      </Select>
      <Box h="10px" />
    </>
  );
};
