import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Spacer,
  Button,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useBusinessProvider } from "@/src/contexts/business";
import { useBranchProvider } from "@/src/contexts/branch";
import { BranchCard } from "@/src/components/branch/BranchCard";
import { CreateProductForm } from "@/src/components/product/CreateProductForm";
import { useProductProvider } from "@/src/contexts/product";
import { ProductCard } from "@/src/components/product/ProductCard";

export const BranchProducts = () => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context
  const { branchSelected } = useBranchProvider();
  const { products, setProducts } = useProductProvider();
  // Methods
  const handleGetBranches = async () => {
    if (branchSelected === undefined) return;
    const res = await branchSelected.GetProducts();
    setProducts(res);
  };

  React.useEffect(() => {
    handleGetBranches();
  }, []);
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
              Create Product
            </AlertDialogHeader>

            <AlertDialogBody>
              <CreateProductForm onClose={onClose} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Heading>Your Products</Heading>
          <Spacer />
          <Button variant="callToAction" onClick={onOpen}>
            Create Product
          </Button>
          <Box w="10px" />
        </HStack>
        <Box h="10px" />
        {products !== undefined && products.length > 0 ? (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {products.map((p, idx) => (
              <GridItem key={idx}>
                <ProductCard product={p} />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text variant="empty">
            {"Don't have a branch yet? Create one now! It's Free. :)"}
          </Text>
        )}
      </VStack>
    </>
  );
};
