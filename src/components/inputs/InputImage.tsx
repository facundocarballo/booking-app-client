import React from "react";
import { HStack, Input } from "@chakra-ui/react";
import { UserImage } from "../navbar/UserImage";

export interface IInputImage {
  handler: (_e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputImage = ({ handler }: IInputImage) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <HStack>
      <UserImage />
      <Input
        type="file"
        id="imagen"
        name="imagen"
        accept="image/*"
        onChange={handler}
      />
    </HStack>
  );
};
