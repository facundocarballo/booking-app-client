import React from "react";
import {
  HStack,
  VStack,
  Text,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useBranchProvider } from "@/src/contexts/branch";
import { useBookProvider } from "@/src/contexts/book";
import { useProductProvider } from "@/src/contexts/product";
import { CreateProductForm } from "./CreateProductForm";

interface ISelectProduct {
  setPrice: (_price: string) => void;
}

export const SelectProduct = ({ setPrice }: ISelectProduct) => {
  // Attributes
  const [searchProductName, setSearchProductName] = React.useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context
  const { setProductIdSelected, productIdSelected } = useBookProvider();
  const { branchSelected } = useBranchProvider();
  const { products, productsFiltered, setProducts, setProductsFiltered } =
    useProductProvider();

  // Methods
  const handleGetProducts = async () => {
    if (branchSelected === undefined) return;
    const res = await branchSelected.GetProducts();
    setProducts(res);
    setProductsFiltered(res);
    if (res.length > 0) {
      setProductIdSelected(res[0].id);
      setPrice(res[0].price.toString());
    }
  };

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const pf = products.filter(
      (p) => p.name.startsWith(input) || p.description?.includes(input)
    );
    setSearchProductName(input);
    setProductsFiltered(
      products.filter(
        (p) => p.name.startsWith(input) || p.description?.includes(input)
      )
    );
    if (pf.length === 1) {
      setPrice(pf[0].price.toString());
    }
  };

  const handelSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductIdSelected(e.currentTarget.value);
    for (const p of productsFiltered) {
      if (p.id === e.currentTarget.value) setPrice(p.price.toString());
    }
  };

  React.useEffect(() => {
    handleGetProducts();
  }, []);

  // Component
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              CREATE PRODUCT
            </AlertDialogHeader>

            <AlertDialogBody>
              <CreateProductForm onClose={onClose}/>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full">
        <HStack w="full">
          <Text fontWeight="bold">Product</Text>
          <Spacer />
        </HStack>
        <HStack w="full">
          <Input
            value={searchProductName}
            onChange={handleSearchProduct}
            w="full"
            placeholder="Search Product"
          />
          {!products || !productsFiltered ? (
            <Spinner />
          ) : (
            <Select
              w="full"
              value={productIdSelected}
              onChange={handelSelectProduct}
            >
              {productsFiltered.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name} | ${p.price}
                </option>
              ))}
            </Select>
          )}
        </HStack>
        <Text variant="link" onClick={onOpen}>
          {"Don't find the Product? Create one."}
        </Text>
      </VStack>
    </>
  );
};
