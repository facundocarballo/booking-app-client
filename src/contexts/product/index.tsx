import React from "react";
import { IProductContext } from "./interface";
import { Product } from "@/src/types/product";

const ProductContext = React.createContext<IProductContext>({
  // Attributes
  productSelected: undefined,
  products: undefined,

  // React useState Methods
  setProductSelected: () => {},
  setProducts: () => {},
});

export const ProductContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [productSelected, setProductSelected] = React.useState<
    Product | undefined
  >(undefined);
  const [products, setProducts] = React.useState<Product[] | undefined>(
    undefined
  );

  // Methods

  const values = {
    productSelected,
    products,

    setProductSelected,
    setProducts,
  };

  const memo = React.useMemo(() => values, [productSelected, products]);

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
