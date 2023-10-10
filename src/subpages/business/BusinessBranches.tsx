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
import { CreateBranchForm } from "@/src/components/branch/CreateBranchForm";
import { useBranchProvider } from "@/src/contexts/branch";
import { BranchCard } from "@/src/components/branch/BranchCard";

export const BusinessBranches = () => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context
  const { businessSelected } = useBusinessProvider();
  const { branches, setBranches } = useBranchProvider();
  // Methods
  const handleGetBusiness = async () => {
    if (businessSelected === undefined) return;
    const res = await businessSelected.GetBranches();
    setBranches(res);
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
        {branches !== undefined && branches.length > 0 ? (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {branches.map((b) => (
              <GridItem key={b.id}>
                <BranchCard branch={b} />
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
