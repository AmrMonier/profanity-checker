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
  | 'spanish'
  | 'swedish'
  | 'thai'
  | 'turkish';
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

  /**
   * Sanitizes the input string by replacing profane words with asterisks.
   * @param value The string to sanitize.
   * @returns The sanitized string.
   */
  sanitize(value: string): string {
    const sanitizedWords = Array.from(this.words).map(word => word.replace(/(\W)/g, '\\$1')).sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${sanitizedWords.join('|')})`, 'gi');
    return value.replace(regex, match => '*'.repeat(match.length));
  }
}
