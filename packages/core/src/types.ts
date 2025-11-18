export interface LanguagePlugin {
  name: string;
  words: string[];
}

export type FilterConfig = {
  languages?: LanguagePlugin[];
};
