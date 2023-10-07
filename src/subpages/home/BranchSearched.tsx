import { BranchCard } from "@/src/components/branch/BranchCard";
import { useBranchProvider } from "@/src/contexts/branch";
import { Grid, VStack, Text } from "@chakra-ui/react";
import React from "react";

export const BranchSearched = () => {
  // Attributes
  // Context
  const { searchBranches } = useBranchProvider();
  // Methods
  // Component
  if (!searchBranches) return null;
  if (searchBranches.length === 0)
    return (
      <VStack w="full">
        <Text variant="empty">No business finded.</Text>
      </VStack>
    );
  return (
    <>
      <VStack w="full">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {searchBranches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </Grid>
      </VStack>
    </>
  );
};
