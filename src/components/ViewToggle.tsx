import { GitBranch, Code2 } from 'lucide-react'
import { clsx } from 'clsx'

export type ViewMode = 'tree' | 'raw'

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
  disabled?: boolean
}

export function ViewToggle({ mode, onChange, disabled = false }: ViewToggleProps) {
  return (
    <div className={clsx(
      'inline-flex rounded-lg border border-gray-700 overflow-hidden bg-gray-900',
      disabled && 'opacity-40 pointer-events-none',
    )}>
      <button
        onClick={() => onChange('tree')}
        className={clsx(
          'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors',
          mode === 'tree'
            ? 'bg-violet-600/30 text-violet-300'
            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800',
        )}
        disabled={disabled}
      >
        <GitBranch size={12} />
        Tree
      </button>
      <button
        onClick={() => onChange('raw')}
        className={clsx(
          'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-700',
          mode === 'raw'
            ? 'bg-violet-600/30 text-violet-300'
            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800',
        )}
        disabled={disabled}
      >
        <Code2 size={12} />
        Raw
      </button>
    </div>
  )
}
