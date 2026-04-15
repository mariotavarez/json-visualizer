export interface JsonStats {
  totalKeys: number
  totalNodes: number
  maxDepth: number
  lineCount: number
  byteSize: number
}

function walkValue(value: unknown, depth: number, stats: { keys: number; nodes: number; maxDepth: number }): void {
  stats.nodes++
  if (depth > stats.maxDepth) stats.maxDepth = depth

  if (value !== null && typeof value === 'object') {
    if (Array.isArray(value)) {
      for (const item of value) {
        walkValue(item, depth + 1, stats)
      }
    } else {
      const obj = value as Record<string, unknown>
      for (const key of Object.keys(obj)) {
        stats.keys++
        walkValue(obj[key], depth + 1, stats)
      }
    }
  }
}

export function computeStats(raw: string, parsed: unknown): JsonStats {
  const stats = { keys: 0, nodes: 0, maxDepth: 0 }
  walkValue(parsed, 0, stats)

  const lines = raw.split('\n').length
  const bytes = new TextEncoder().encode(raw).length

  return {
    totalKeys: stats.keys,
    totalNodes: stats.nodes,
    maxDepth: stats.maxDepth,
    lineCount: lines,
    byteSize: bytes,
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
