import React from "react";
import {
  HStack,
  VStack,
  Text,
  Spacer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import { CreateClientForm } from "./CreateClientForm";
import { Client } from "@/src/types/Client";

export const CreateClient = () => {
  // Attributes
  const [searchClientName, setSearchClientName] = React.useState<string>("");
  const [clientSelected, setClientSelected] = React.useState<string>("");
  const [clientsFiltered, setClientsFiltered] = React.useState<Client[]>([]);
  const [clientsAll, setclientsAll] = React.useState<Client[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context

  const { clients, branchSelected, setClients } = useBranchProvider();
  // Methods
  const handleGetClients = async () => {
    if (branchSelected === undefined) return;
    const res = await branchSelected.GetClients();
    setclientsAll(res);
    setClientsFiltered(res);
  };

  React.useEffect(() => {
    console.log("Ejecutando useEffect de clients...");
    handleGetClients();
  }, [clients]);

  const handleSearchClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setSearchClientName(input);
    setClientsFiltered(
      clientsAll.filter(
        (c) => c.name.startsWith(input) || c.description.includes(input)
      )
    );
  };

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
              CREATE CLIENT
            </AlertDialogHeader>

            <AlertDialogBody>
              <CreateClientForm onClose={onClose} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full">
        <HStack w="full">
          <Text fontWeight="bold">Client</Text>
          <Spacer />
          <Button variant="callToAction" onClick={onOpen}>
            CREATE CLIENT
          </Button>
        </HStack>
        <HStack w="full">
          <Input
            value={searchClientName}
            onChange={handleSearchClient}
            w="full"
            placeholder="Search for your client"
          />
          {clients === undefined ? (
            <Spinner />
          ) : (
            <Select
              w="full"
              onChange={(e) => setClientSelected(e.currentTarget.value)}
            >
              {clientsFiltered.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </Select>
          )}
        </HStack>
      </VStack>
    </>
  );
};
