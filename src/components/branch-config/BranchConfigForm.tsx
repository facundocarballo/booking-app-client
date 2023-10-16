import React from "react";
import {
  VStack,
  Box,
  Button,
  Text,
  HStack,
  Spinner,
  Spacer,
} from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { MapBox } from "../Map/MapBox";

interface IBranchConfigForm {
  name: string;
  description: string;
  open: Date;
  close: Date;
  timeBook: Date;
  lat: number;
  long: number;
  buttonLabel: string;
  whatsapp: string;
  instagram: string;

  setName: (_name: string) => void;
  setDescription: (_description: string) => void;
  setOpen: (_open: Date) => void;
  setClose: (_close: Date) => void;
  setTimeBook: (_timeBook: Date) => void;
  setLat: (_lat: number) => void;
  setLong: (_long: number) => void;
  setWhatsApp: (_wpp: string) => void;
  setInstagram: (_ig: string) => void;
  handler: () => void;
}

export const BranchConfigForm = ({
  name,
  description,
  open,
  close,
  timeBook,
  lat,
  long,
  buttonLabel,
  whatsapp,
  instagram,

  setName,
  setDescription,
  setOpen,
  setClose,
  setTimeBook,
  setLat,
  setLong,
  setWhatsApp,
  setInstagram,
  handler,
}: IBranchConfigForm) => {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  // Methods
  const handleOfHandler = async () => {
    setLoading(true);
    await handler();
    setLoading(false);
  };
  // Component
  return (
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
        title="WhatsApp"
        type="text"
        placeholder="+54 9 11 5867-9316"
        value={whatsapp}
        handler={setWhatsApp}
      />
      <InputInfo
        title="Instagram"
        type="text"
        placeholder="@instragram"
        value={instagram}
        handler={setInstagram}
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
        <VStack>
          <HStack w="full">
            <Box w="2px" />
            <Text variant="caption">Where is your branch located?</Text>
          </HStack>
          <MapBox
            latitude={lat}
            longitude={long}
            setLatitude={setLat}
            setLongitude={setLong}
          />
        </VStack>
      )}
      <HStack w="full">
        <Spacer />
        <Button variant="callToAction" onClick={handleOfHandler}>
          {buttonLabel}
        </Button>
        {loading ? <Spinner /> : null}
      </HStack>
    </VStack>
  );
};
