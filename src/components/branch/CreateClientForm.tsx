import React from "react";
import { VStack, Button, HStack, Spacer } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBookProvider } from "@/src/contexts/book";

interface ICreateBookForm {
  onClose: () => void;
}

export const CreateClientForm = ({ onClose }: ICreateBookForm) => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // Context
  const { setClientIdSelected } = useBookProvider();
  const {
    clients,
    branchSelected,
    setClients,
    setClientsFiltered,
    clientsFiltered,
  } = useBranchProvider();
  // Methods
  const handleCreateClient = async () => {
    if (!branchSelected || !clients || !clientsFiltered) return;
    const newClient = await branchSelected.CreateClient(name, description);
    if (newClient) {
      setClients([...clients, newClient]);
      setClientsFiltered([...clientsFiltered, newClient]);
      setClientIdSelected(newClient.id);
    }
    onClose();
  };
  // Component
  return (
    <>
      <VStack w="full">
        <InputInfo
          title="Name"
          placeholder="John"
          type="text"
          value={name}
          handler={setName}
        />
        <InputInfo
          title="Description"
          placeholder="Is a nice guy..."
          type="text"
          value={description}
          handler={setDescription}
        />
        <HStack w="full">
          <Spacer />
          <Button variant="callToAction" onClick={handleCreateClient}>
            CREATE
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
