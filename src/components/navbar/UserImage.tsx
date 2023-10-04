import React from "react";
import { Circle, Center, Text, Image } from "@chakra-ui/react";
import { useHomeProvider } from "@/src/contexts/home";

export const UserImage = () => {
  // Attributes
  // Context
  const { user } = useHomeProvider();
  // Methods
  // Component
  if (user === undefined) return null;
  return (
    <>
      {user.photo_url === undefined ? (
        <Circle size="40px" bg="purple">
          <Center>
            <Text fontSize="20px" color="white">{`${user.email
              ?.charAt(0)
              .toUpperCase()}${user.email?.charAt(1).toUpperCase()}`}</Text>
          </Center>
        </Circle>
      ) : (
        <Image
          w="50px"
          h="50px"
          borderRadius={100}
          alt="user-img"
          src={user.photo_url}
        />
      )}
    </>
  );
};
