import dictionary from './data/dictionary';

type language =
  | 'arabic'
  | 'chinese'
  | 'czech'
  | 'danish'
  | 'english'
  | 'esperanto'
  | 'finnish'
  | 'french'
  | 'german'
  | 'hindi'
  | 'hungarian'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'norwegian'
  | 'persian'
  | 'polish'
  | 'portuguese'
  | 'russian'
  | 'turkish'
  | 'swedish'
  | 'thai';
export default class Filter {
  private words: Set<string>;
  /**
   *
   */
  constructor(config?: { languages: language[] }) {
    let words = dictionary.english;

    if (config) {
      const languagesChecks = new Set<language>(config?.languages);
      if (languagesChecks.size !== 0) {
        languagesChecks.forEach(lang => {
          words = [...words, ...dictionary[lang]];
        });
      }
    }
    this.words = new Set<string>(words);
  }

  /**
   *
   * @param value
   * @returns
   */
  isProfane(value: string): boolean {
    for (const word of this.words) {
      const wordExp = new RegExp(`${word.replace(/(\W)/g, '\\$1')}`, 'gi');
      if (wordExp.test(value)) return true;
    }
    return false;
  }
}
