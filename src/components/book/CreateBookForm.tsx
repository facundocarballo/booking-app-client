import React from "react";
import { VStack, HStack, Spacer, Button, Text } from "@chakra-ui/react";
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

const MISS_CLIENT = 1;
const MISS_PRODUCT = 2;

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
  const isDisableToBook = (): number => {
    if (clientIdSelected === "") return MISS_CLIENT;
    if (productIdSelected === "") return MISS_PRODUCT;
    return 0;
  };
  const getAlertMessage = (): string => {
    switch (isDisableToBook()) {
      case MISS_CLIENT:
        return "You have to select a client to appoint this book.";
      case MISS_PRODUCT:
        return "You have to select a product to appoint this book.";
      default:
        return "";
    }
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
          <Button
            isDisabled={isDisableToBook() !== 0}
            variant="callToAction"
            onClick={handleAppointment}
          >
            APPOINT CLIENT
          </Button>
        </HStack>
        {isDisableToBook() !== 0 ? (
          <Text variant="alert">{getAlertMessage()}</Text>
        ) : null}
      </VStack>
    </>
  );
};
