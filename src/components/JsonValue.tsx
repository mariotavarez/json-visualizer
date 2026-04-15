import { clsx } from 'clsx'

interface JsonValueProps {
  value: unknown
  isHighlighted?: boolean
}

function getValueClass(value: unknown): string {
  if (value === null) return 'text-red-400'
  switch (typeof value) {
    case 'string':
      return 'text-green-400'
    case 'number':
      return 'text-blue-400'
    case 'boolean':
      return 'text-orange-400'
    default:
      return 'text-gray-300'
  }
}

function formatValue(value: unknown): string {
  if (value === null) return 'null'
  if (typeof value === 'string') return `"${value}"`
  return String(value)
}

export function JsonValue({ value, isHighlighted = false }: JsonValueProps) {
  return (
    <span
      className={clsx(
        getValueClass(value),
        'font-mono text-sm transition-colors duration-150',
        isHighlighted && 'bg-yellow-500/20 rounded px-0.5 outline outline-1 outline-yellow-500/40',
      )}
    >
      {formatValue(value)}
    </span>
  )
}
