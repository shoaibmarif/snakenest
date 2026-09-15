import { describe, it, expect } from 'vitest';
import { slugify, fastHash, analyzeText, truncate, createDefaultWorkspace, CORE_VERSION } from '../src/index.js';

describe('@project/core logic engine', () => {
  describe('slugify', () => {
    it('converts strings into clean URL-friendly slugs', () => {
      expect(slugify('Modern TypeScript Monorepo Architecture!')).toBe('modern-typescript-monorepo-architecture');
      expect(slugify('   Leading and trailing spaces   ')).toBe('leading-and-trailing-spaces');
      expect(slugify('Special @#&* Characters')).toBe('special-characters');
    });
  });

  describe('fastHash', () => {
    it('returns consistent 8-character hex hashes', () => {
      const hash1 = fastHash('hello world');
      const hash2 = fastHash('hello world');
      const hash3 = fastHash('different content');

      expect(hash1).toBe(hash2);
      expect(hash1).not.toBe(hash3);
      expect(hash1).toHaveLength(8);
    });
  });

  describe('analyzeText', () => {
    it('computes accurate text metrics', () => {
      const sample = 'TypeScript monorepo with pure logic engine shared across web and chrome extension.';
      const metrics = analyzeText(sample);

      expect(metrics.charCount).toBe(sample.length);
      expect(metrics.wordCount).toBe(12);
      expect(metrics.readingTimeMinutes).toBeGreaterThanOrEqual(1);
      expect(metrics.hash).toBeDefined();
    });

    it('handles empty input gracefully', () => {
      const metrics = analyzeText('');
      expect(metrics.charCount).toBe(0);
      expect(metrics.wordCount).toBe(0);
      expect(metrics.readingTimeMinutes).toBe(0);
    });
  });

  describe('truncate', () => {
    it('truncates cleanly on word boundaries', () => {
      const text = 'The quick brown fox jumps over the lazy dog';
      const truncated = truncate(text, 20);
      expect(truncated.length).toBeLessThanOrEqual(20);
      expect(truncated.endsWith('...')).toBe(true);
    });

    it('leaves short text unmodified', () => {
      expect(truncate('Short', 20)).toBe('Short');
    });
  });

  describe('workspace factory', () => {
    it('creates default workspace metadata', () => {
      const ws = createDefaultWorkspace('Test Workspace');
      expect(ws.name).toBe('Test Workspace');
      expect(ws.version).toBe(CORE_VERSION);
      expect(ws.id).toMatch(/^ws_/);
      expect(ws.environment).toBe('development');
      expect(typeof ws.createdAt).toBe('number');
    });
  });
});
