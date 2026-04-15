import { useMemo } from 'react'
import { clsx } from 'clsx'

interface RawViewProps {
  data: unknown
  searchQuery: string
}

/**
 * Syntax-highlight a JSON string by replacing token patterns with
 * inline <span> tags, then injecting via dangerouslySetInnerHTML.
 * All values are entity-escaped before replacement to prevent XSS.
 */
function syntaxHighlight(json: string): string {
  // Escape HTML entities first
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-blue-400' // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-violet-300' // key
        } else {
          cls = 'text-green-400' // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-orange-400'
      } else if (/null/.test(match)) {
        cls = 'text-red-400'
      }
      return `<span class="${cls}">${match}</span>`
    },
  )
}

export function RawView({ data, searchQuery }: RawViewProps) {
  const formatted = useMemo(() => JSON.stringify(data, null, 2), [data])
  const highlighted = useMemo(() => syntaxHighlight(formatted), [formatted])

  // Apply search highlight on top
  const withSearch = useMemo(() => {
    if (!searchQuery.trim()) return highlighted
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`(${escaped})`, 'gi')
    return highlighted.replace(re, '<mark class="bg-yellow-500/30 text-yellow-200 rounded-sm">$1</mark>')
  }, [highlighted, searchQuery])

  return (
    <div className="h-full overflow-auto">
      <pre
        className={clsx(
          'p-4 text-sm font-mono leading-relaxed text-gray-300',
          'min-h-full',
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: withSearch }}
      />
    </div>
  )
}
