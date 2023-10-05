import React from "react";
import { HStack, Input } from "@chakra-ui/react";
import { UserImage } from "../navbar/UserImage";

export interface IInputImage {
  handler: (_e: React.ChangeEvent<HTMLInputElement>) => void,
  photoUrl?: string,
  name: string
}

export const InputImage = ({ handler, photoUrl, name }: IInputImage) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <HStack>
      <UserImage photoUrl={photoUrl} name={name} />
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
