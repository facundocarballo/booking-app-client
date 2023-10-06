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
import { useHomeProvider } from "@/src/contexts/home";
import { BusinessCard } from "@/src/components/business/BusinessCard";
import { CreateBranchForm } from "@/src/components/branch/CreateBranchForm";

export const BusinessBranches = () => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  // Context
  const { user } = useHomeProvider();
  const { business, setBusiness } = useBusinessProvider();
  // Methods
  const handleGetBusiness = async () => {
    if (user === undefined) return;
    const res = await user.GetBusiness();
    setBusiness(res);
  };

  React.useEffect(() => {
    handleGetBusiness();
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
              Create Branch
            </AlertDialogHeader>

            <AlertDialogBody>
              <CreateBranchForm onClose={onClose} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full">
        <HStack w="full">
          <Box w="10px" />
          <Heading>Your Branches</Heading>
          <Spacer />
          <Button variant="callToAction" onClick={onOpen}>
            Create Branch
          </Button>
          <Box w="10px" />
        </HStack>
        <Box h="10px" />
        {business !== undefined && business.length > 0 ? (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {business.map((b, idx) => (
              <GridItem key={idx}>
                <BusinessCard business={b} key={idx} />
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
