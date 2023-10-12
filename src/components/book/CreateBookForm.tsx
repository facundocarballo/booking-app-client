import React from "react";
import { VStack, HStack, Spacer, Button } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBookProvider } from "@/src/contexts/book";
import { SelectClient } from "../branch/SelectClient";
import { compareTimes, getCleanDate } from "@/src/handlers/dates";
import { SelectProduct } from "../product/SelectProduct";

interface ICreateBookForm {
  time: string;
  onClose: () => void;
}

export const CreateBookForm = ({ time, onClose }: ICreateBookForm) => {
  // Attributes
  const [price, setPrice] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // Context
  const { branchSelected } = useBranchProvider();
  const {
    daySelected,
    clientIdSelected,
    setBooksAvailables,
    setBooks,
    productIdSelected,
  } = useBookProvider();
  // Methods
  const handleAppointment = async () => {
    if (!branchSelected) return;
    if (!productIdSelected) return;
    
    await branchSelected.CreateBook(
      time,
      daySelected,
      clientIdSelected,
      productIdSelected,
      Number(price),
      description
    );
    const minDate = getCleanDate(daySelected, false);
    const maxDate = getCleanDate(daySelected, true);
    const busyBooks = await branchSelected.GetBusyBooks(minDate, maxDate);
    const booksAvailables = await branchSelected.GetAvailableBooks(busyBooks);
    const busyBooksSorted = busyBooks.toSorted(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const booksSorted = booksAvailables.toSorted((a, b) => compareTimes(a, b));
    setBooksAvailables(booksSorted);
    setBooks(busyBooksSorted);
    onClose();
  };
  // Component
  return (
    <>
      <VStack w="full">
        <SelectClient />
        <SelectProduct setPrice={setPrice} />
        <InputInfo
          title="Price"
          placeholder="3000"
          handler={setPrice}
          value={price}
          type="number"
        />
        <InputInfo
          title="Description (Optional)"
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
