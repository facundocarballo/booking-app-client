import React from "react";
import { VStack } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";

export const CreateBusinessForm = () => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // Context
  // Methods
  // Component
  return (
    <>
      <VStack w="full">
        <InputInfo
          title="Name"
          placeholder="Booking App"
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
        
      </VStack>
    </>
  );
};
