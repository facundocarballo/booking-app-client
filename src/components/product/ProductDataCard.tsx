import { VStack, Text, Divider, Box, Container } from "@chakra-ui/react";
import React from "react";
import { DataProduct } from "@/src/types/Product/data";

interface IClientCard {
  data: DataProduct;
}
export const ProductDataCard = ({ data }: IClientCard) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <>
      <Container variant="clientCard">
        <VStack w="full">
          <Box h="2px" />
          <Text variant="caption">{data.product.name}</Text>
          <Text variant="caption">
            {data.value} Books | ${data.amount}
          </Text>
          <Divider />
          <Text variant="info">{data.product.description}</Text>
          <Box h="2px" />
        </VStack>
      </Container>
    </>
  );
};
