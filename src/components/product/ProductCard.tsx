import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Spacer,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { Product } from "@/src/types/product";

interface IBusinessCard {
  product: Product;
}

export const ProductCard = ({ product }: IBusinessCard) => {
  // Attributes
  const router = useRouter();
  // Context
  // Methods
  const handleOnClick = () => {
    router.push(`/product/${product.id}`);
  };
  // Component
  return (
    <>
      <Container variant="productCard" centerContent onClick={handleOnClick}>
        <VStack w='full'>
          <Box h="10px" />
          <Heading fontSize="lg">{product.name}</Heading>
          <VStack h='60px'>
            <Text align="justify" variant="description" fontSize="15px">
              {product.description}
            </Text>
          </VStack>
          <Spacer />
          <HStack w="full">
            <Text
              align="justify"
              variant="description"
              fontSize="30px"
              fontWeight="bold"
            >
              $ {product.price}
            </Text>
            <Box w="5px" />
          </HStack>
          <Box h="10px" />
        </VStack>
      </Container>
    </>
  );
};
