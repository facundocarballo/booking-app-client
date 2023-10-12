import { ProductDataCard } from "@/src/components/product/ProductDataCard";
import { useBranchStatsProvider } from "@/src/contexts/branch-stats";
import {
  VStack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Spacer,
  Grid,
} from "@chakra-ui/react";
import React from "react";

export const ProductChart = () => {
  // Attributes
  // Context
  const { products } = useBranchStatsProvider();
  // Methods
  const areDataToDisplay = (): boolean => {
    if (products.length === 0) return false;
    return true;
  };

  // Component
  if (!areDataToDisplay()) return null;
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Heading>{products.length} Products</Heading>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                {products.map((p) => (
                  <ProductDataCard key={p.product.id} data={p} />
                ))}
              </Grid>
              <Box h="10px" />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
