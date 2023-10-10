import { Client } from "@/src/types/Client";
import { VStack, Text, Divider, Box, Container } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface IClientCard {
  client: Client;
  value: number;
}
export const ClientCard = ({ client, value }: IClientCard) => {
  // Attributes
  // Context
  // Methods
  const textOnCircle = (): string => {
    if (client.name.length > 2)
      return `${client.name.charAt(0)}${client.name.charAt(1)}`;
    return client.name;
  };
  // Component
  return (
    <>
      <NextLink href={`/client/${client.id}`} target="_blank">
        <Container variant="clientCard">
          <VStack w="full">
            <Box h="2px" />
            <Text variant="caption">{client.name}</Text>
            <Text variant="caption">{value} Books</Text>
            <Divider />
            <Text variant="info">{client.description}</Text>
            <Box h="2px" />
          </VStack>
        </Container>
      </NextLink>
    </>
  );
};
