import { describe, it, expect } from 'vitest';
import { Filter, english, arabic, spanish } from '../index';

describe('Profanity Checker', () => {
  describe('English', () => {
    it('should return false for clean text', () => {
      const filter = new Filter({ languages: [english] });
      expect(filter.isProfane('he is going home')).toBe(false);
    });

    it('should return true for profane text', () => {
      const filter = new Filter({ languages: [english] });
      expect(filter.isProfane('he is going fucking home')).toBe(true);
    });

    it('should clean profane text', () => {
      const filter = new Filter({ languages: [english] });
      const cleaned = filter.clean('he is going fucking home');
      expect(cleaned).toContain('*');
      expect(cleaned).not.toContain('fucking');
    });

    it('should get matches', () => {
      const filter = new Filter({ languages: [english] });
      const matches = filter.getMatches('he is going fucking home');
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  describe('Arabic', () => {
    it('should return false for clean text', () => {
      const filter = new Filter({ languages: [arabic] });
      expect(filter.isProfane('ذهب محمد الى الحديقة')).toBe(false);
    });

    it('should return true for profane text', () => {
      const filter = new Filter({ languages: [arabic] });
      expect(filter.isProfane('الراجل بتاع السوبر ماركت معرص')).toBe(true);
    });
  });

  describe('Spanish', () => {
    it('should return false for clean text', () => {
      const filter = new Filter({ languages: [spanish] });
      expect(filter.isProfane('él va a casa')).toBe(false);
    });

    it('should return true for profane text', () => {
      const filter = new Filter({ languages: [spanish] });
      expect(filter.isProfane('ese gilipollas')).toBe(true);
    });
  });

  describe('Multi-language', () => {
    it('should work with multiple languages', () => {
      const filter = new Filter({ languages: [english, arabic, spanish] });
      expect(filter.isProfane('he is going fucking home')).toBe(true);
      expect(filter.isProfane('الراجل بتاع السوبر ماركت معرص')).toBe(true);
      expect(filter.isProfane('ese gilipollas')).toBe(true);
      expect(filter.isProfane('clean text')).toBe(false);
    });
  });

  describe('Empty filter', () => {
    it('should return false when no languages are provided', () => {
      const filter = new Filter();
      expect(filter.isProfane('any text')).toBe(false);
    });
  });
});
