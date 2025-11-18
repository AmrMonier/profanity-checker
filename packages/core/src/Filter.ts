import type { FilterConfig, LanguagePlugin } from './types';

export class Filter {
  private words: Set<string>;

  constructor(config?: FilterConfig) {
    const words: string[] = [];

    if (config?.languages && config.languages.length > 0) {
      config.languages.forEach((lang: LanguagePlugin) => {
        words.push(...lang.words);
      });
    }

    this.words = new Set<string>(words);
  }

  /**
   * Check if the provided text contains profane words
   * @param value - The text to check
   * @returns true if profane words are found, false otherwise
   */
  isProfane(value: string): boolean {
    for (const word of this.words) {
      const wordExp = new RegExp(`${word.replace(/(\W)/g, '\\$1')}`, 'gi');
      if (wordExp.test(value)) return true;
    }
    return false;
  }

  /**
   * Get all profane words found in the text
   * @param value - The text to check
   * @returns array of profane words found
   */
  getMatches(value: string): string[] {
    const matches: string[] = [];
    for (const word of this.words) {
      const wordExp = new RegExp(`${word.replace(/(\W)/g, '\\$1')}`, 'gi');
      if (wordExp.test(value)) {
        matches.push(word);
      }
    }
    return matches;
  }

  /**
   * Sanitize text by replacing profane words with asterisks
   * @param value - The text to sanitize
   * @param replacement - The character to use for replacement (default: '*')
   * @returns sanitized text
   */
  clean(value: string, replacement: string = '*'): string {
    let cleaned = value;
    for (const word of this.words) {
      const wordExp = new RegExp(`${word.replace(/(\W)/g, '\\$1')}`, 'gi');
      cleaned = cleaned.replace(wordExp, replacement.repeat(word.length));
    }
    return cleaned;
  }
}
