import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { clsx } from 'clsx'

interface JsonKeyProps {
  keyName: string | number
  path: string
  onCopyPath: (path: string, id: string) => void
  copiedKey: string | null
  isHighlighted?: boolean
}

export function JsonKey({ keyName, path, onCopyPath, copiedKey, isHighlighted = false }: JsonKeyProps) {
  const [hovered, setHovered] = useState(false)
  const copyId = `path:${path}`
  const isCopied = copiedKey === copyId

  return (
    <span
      className="relative inline-flex items-center gap-1 group/key"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={clsx(
          'text-violet-300 font-mono text-sm cursor-default',
          isHighlighted && 'bg-yellow-500/20 rounded px-0.5 outline outline-1 outline-yellow-500/40',
        )}
      >
        {typeof keyName === 'number' ? keyName : `"${keyName}"`}
      </span>
      <span className="text-gray-500 font-mono text-sm">:</span>

      {/* Copy path button — visible on key hover */}
      <button
        onClick={() => onCopyPath(path, copyId)}
        className={clsx(
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs transition-all duration-150',
          'opacity-0 group-hover/key:opacity-100',
          isCopied
            ? 'text-green-400 bg-green-400/10'
            : 'text-gray-500 hover:text-gray-200 hover:bg-gray-700/60',
        )}
        title={`Copy path: ${path}`}
        aria-label={`Copy path ${path}`}
      >
        {isCopied ? <Check size={11} /> : <Copy size={11} />}
      </button>

      {/* Path tooltip */}
      {hovered && path && (
        <span
          className={clsx(
            'absolute bottom-full left-0 mb-1.5 z-50',
            'bg-gray-800 text-gray-300 text-xs font-mono px-2 py-1 rounded border border-gray-700',
            'whitespace-nowrap pointer-events-none shadow-lg',
          )}
        >
          {path}
        </span>
      )}
    </span>
  )
}
