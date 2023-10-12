import React from "react";
import { VStack, Button, Spinner, HStack, Spacer } from "@chakra-ui/react";
import { InputInfo } from "../inputs/InputInfo";
import { useBranchProvider } from "@/src/contexts/branch";
import { Product } from "@/src/types/product";
import { useProductProvider } from "@/src/contexts/product";

export interface ICreateBusinessForm {
  onClose: () => void;
  product: Product;
}

export const EditProductForm = ({ onClose, product }: ICreateBusinessForm) => {
  // Attributes
  const [name, setName] = React.useState<string>(product.name);
  const [description, setDescription] = React.useState<string>(
    !product.description ? "" : product.description
  );
  const [price, setPrice] = React.useState<string>(product.price.toString());
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  const { branchSelected } = useBranchProvider();
  const { products, setProducts } = useProductProvider();
  // Methods
  const setProductsReplacingTheEdited = (newProduct: Product) => {
    let newProducts: Product[] = [];
    for (const p of products) {
      if (p.id === newProduct.id) {
        newProducts.push(newProduct);
      } else {
        newProducts.push(p);
      }
    }
    setProducts(newProducts);
  };
  const handleEditBusiness = async () => {
    if (branchSelected === undefined) return;
    setLoading(true);
    await branchSelected.EditProduct(product.id, name, description, price);
    const newProduct = new Product(product);
    newProduct.price = Number(price);
    newProduct.name = name;
    newProduct.description = description;
    setProductsReplacingTheEdited(newProduct);
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
          <Button variant="callToAction" onClick={handleEditBusiness}>
            EDIT
          </Button>
          {loading ? <Spinner /> : null}
        </HStack>
      </VStack>
    </>
  );
};
