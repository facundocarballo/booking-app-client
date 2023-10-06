import { Business } from "@/src/types/business";
import {
  VStack,
  Image,
  Box,
  Heading,
  Text,
  HStack,
  Spacer,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

interface IBusinessCard {
  business: Business;
}

export const BusinessCard = ({ business }: IBusinessCard) => {
  // Attributes
  const router = useRouter();
  // Context
  // Methods
  const handleOnClick = () => {
    router.push(`/business/${business.id}`);
  };
  // Component
  return (
    <>
      <Container variant="businessCard" centerContent onClick={handleOnClick}>
        <VStack w={{ lg: "400px" }}>
          <Image
            alt={`${business.name}-main-photo`}
            src={business.photo_url}
            w="full"
            h="120px"
            borderRadius={10}
          />
          <Spacer />
          <HStack w="full">
            <Heading fontSize="lg">{business.name}</Heading>
          </HStack>
          <HStack w="full">
            <Text align="justify" variant="description" fontSize='15px'>
              {business.description}
            </Text>
            <Box w="5px" />
          </HStack>
          <Box h="10px" />
        </VStack>
      </Container>
    </>
  );
};
