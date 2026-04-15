import { useMemo } from 'react'

export interface ParseError {
  message: string
  line?: number
  column?: number
}

export interface ParseResult {
  data: unknown | null
  error: ParseError | null
  raw: string
}

function extractLineColumn(message: string, raw: string): { line?: number; column?: number } {
  // V8: "at position N"
  const posMatch = message.match(/at position (\d+)/)
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10)
    const before = raw.slice(0, pos)
    const line = before.split('\n').length
    const lastNewline = before.lastIndexOf('\n')
    const column = lastNewline === -1 ? pos + 1 : pos - lastNewline
    return { line, column }
  }

  // Firefox/Safari: "line N column N"
  const lineColMatch = message.match(/line (\d+) column (\d+)/)
  if (lineColMatch) {
    return { line: parseInt(lineColMatch[1], 10), column: parseInt(lineColMatch[2], 10) }
  }

  return {}
}

export function useJsonParser(input: string): ParseResult {
  return useMemo(() => {
    const raw = input.trim()
    if (!raw) {
      return { data: null, error: null, raw }
    }

    try {
      const data = JSON.parse(raw)
      return { data, error: null, raw }
    } catch (e) {
      const msg = e instanceof SyntaxError ? e.message : String(e)
      const { line, column } = extractLineColumn(msg, raw)
      return {
        data: null,
        error: { message: msg, line, column },
        raw,
      }
    }
  }, [input])
}
