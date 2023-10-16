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
} from "@chakra-ui/react";
import { useBusinessProvider } from "@/src/contexts/business";
import { useBranchProvider } from "@/src/contexts/branch";
import { BranchCard } from "@/src/components/branch/BranchCard";
import { BranchConfigForm } from "@/src/components/branch-config/BranchConfigForm";
import { GeoHash } from "@/src/types/GeoHash";

export const BusinessBranches = () => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [whatsapp, setWhatsApp] = React.useState<string>("");
  const [instagram, setInstagram] = React.useState<string>("");
  const [open, setOpen] = React.useState<Date>(new Date());
  const [close, setClose] = React.useState<Date>(new Date());
  const [timeBook, setTimeBook] = React.useState<Date>(new Date());
  const [lat, setLat] = React.useState<number>(0);
  const [long, setLong] = React.useState<number>(0);

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
  const handleGetCoordinates = () => {
    navigator.geolocation.getCurrentPosition((p) => {
      setLat(p.coords.latitude);
      setLong(p.coords.longitude);
    });
  };

  const handleCreateBranch = async () => {
    if (!businessSelected) return;
    await businessSelected.CreateBranch(
      name,
      description,
      whatsapp,
      instagram,
      open,
      close,
      timeBook,
      lat,
      long,
      GeoHash.encode(lat, long, 12)
    );
    onClose();
  };

  React.useEffect(() => {
    handleGetBusiness();
    handleGetCoordinates();
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
              <BranchConfigForm
                name={name}
                description={description}
                whatsapp={whatsapp}
                instagram={instagram}
                open={open}
                close={close}
                timeBook={timeBook}
                lat={lat}
                long={long}
                buttonLabel="Create"
                setName={setName}
                setDescription={setDescription}
                setOpen={setOpen}
                setClose={setClose}
                setTimeBook={setTimeBook}
                setLat={setLat}
                setLong={setLong}
                setWhatsApp={setWhatsApp}
                setInstagram={setInstagram}
                handler={handleCreateBranch}
              />
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
              <BranchCard key={b.id} branch={b} />
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
