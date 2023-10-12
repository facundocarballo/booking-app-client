import React from "react";
import { IProductContext } from "./interface";
import { Product } from "@/src/types/product";

const ProductContext = React.createContext<IProductContext>({
  // Attributes
  productSelected: undefined,
  products: [],
  productsFiltered: [],

  // React useState Methods
  setProductSelected: () => {},
  setProducts: () => {},
  setProductsFiltered: () => {},
});

export const ProductContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [productSelected, setProductSelected] = React.useState<
    Product | undefined
  >(undefined);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = React.useState<Product[]>([]);

  // Methods

  const values = {
    productSelected,
    products,
    productsFiltered,

    setProductSelected,
    setProducts,
    setProductsFiltered,
  };

  const memo = React.useMemo(
    () => values,
    [productSelected, products, productsFiltered]
  );

  return (
    <ProductContext.Provider value={memo}>
      {props.children}
    </ProductContext.Provider>
  );
};

export function useProductProvider(): IProductContext {
  const context = React.useContext(ProductContext);
  if (!context)
    throw new Error("useProvider have to be inside of the ProductContext.");
  return context;
}
