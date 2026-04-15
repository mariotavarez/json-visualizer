import { useMemo } from 'react'
import { buildPath } from '../utils/pathUtils'

export interface SearchResult {
  matchedPaths: Set<string>
  matchCount: number
}

function walkSearch(
  value: unknown,
  segments: (string | number)[],
  query: string,
  matched: Set<string>,
): void {
  const lowerQuery = query.toLowerCase()

  if (value === null || typeof value !== 'object') {
    // Primitive — check value
    const str = String(value).toLowerCase()
    if (str.includes(lowerQuery)) {
      matched.add(buildPath(segments))
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, idx) => {
      walkSearch(item, [...segments, idx], query, matched)
    })
  } else {
    const obj = value as Record<string, unknown>
    for (const key of Object.keys(obj)) {
      // Check key name
      if (key.toLowerCase().includes(lowerQuery)) {
        matched.add(buildPath([...segments, key]))
      }
      walkSearch(obj[key], [...segments, key], query, matched)
    }
  }
}

export function useSearch(data: unknown, query: string): SearchResult {
  return useMemo(() => {
    if (!query.trim() || data === null || data === undefined) {
      return { matchedPaths: new Set(), matchCount: 0 }
    }

    const matched = new Set<string>()
    walkSearch(data, [], query.trim(), matched)
    return { matchedPaths: matched, matchCount: matched.size }
  }, [data, query])
}
