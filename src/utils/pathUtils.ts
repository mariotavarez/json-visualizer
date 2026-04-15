/**
 * Build dot-notation / bracket-notation path from an array of segments.
 * Array indices become [n], object keys become .key (or root key without dot).
 */
export function buildPath(segments: (string | number)[]): string {
  if (segments.length === 0) return ''

  return segments.reduce<string>((acc, seg, idx) => {
    if (typeof seg === 'number') {
      return `${acc}[${seg}]`
    }
    // Quote keys that are not valid JS identifiers
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(seg)) {
      return idx === 0 ? seg : `${acc}.${seg}`
    }
    return `${acc}["${seg}"]`
  }, '')
}

/**
 * Get a human-readable path string for display in tooltips.
 */
export function formatPath(segments: (string | number)[]): string {
  return buildPath(segments) || '(root)'
}
