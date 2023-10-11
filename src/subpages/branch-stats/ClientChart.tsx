import { ClientCard } from "@/src/components/branch-stats/ClientCard";
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

export const ClientChart = () => {
  // Attributes
  // Context
  const { clients } = useBranchStatsProvider();
  // Methods
  const areDataToDisplay = (): boolean => {
    if (clients.length === 0) return false;
    return true;
  };

  // Component
  if (!areDataToDisplay()) return null;
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Heading>{clients.length} Clients</Heading>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                {clients.map((c) => (
                  <ClientCard key={c.client.id} data={c} />
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
