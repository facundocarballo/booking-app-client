import React from "react";
import { VStack, HStack, Spacer, Button } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBookProvider } from "@/src/contexts/book";
import { SelectClient } from "../branch/SelectClient";

interface ICreateBookForm {
  time: string;
  onClose: () => void;
}

export const CreateBookForm = ({ time, onClose }: ICreateBookForm) => {
  // Attributes
  const [clientId, setClientId] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // Context
  const { branchSelected,  } = useBranchProvider();
  const { daySelected, setBooksAvailables } = useBookProvider();
  // Methods
  const handleAppointment = async () => {
    if (!branchSelected) return;
    await branchSelected.CreateBook(
      time,
      daySelected,
      clientId,
      Number(price),
      description
    );
    const booksAvailables = await branchSelected.GetAvailableBooks(daySelected);
    setBooksAvailables(booksAvailables);
    onClose();
  };
  // Component
  return (
    <>
      <VStack w="full">
        <SelectClient setClientSelected={setClientId} />
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
