import type { TextMetrics } from '../models/types.js';

/**
 * Generates a clean URL-friendly slug from an input string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Computes simple non-cryptographic 32-bit FNV-1a hash of a string for fast client-side caching/identification.
 */
export function fastHash(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

/**
 * Analyzes string content returning structured text metrics.
 */
export function analyzeText(content: string): TextMetrics {
  const trimmed = content.trim();
  const charCount = content.length;
  const words = trimmed ? trimmed.split(/\s+/) : [];
  const wordCount = words.length;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return {
    charCount,
    wordCount,
    readingTimeMinutes,
    hash: fastHash(content)
  };
}

/**
 * Truncates text cleanly on word boundaries.
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  const sub = text.slice(0, maxLength - suffix.length);
  const lastSpace = sub.lastIndexOf(' ');
  return (lastSpace > 0 ? sub.slice(0, lastSpace) : sub) + suffix;
}

