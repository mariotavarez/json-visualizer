import { useState } from 'react'
import { ChevronsUpDown, Minimize2, Maximize2 } from 'lucide-react'
import { clsx } from 'clsx'
import { JsonNode } from './JsonNode'
import { useClipboard } from '../hooks/useClipboard'

interface JsonTreeProps {
  data: unknown
  searchMatchedPaths: Set<string>
}

export function JsonTree({ data, searchMatchedPaths }: JsonTreeProps) {
  const [forceExpand, setForceExpand] = useState<boolean | null>(null)
  const { copy, copiedKey } = useClipboard()

  const handleExpandAll = () => setForceExpand(true)
  const handleCollapseAll = () => setForceExpand(false)
  const handleReset = () => setForceExpand(null)

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 flex-shrink-0">
        <button
          onClick={handleExpandAll}
          className={clsx(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors',
            forceExpand === true
              ? 'bg-violet-600/30 text-violet-300 border border-violet-600/40'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-transparent',
          )}
          title="Expand all nodes"
        >
          <Maximize2 size={12} />
          Expand all
        </button>
        <button
          onClick={handleCollapseAll}
          className={clsx(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors',
            forceExpand === false
              ? 'bg-violet-600/30 text-violet-300 border border-violet-600/40'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-transparent',
          )}
          title="Collapse all nodes"
        >
          <Minimize2 size={12} />
          Collapse all
        </button>
        {forceExpand !== null && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors bg-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-700 border border-transparent"
            title="Reset to default expansion"
          >
            <ChevronsUpDown size={12} />
            Reset
          </button>
        )}
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-auto py-2">
        <JsonNode
          value={data}
          path={[]}
          depth={0}
          defaultExpanded={true}
          forceExpand={forceExpand}
          searchMatchedPaths={searchMatchedPaths}
          onCopyPath={copy}
          onCopyValue={copy}
          copiedKey={copiedKey}
        />
      </div>
    </div>
  )
}
