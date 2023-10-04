export type Language = "en" | "es";

export interface ILanguage {
    json: ILanguageJSON,
    symbol: Language,
    flag: string | undefined
};

export interface ILanguageJSON {
    create_user_title: string,
}