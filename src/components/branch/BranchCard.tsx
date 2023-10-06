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
import { Branch } from "@/src/types/branch";
import { CarrouselImages } from "./CarrouselImages";

interface IBranchCard {
  branch: Branch;
}

export const BranchCard = ({ branch }: IBranchCard) => {
  // Attributes
  const router = useRouter();
  // Context
  // Methods
  const handleOnClick = () => {
    router.push(`/branch/${branch.id}`);
  };
  // Component
  return (
    <>
      <Container variant="branchCard" centerContent >
        <VStack w={{ lg: "400px" }}>
          <Box h="5px" />
          <CarrouselImages />
          <Spacer />
          <Container onClick={handleOnClick}>
            <HStack w="full">
              <Heading fontSize="lg">{branch.name}</Heading>
            </HStack>
            <HStack w="full">
              <Text align="justify" variant="description" fontSize="15px">
                {branch.description}
              </Text>
              <Box w="5px" />
            </HStack>
          </Container>
          <Box h="10px" />
        </VStack>
      </Container>
    </>
  );
};
