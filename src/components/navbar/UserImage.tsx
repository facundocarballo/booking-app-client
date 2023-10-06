import React from "react";
import { Circle, Center, Text, Image } from "@chakra-ui/react";
import { useHomeProvider } from "@/src/contexts/home";

export const UserImage = () => {
  // Attributes
  // Context
  const { user } = useHomeProvider();
  // Methods
  const showCircle = (): boolean => {
    if (user === undefined) return true;
    if (user.photo_url === undefined || user.photo_url === null) return true;
    return false;
  };

  const textOnCircle = (): string => {
    let res = "NA";
    if (user === undefined) return res;
    if (user.email === undefined) return res;
    if (user.first_name === null) {
      return `${user.email?.charAt(0).toUpperCase()}${user.email
        ?.charAt(1)
        .toUpperCase()}`;
    }
    return`${user.first_name?.charAt(0).toUpperCase()}${user.first_name
      ?.charAt(1)
      .toUpperCase()}`;
  };
  // Component

  return user === undefined ? null : (
    <>
      {showCircle() ? (
        <Circle size="40px" bg="purple">
          <Center>
            <Text fontSize="20px" color="white">{textOnCircle()}</Text>
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
