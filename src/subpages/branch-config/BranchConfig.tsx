import React from "react";
import {
  HStack,
  Heading,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import "leaflet/dist/leaflet.css";
import { BranchConfigForm } from "@/src/components/branch-config/BranchConfigForm";
import { GeoHash } from "@/src/types/GeoHash";
import { Branch } from "@/src/types/Branch";
import { getWppNumber } from "@/src/handlers/auxs";

export const BranchConfig = () => {
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
  // Context
  const { branchSelected } = useBranchProvider();
  // Methods
  const handleUpdateBranch = async () => {
    if (!branchSelected) return;
    const b = new Branch(branchSelected);
    b.name = name;
    b.description = description;
    b.whatsapp = getWppNumber(whatsapp);
    b.instagram = instagram;
    b.open = open;
    b.close = close;
    b.time_book = timeBook;
    b.latitude = lat.toString();
    b.longitude = long.toString();
    b.geohash = GeoHash.encode(lat, long, 12);
    await branchSelected.EditBranch(b);
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
    if (branchSelected.whatsapp) setWhatsApp(branchSelected.whatsapp);
    if (branchSelected.instagram) setInstagram(branchSelected.instagram);
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
              buttonLabel="Update"
              setName={setName}
              setDescription={setDescription}
              setOpen={setOpen}
              setClose={setClose}
              setTimeBook={setTimeBook}
              setLat={setLat}
              setLong={setLong}
              setWhatsApp={setWhatsApp}
              setInstagram={setInstagram}
              handler={handleUpdateBranch}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
