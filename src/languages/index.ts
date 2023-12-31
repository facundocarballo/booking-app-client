import ES from './langs/es.json';
import EN from './langs/en.json';
import { ILanguage, Language } from "./interface";

export const languages = ['es', 'en'];

export const stringToLanguague = (key:string):Language|null => {
    switch (key) {
        case "es":
            return "es";
        case "en":
            return "en";
        default:
            return null;
    }
};

const es: ILanguage = {
    json: ES,
    flag: '🇪🇸',
    symbol: 'es'
};

const en: ILanguage = {
    json: EN,
    flag: '🇬🇧',
    symbol: 'en'
}

export const Languages: ILanguage[] = [
    es,
    en
]