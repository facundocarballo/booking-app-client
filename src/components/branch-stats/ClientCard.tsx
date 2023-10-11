import { VStack, Text, Divider, Box, Container } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { DataClient } from "@/src/types/Client/data";

interface IClientCard {
  data: DataClient;
}
export const ClientCard = ({ data }: IClientCard) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <NextLink href={`/client/${data.client.id}`} target="_blank">
        <Container variant="clientCard">
          <VStack w="full">
            <Box h="2px" />
            <Text variant="caption">{data.client.name}</Text>
            <Text variant="caption">
              {data.value} Books | ${data.amount}
            </Text>
            <Divider />
            <Text variant="info">{data.client.description}</Text>
            <Box h="2px" />
          </VStack>
        </Container>
      </NextLink>
    </>
  );
};
