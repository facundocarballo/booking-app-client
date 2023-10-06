import React from "react";
import { HStack, Input } from "@chakra-ui/react";
import { UserImage } from "../navbar/UserImage";
import { BusinessImage } from "../business/BusinessImage";
import { Business } from "@/src/types/business";

export interface IInputImage {
  handler: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  photoUrl?: string;
  name: string;
  types?: {
    business?: Business;
  };
}

export const InputImage = ({ handler, photoUrl, name, types }: IInputImage) => {
  // Attributes
  // Context
  // Methods
  const handleTypes = (): React.JSX.Element => {
    if (types === undefined) return <UserImage />
    if (types.business !== undefined)
      return <BusinessImage business={types.business} />;
    
    return <UserImage />;
  };
  // Component
  return (
    <HStack>
      {handleTypes()}
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
