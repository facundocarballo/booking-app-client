import { Business } from "@/src/types/business";
import { BusinessCategory } from "@/src/types/business/category";

export interface IBusinessContext {
    // Attributes
    businessSelected?: Business;
    business?: Business[];
    favouriteBusiness?: Business[];
    categories?: BusinessCategory[],

    // React useState Methods
    setBusinessSelected: (_business: Business) => void,
    setBusiness: (_business: Business[]) => void,
    setFavouriteBusiness: (_business: Business[]) => void,
    setCategories: (_categories: BusinessCategory[]) => void

    // Methods
};