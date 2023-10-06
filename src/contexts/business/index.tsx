import React from "react";
import { IBusinessContext } from "./interface";
import { Business } from "../../types/business";
import { BusinessCategory } from "@/src/types/business/category";

const BusinessContext = React.createContext<IBusinessContext>({
  // Attributes
  businessSelected: undefined,
  business: undefined,
  favouriteBusiness: undefined,
  categories: undefined,

  // React useState Methods
  setBusinessSelected: () => {},
  setBusiness: () => {},
  setFavouriteBusiness: () => {},
  setCategories: () => {},
});

export const BusinessContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [businessSelected, setBusinessSelected] = React.useState<
    Business | undefined
  >(undefined);
  const [business, setBusiness] = React.useState<Business[] | undefined>(
    undefined
  );
  const [favouriteBusiness, setFavouriteBusiness] = React.useState<
    Business[] | undefined
  >(undefined);
  const [categories, setCategories] = React.useState<
    BusinessCategory[] | undefined
  >(undefined);

  // Methods

  const values = {
    businessSelected,
    business,
    favouriteBusiness,
    categories,

    setBusinessSelected,
    setBusiness,
    setFavouriteBusiness,
    setCategories,
  };

  const memo = React.useMemo(
    () => values,
    [businessSelected, business, favouriteBusiness, categories]
  );

  return (
    <BusinessContext.Provider value={memo}>
      {props.children}
    </BusinessContext.Provider>
  );
};

export function useBusinessProvider(): IBusinessContext {
  const context = React.useContext(BusinessContext);
  if (!context)
    throw new Error("useProvider have to be inside of the BookingAppContext");
  return context;
}
