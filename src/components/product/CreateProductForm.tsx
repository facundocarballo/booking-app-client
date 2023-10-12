import React from "react";
import { VStack, Button, Spinner, HStack, Spacer } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBranchProvider } from "@/src/contexts/branch";
import { useProductProvider } from "@/src/contexts/product";
import { useBookProvider } from "@/src/contexts/book";

export interface ICreateBusinessForm {
  onClose: () => void;
}

export const CreateProductForm = ({ onClose }: ICreateBusinessForm) => {
  // Attributes
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [photoUrl, setPhotoUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  const { branchSelected } = useBranchProvider();
  const { products, setProducts, productsFiltered, setProductsFiltered } =
    useProductProvider();
  const { setProductIdSelected } = useBookProvider();
  // Methods

  const handleCreateProduct = async () => {
    if (branchSelected === undefined) return;
    setLoading(true);
    const newProduct = await branchSelected.CreateProduct(
      name,
      description,
      Number(price),
      photoUrl
    );
    console.log("newProduct: ", newProduct);
    if (!newProduct) return;
    setProducts([...products, newProduct]);
    setProductsFiltered([...productsFiltered, newProduct]);
    setProductIdSelected(newProduct.id);
    setLoading(false);
    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setPrice("");
  };

  // Component
  return (
    <>
      <VStack w="full">
        <InputInfo
          title="Name"
          placeholder="Hair cut"
          type="text"
          value={name}
          handler={setName}
        />
        <InputInfo
          title="Description"
          placeholder="Beautiful hair cut"
          type="text"
          value={description}
          handler={setDescription}
        />
        <InputInfo
          title="Price"
          placeholder="2800"
          type="number"
          value={price}
          handler={setPrice}
        />
        <HStack w="full">
          <Spacer />
          <Button variant="callToAction" onClick={handleCreateProduct}>
            CREATE PRODUCT
          </Button>
          {loading ? <Spinner /> : null}
        </HStack>
      </VStack>
    </>
  );
};
