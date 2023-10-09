import React from "react";
import { VStack, HStack, Spacer, Button } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBookProvider } from "@/src/contexts/book";
import { CreateClient } from "../branch/CreateClient";

interface ICreateBookForm {
  time: string;
}

export const CreateBookForm = ({ time }: ICreateBookForm) => {
  // Attributes
  const [clientName, setClientName] = React.useState<string>("");
  const clientId = React.useRef("");
  const [price, setPrice] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // Context
  const { branchSelected } = useBranchProvider();
  const { daySelected } = useBookProvider();
  // Methods
  const handleAppointment = async () => {

  };
  // Component
  return (
    <>
      <VStack w="full">
        <CreateClient />
        <InputInfo
          title="Price"
          placeholder="3000"
          handler={setPrice}
          value={price}
          type="number"
        />
        <InputInfo
          title="Description"
          placeholder="Say something about this appointment."
          handler={setDescription}
          value={description}
          type="text"
        />
        <HStack w="full">
          <Spacer />
          <Button variant="callToAction" onClick={handleAppointment}>
            APPOINT CLIENT
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
