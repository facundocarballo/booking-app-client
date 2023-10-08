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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
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

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <HStack w="full">
              <Heading>Your Products</Heading>
              <Spacer />
              <Button variant="callToAction" onClick={onOpen}>
                Create Product
              </Button>
              <AccordionIcon />
            </HStack>
          </AccordionButton>

          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              {products !== undefined && products.length > 0 ? (
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  {products.map((p) => (
                    <GridItem key={p.id}>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
