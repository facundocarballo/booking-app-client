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
import { useRouter } from 'next/router';

interface IBusinessCard {
  business: Business;
}

export const BusinessCard = ({ business }: IBusinessCard) => {
  // Attributes
  const router = useRouter();
  // Context
  // Methods
  const handleOnClick = () => {
    router.push(`/business/${business.id}`)
  }
  // Component
  return (
    <>
      <Container variant="businessCard" centerContent onClick={handleOnClick}>
        <VStack w={{ lg: "400px" }}>
          <HStack w="full">
            <Box w="10px" />
            <Heading fontSize="xl">{business.name}</Heading>
            <Spacer />
            <Image
              alt={`${business.name}-main-photo`}
              src={business.photo_url}
              w="50%"
              h="100px"
              borderRadius={10}
            />
          </HStack>
          <Spacer />
          <HStack w="full">
            <Box w="5px" />
            <Text align="justify">{business.description}</Text>
            <Box w="5px" />
          </HStack>
          <Box h="10px" />
        </VStack>
      </Container>
    </>
  );
};
