import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Spacer,
  Container,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Product } from "@/src/types/product";
import { EditProductForm } from "./EditProductForm";

interface IBusinessCard {
  product: Product;
}

export const ProductCard = ({ product }: IBusinessCard) => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context
  // Methods
  // Component
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Product | {product.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              <EditProductForm onClose={onClose} product={product} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Container variant="productCard" centerContent onClick={onOpen}>
        <VStack w="full">
          <Box h="10px" />
          <Heading fontSize="lg">{product.name}</Heading>
          <VStack h="60px">
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
