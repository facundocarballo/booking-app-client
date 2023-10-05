import React from "react";
import { Circle, Center, Text, Image } from "@chakra-ui/react";
import { useHomeProvider } from "@/src/contexts/home";

interface IUserImage {
  photoUrl?: string;
  name: string;
}

export const UserImage = ({ name, photoUrl }: IUserImage) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      {photoUrl === undefined ? (
        <Circle size="40px" bg="purple">
          <Center>
            <Text fontSize="20px" color="white">{`${name
              ?.charAt(0)
              .toUpperCase()}${name.charAt(1).toUpperCase()}`}</Text>
          </Center>
        </Circle>
      ) : (
        <Image
          w="50px"
          h="50px"
          borderRadius={100}
          alt="user-img"
          src={photoUrl}
        />
      )}
    </>
  );
};
