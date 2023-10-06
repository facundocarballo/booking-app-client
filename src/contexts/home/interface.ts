import { ILanguageJSON, Language } from "../../languages/interface";
import User from "../../types/user";

export interface IHomeContext {
    // Attributes
    user?: User,
    language: Language,
    jsonLanguague: ILanguageJSON,

    // React useState Methods
    setUser: (_user: User|undefined) => void,
    setLanguage: (_languague: Language) => void,
    setJsonLanguague: (_jsonLanguague: ILanguageJSON) => void,

    // Methods
};