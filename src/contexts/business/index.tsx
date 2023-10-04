import React from "react";
import { IBusinessContext } from "./interface";
import { Business } from "../../types/business";
import { BusinessCategory } from "@/src/types/business/category";

const BusinessContext = React.createContext<IBusinessContext>({
  // Attributes
  business: undefined,
  favouriteBusiness: undefined,
  categories: undefined,

  // React useState Methods
  setBusiness: () => {},
  setFavouriteBusiness: () => {},
  setCategories: () => {},
});

export const BusinessContextProvider: React.FC<any> = (props: any) => {
  // Attributes
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
    business,
    favouriteBusiness,
    categories,

    setBusiness,
    setFavouriteBusiness,
    setCategories,
  };

  const memo = React.useMemo(() => values, [business, favouriteBusiness]);

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
