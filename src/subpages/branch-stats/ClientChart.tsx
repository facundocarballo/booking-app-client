import { ClientCard } from "@/src/components/branch-stats/ClientCard";
import { SelectBarCharRange } from "@/src/components/branch-stats/SelectBarCharRange";
import { useBranchStatsProvider } from "@/src/contexts/branch-stats";
import { DataChart } from "@/src/types/dataChart";
import {
  VStack,
  Box,
  Text,
  useColorModeValue,
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
  const bg = useColorModeValue("#B794F4", "#6B46C1");
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
                  <ClientCard client={c.client} value={c.value} />
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
