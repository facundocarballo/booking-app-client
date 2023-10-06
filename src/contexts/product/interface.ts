import { Product } from "@/src/types/product";

export interface IProductContext {
    // Attributes
    productSelected?: Product;
    products?: Product[];

    // React useState Methods
    setProductSelected: (_business: Product) => void,
    setProducts: (_business: Product[]) => void,

    // Methods
};