// src/app/utils/sanitize.ts

export function sanitizeSentence(input: unknown): string | null {
  if (typeof input !== 'string') return null

  const cleaned = input.replace(/[\x00-\x1F\x7F]/g, '').trim()

  // Length check
  if (cleaned.length === 0 || cleaned.length > 300) return null

  // Reject known-dangerous characters or patterns
  const badPattern = /<script|<\/|onerror=|eval\(|{{|\$\{/i
  if (badPattern.test(cleaned)) return null

  return cleaned
}
