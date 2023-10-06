import React from "react";
import { Circle, Center, Text, Image } from "@chakra-ui/react";
import { Business } from "@/src/types/business";

interface IBusinessImage {
  business: Business;
}
export const BusinessImage = ({ business }: IBusinessImage) => {
  // Attributes
  // Context
  // Methods
  // Component

  return business === undefined ? null : (
    <>
      {business.photo_url === undefined ? (
        <Circle size="40px" bg="purple">
          <Center>
            <Text fontSize="20px" color="white">{`${business.name
              ?.charAt(0)
              .toUpperCase()}${business.name?.charAt(1).toUpperCase()}`}</Text>
          </Center>
        </Circle>
      ) : (
        <Image
          w="50px"
          h="50px"
          borderRadius={100}
          alt="user-img"
          src={business.photo_url}
        />
      )}
    </>
  );
};
