import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Spacer,
  Image,
  Box,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Grid,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import { CreateProductForm } from "@/src/components/product/CreateProductForm";
import { useProductProvider } from "@/src/contexts/product";

export const BranchImages = () => {
  // Attributes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const file = React.useRef<File | null>(null);
  // Context
  const { branchSelected } = useBranchProvider();
  const { products, setProducts } = useProductProvider();
  // Methods
  const handleGetBranches = async () => {
    if (branchSelected === undefined) return;
    const res = await branchSelected.GetProducts();
    setProducts(res);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    file.current = e.target.files === null ? null : e.target.files[0];
    if (!file.current) return;
    if (!branchSelected) return;
    await branchSelected.UploadImage(file.current);
  };

  React.useEffect(() => {
    handleGetBranches();
  }, []);
  // Component
  if (!branchSelected)
    return (
      <VStack w="full">
        <Box h="100px" />
        <Spinner />
      </VStack>
    );
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
              <Heading>Images</Heading>
              <Spacer />
              <Input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                w="380px"
                onChange={handleChangeImage}
              />
              <AccordionIcon />
            </HStack>
          </AccordionButton>

          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {branchSelected.images?.map((branchImage) => (
                  <Image
                    src={branchImage.photo_url}
                    key={branchImage.id}
                    w="280px"
                    h="130px"
                    borderRadius={10}
                  />
                ))}
              </Grid>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
