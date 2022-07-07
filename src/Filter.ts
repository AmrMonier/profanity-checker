import dictionary from './data/dictionary';

export default class Filter {
  private words: Set<string>;
  /**
   *
   */
  constructor(config?: {
    languages: (
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
      | 'thai'
    )[];
  }) {
    this.words = new Set<string>();
    const languagesChecks = new Set<
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
      | 'thai'
    >(config?.languages);
    if (languagesChecks.size !== 0) {
      languagesChecks.forEach(lang => {
        this.words = new Set<string>([...this.words, ...dictionary[lang]]);
      });
    } else this.words = new Set<string>(dictionary.english);
  }

  /**
   *
   * @param value
   * @returns
   */
  isProfane(value: string): boolean {
    let profaneWordsCounter = 0;

    this.words.forEach(word => {
      const wordExp = new RegExp(`${word.replace(/(\W)/g, '\\$1')}`, 'gi');
      wordExp.test(value) ? profaneWordsCounter++ : null;
    });
    return !!profaneWordsCounter;
  }
}
