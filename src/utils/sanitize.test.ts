// src/utils/sanitize.test.ts

import { describe, it, expect } from 'vitest'
import { sanitizeText } from './sanitize'

describe('sanitizeSentence', () => {
  it('removes control characters like \\u0007 and \\x00', () => {
    const input = 'Hello\u0007\u0000world'
    const result = sanitizeText(input)
    expect(result).toBe('Helloworld')
  })

  it('accepts valid, safe sentences', () => {
    expect(sanitizeText('The quick brown fox jumps over the lazy dog.')).toBe(
      'The quick brown fox jumps over the lazy dog.'
    )
  })

  it('returns cleaned result when input is messy but safe', () => {
    const input = '  \u0000Hello world!\n'
    const result = sanitizeText(input)
    expect(result).toBe('Hello world!')
  })

  it('rejects empty or whitespace-only input', () => {
    expect(sanitizeText('   ')).toBeNull()
    expect(sanitizeText('\n\t')).toBeNull()
    expect(sanitizeText('')).toBeNull()
  })

  it('rejects strings that exceed length limit', () => {
    const longInput = 'a'.repeat(301)
    expect(sanitizeText(longInput)).toBeNull()
  })

  it('rejects dangerous HTML/script patterns', () => {
    expect(sanitizeText('<script>alert(1)</script>')).toBeNull()
    expect(sanitizeText('<img src=x onerror=alert(1)>')).toBeNull()
    expect(sanitizeText('eval(alert("x"))')).toBeNull()
  })

  it('rejects prompt injection-like patterns', () => {
    expect(sanitizeText('${malicious}')).toBeNull()
    expect(sanitizeText('{{ override }}')).toBeNull()
  })

  it('returns null for non-string input', () => {
    expect(sanitizeText(123 as number)).toBeNull()
    expect(sanitizeText(undefined)).toBeNull()
    expect(sanitizeText(null)).toBeNull()
  })
})
