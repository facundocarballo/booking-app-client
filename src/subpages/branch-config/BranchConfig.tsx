import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Spacer,
  Button,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import { InputInfo } from "@/src/components/inputs/InputInfo";

export const BranchConfig = () => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [open, setOpen] = React.useState<Date>(new Date());
  const [close, setClose] = React.useState<Date>(new Date());
  const [timeBook, setTimeBook] = React.useState<Date>(new Date());
  // Context
  const { branchSelected } = useBranchProvider();
  // Methods
  const handleUpdateBranch = () => {
    console.log("Open: ", open);
    console.log("Close: ", close);
    console.log("Book Time: ", timeBook);
  };
  React.useEffect(() => {
    if (!branchSelected) return;
    setTimeBook(branchSelected.time_book);
    setOpen(branchSelected.open);
    setClose(branchSelected.close);
    setName(branchSelected.name);
    if (branchSelected.description) setDescription(branchSelected.description);
  }, []);
  // Component
  if (!branchSelected) return <Spinner />;
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <HStack w="full">
              <Heading>Configuration</Heading>
              <Spacer />
              <AccordionIcon />
            </HStack>
          </AccordionButton>

          <AccordionPanel>
            <VStack w="full">
              <Box h="10px" />
              <InputInfo
                title="Name"
                type="text"
                placeholder="Branch Name"
                value={name}
                handler={setName}
              />
              <InputInfo
                title="Description"
                type="text"
                placeholder="Branch Description"
                value={description}
                handler={setDescription}
              />
              <InputInfo
                title="Open"
                type="time"
                placeholder="Branch Open"
                value={open}
                handler={setOpen}
              />
              <InputInfo
                title="Close"
                type="time"
                placeholder="Branch Close"
                value={close}
                handler={setClose}
              />
              <InputInfo
                title="Book Time"
                type="time"
                placeholder="Book Time"
                value={timeBook}
                handler={setTimeBook}
              />
              <Button variant="callToAction" onClick={handleUpdateBranch}>
                Update
              </Button>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
