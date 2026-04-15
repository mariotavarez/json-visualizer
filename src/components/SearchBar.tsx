import { Search, X } from 'lucide-react'
import { clsx } from 'clsx'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  matchCount: number
  hasData: boolean
}

export function SearchBar({ value, onChange, matchCount, hasData }: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search
        size={14}
        className="absolute left-3 text-gray-500 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search keys and values…"
        disabled={!hasData}
        className={clsx(
          'w-full bg-gray-900 border border-gray-700 rounded-lg',
          'pl-9 pr-9 py-2 text-sm font-mono text-gray-200 placeholder-gray-600',
          'focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40',
          'transition-colors duration-150',
          !hasData && 'opacity-40 cursor-not-allowed',
        )}
      />
      {value && (
        <div className="absolute right-2 flex items-center gap-1.5">
          {value && (
            <span className={clsx(
              'text-xs font-mono px-1.5 py-0.5 rounded',
              matchCount > 0 ? 'text-yellow-400 bg-yellow-400/10' : 'text-red-400 bg-red-400/10',
            )}>
              {matchCount}
            </span>
          )}
          <button
            onClick={() => onChange('')}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
