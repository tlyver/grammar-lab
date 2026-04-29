// src/utils/sanitize.ts

export function sanitizeText(input: unknown): string | null {
  if (typeof input !== 'string') return null

  const cleaned = input.replace(/[\x00-\x1F\x7F]/g, '').trim()

  const badPattern = /<script|<\/|onerror=|eval\(|{{|\$\{/i
  if (badPattern.test(cleaned)) return null

  return cleaned
}
