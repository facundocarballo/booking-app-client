import React from "react";
import { HStack, Box, Heading, Spacer, Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUser } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";
import { SettingsIcon } from "@chakra-ui/icons";
import { Branch } from "@/src/types/Branch";

interface IBranchHeadline {
  branch: Branch;
}

export const BranchHeadline = ({ branch }: IBranchHeadline) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <HStack w="full">
        <Box w="10px" />
        <Heading>{branch.name}</Heading>
        <Spacer />
        <NextLink href={`/clients/${branch.id}`} target="_blank">
          <Button variant="callToAction">
            <FaUser />
            <Box w="5px" />
            <Text>Clients</Text>
          </Button>
        </NextLink>
        <NextLink href={`/branch-stats/${branch.id}`} target="_blank">
          <Button variant="callToAction">
            <MdOutlineQueryStats />
            <Box w="5px" />
            <Text>Stadistics</Text>
          </Button>
        </NextLink>
        <NextLink href={`/branch-config/${branch.id}`} target="_blank">
          <Button variant="callToAction">
            <SettingsIcon />
            <Box w="5px" />
            <Text>Configuration</Text>
          </Button>
        </NextLink>
        <Box w="35px" />
      </HStack>
    </>
  );
};
