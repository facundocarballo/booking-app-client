import { Product } from "@/src/types/Product";

export interface IProductContext {
    // Attributes
    productSelected?: Product;
    products: Product[];
    productsFiltered: Product[],

    // React useState Methods
    setProductSelected: (_product: Product) => void,
    setProducts: (_products: Product[]) => void,
    setProductsFiltered: (_products: Product[]) => void
    // Methods
};