import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Spacer,
  Container,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { Branch } from "@/src/types/Branch";
import { CarrouselImages } from "./CarrouselImages";
import NextLink from "next/link";

interface IBranchCard {
  branch: Branch;
  href: boolean;
}

export const BranchCard = ({ branch, href }: IBranchCard) => {
  // Attributes
  const ig = "https://i.ibb.co/D5gPbrz/instagram.png";
  const wpp = "https://i.ibb.co/w0Fzntb/whatsapp.png";
  // Context
  // Methods
  const showContainerNameDescription = () => {
    if (href) {
      return (
        <NextLink href={`/branch/${branch.id}`} target="_blank">
          <Container>
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
        </NextLink>
      );
    }

    return (
      <Container>
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
    );
  };
  // Component
  return (
    <>
      <Container variant="branchCard" centerContent>
        <VStack w={{ lg: "400px" }}>
          <Box h="5px" />
          <CarrouselImages branch={branch} />
          <Spacer />
          {showContainerNameDescription()}
          <Spacer />
          <HStack w="full">
            <Spacer />
            {branch.whatsapp ? (
              <NextLink
                href={`https://wa.me/${branch.whatsapp}`}
                target="_blank"
              >
                <Image
                  _hover={{
                    transform: "scale(1.15)",
                  }}
                  src={wpp}
                  alt="wpp-photo"
                  w="35px"
                  h="35px"
                />
              </NextLink>
            ) : null}
            {branch.instagram ? (
              <NextLink
                href={`https://instagram.com/${branch.instagram}`}
                target="_blank"
              >
                <Image
                  _hover={{
                    transform: "scale(1.15)",
                  }}
                  src={ig}
                  alt="ig-photo"
                  w="35px"
                  h="35px"
                />
              </NextLink>
            ) : null}
            <Box w="10px" />
          </HStack>
          <Box h="10px" />
        </VStack>
      </Container>
    </>
  );
};
