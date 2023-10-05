import React from "react";
import {
  VStack,
  Select,
  Text,
  Button,
  Spinner,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBusinessProvider } from "@/src/contexts/business";
import { BusinessCategory } from "@/src/types/business/category";
import { SelectBusinessCategory } from "./SelectBusinessCategory";

export const CreateBusinessForm = () => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [cats, setCats] = React.useState<undefined | BusinessCategory[]>(
    undefined
  );
  const [categorySelected, setCategorySelected] = React.useState<
    string | undefined
  >(undefined);
  // Context
  const { categories, setCategories } = useBusinessProvider();
  // Methods
  const handlerGetAllBusinessCategories = async () => {
    const c = await BusinessCategory.GetAllBusinessCategories();
    setCats(c);
    setCategorySelected(c[0].id);
    setCategories(c);
  };

  const handleCreateBusiness = async () => {
    console.log("Name: ", name);
    console.log("Description: ", description);
    console.log("Category: ", categorySelected);
  };

  React.useEffect(() => {
    if (categories !== undefined) {
      setCats(categories);
      return;
    }
    handlerGetAllBusinessCategories();
  }, []);
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
        {cats === undefined ? (
          <Spinner />
        ) : (
          <SelectBusinessCategory
            handler={setCategorySelected}
            options={cats}
            title="Business Category"
          />
        )}
        <HStack w="full">
          <Spacer />
          <Button variant="callToAction" onClick={handleCreateBusiness}>
            CREATE BUSINESS
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
