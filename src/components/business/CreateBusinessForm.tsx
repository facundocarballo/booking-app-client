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
import { useHomeProvider } from "@/src/contexts/home";

export interface ICreateBusinessForm {
    onClose: () => void
}

export const CreateBusinessForm = ({onClose}: ICreateBusinessForm) => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [cats, setCats] = React.useState<undefined | BusinessCategory[]>(
    undefined
  );
  const [categorySelected, setCategorySelected] = React.useState<
    string | undefined
  >(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  const { categories, setCategories } = useBusinessProvider();
  const { user } = useHomeProvider();
  // Methods
  const handlerGetAllBusinessCategories = async () => {
    const c = await BusinessCategory.GetAllBusinessCategories();
    setCats(c);
    setCategorySelected(c[0].id);
    setCategories(c);
  };

  const handleCreateBusiness = async () => {
    if (user === undefined || categorySelected === undefined) return;
    setLoading(true);
    await user.CreateBusiness(name, description, categorySelected);
    setLoading(false);
    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    if (cats === undefined) return;
    setCategorySelected(cats[0].id);
  }

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
          {
            loading ? <Spinner /> : null
          }
        </HStack>
      </VStack>
    </>
  );
};
