import React from "react";
import { VStack, Button, Spinner, HStack, Spacer } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { Business } from "@/src/types/business";
import { useBusinessProvider } from "@/src/contexts/business";

export interface ICreateBusinessForm {
  onClose: () => void
}

export const CreateBranchForm = ({ onClose }: ICreateBusinessForm) => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [geoHash, setGeoHash] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  const { businessSelected } = useBusinessProvider();
  // Methods

  const handleCreateBusiness = async () => {
    if (businessSelected === undefined) return;
    setLoading(true);
    await businessSelected.CreateBranch(name, geoHash, description);
    setLoading(false);
    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setGeoHash("");
  };

  // Component
  return (
    <>
      <VStack w="full">
        <InputInfo
          title="Name"
          placeholder="Booking App - New York"
          type="text"
          value={name}
          handler={setName}
        />
        <InputInfo
          title="Description"
          placeholder="App to organize your business and get new clients."
          type="text"
          value={description}
          handler={setDescription}
        />
        <InputInfo
          title="GeoHash"
          placeholder="69y6ge"
          type="text"
          value={geoHash}
          handler={setGeoHash}
        />
        <HStack w="full">
          <Spacer />
          <Button variant="callToAction" onClick={handleCreateBusiness}>
            CREATE BRANCH
          </Button>
          {loading ? <Spinner /> : null}
        </HStack>
      </VStack>
    </>
  );
};
