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
import "leaflet/dist/leaflet.css";
import { MapBox } from "@/src/components/Map/MapBox";

export const BranchConfig = () => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [open, setOpen] = React.useState<Date>(new Date());
  const [close, setClose] = React.useState<Date>(new Date());
  const [timeBook, setTimeBook] = React.useState<Date>(new Date());
  const [lat, setLat] = React.useState<number>(0);
  const [long, setLong] = React.useState<number>(0);
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
    navigator.geolocation.getCurrentPosition((p) => {
      setLat(p.coords.latitude);
      setLong(p.coords.longitude);
    });
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
              {lat === 0 ? null : (
                <MapBox
                  latitude={lat}
                  longitude={long}
                  setLatitude={setLat}
                  setLongitude={setLong}
                />
              )}
              {/* <MapBoxReact /> */}

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
