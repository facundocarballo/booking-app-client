import React from "react";
import {
  HStack,
  VStack,
  Text,
  Spacer,
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

interface ISelectClient {
  setClientSelected: (_str: string) => void;
}

export const SelectClient = ({ setClientSelected }: ISelectClient) => {
  // Attributes
  const [searchClientName, setSearchClientName] = React.useState<string>("");
  const [clientsFiltered, setClientsFiltered] = React.useState<Client[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context

  const { clients, setClients, branchSelected } = useBranchProvider();
  // Methods
  const handleGetClients = async () => {
    if (branchSelected === undefined) return;
    const res = await branchSelected.GetClients();
    setClients(res);
    setClientsFiltered(res);
    if (res.length > 0) setClientSelected(res[0].id);
  };

  React.useEffect(() => {
    handleGetClients();
  }, []);

  const handleSearchClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!clients) return;
    const input = e.currentTarget.value;
    setSearchClientName(input);
    setClientsFiltered(
      clients.filter(
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
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          )}
        </HStack>
        <Text variant="link" onClick={onOpen}>
          {"Don't find your Client? Create one."}
        </Text>
      </VStack>
    </>
  );
};
