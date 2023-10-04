import React from "react";
import EN from "../../languages/langs/en.json";
import { IHomeContext } from "./interface";
import User from "../../types/user";
import { ILanguageJSON, Language } from "../../languages/interface";

const HomeContext = React.createContext<IHomeContext>({
  // Attributes
  user: undefined,
  language: "en",
  jsonLanguague: EN,

  // React useState Methods
  setUser: () => {},
  setLanguage: () => {},
  setJsonLanguague: () => {},
});

export const HomeContextProvider: React.FC<any> = (props: any) => {
  // Attributes
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [language, setLanguage] = React.useState<Language>("en");
  const [jsonLanguague, setJsonLanguague] = React.useState<ILanguageJSON>(EN);

  // Methods
  const values = {
    user,
    language,
    jsonLanguague,

    setUser,
    setLanguage,
    setJsonLanguague,
  };

  const memo = React.useMemo(() => values, [user, language, jsonLanguague]);

  return (
    <HomeContext.Provider value={memo}>
      {props.children}
    </HomeContext.Provider>
  );
};

export function useHomeProvider(): IHomeContext {
  const context = React.useContext(HomeContext);
  if (!context)
    throw new Error("useProvider have to be inside of the BookingAppContext");
  return context;
}
