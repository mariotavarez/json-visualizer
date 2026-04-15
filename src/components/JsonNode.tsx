import { useState } from 'react'
import { ChevronRight, ChevronDown, Copy, Check } from 'lucide-react'
import { clsx } from 'clsx'
import { JsonKey } from './JsonKey'
import { JsonValue } from './JsonValue'
import { buildPath } from '../utils/pathUtils'

interface JsonNodeProps {
  keyName?: string | number
  value: unknown
  path: (string | number)[]
  depth: number
  defaultExpanded?: boolean
  forceExpand?: boolean | null   // null = use local state; true/false = override
  searchMatchedPaths: Set<string>
  onCopyPath: (text: string, id: string) => void
  onCopyValue: (text: string, id: string) => void
  copiedKey: string | null
}

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

function isPrimitive(val: unknown): boolean {
  return !isObject(val) && !isArray(val)
}

function getChildCount(val: Record<string, unknown> | unknown[]): number {
  return Array.isArray(val) ? val.length : Object.keys(val).length
}

export function JsonNode({
  keyName,
  value,
  path,
  depth,
  defaultExpanded = true,
  forceExpand = null,
  searchMatchedPaths,
  onCopyPath,
  onCopyValue,
  copiedKey,
}: JsonNodeProps) {
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded)
  const isExpanded = forceExpand !== null ? forceExpand : localExpanded
  const currentPath = buildPath(path)
  const isSearchMatch = searchMatchedPaths.size > 0 && searchMatchedPaths.has(currentPath)
  const hasKey = keyName !== undefined

  // ── Primitive ──────────────────────────────────────────────────────────────
  if (isPrimitive(value)) {
    const valueId = `value:${currentPath}`
    const isCopiedValue = copiedKey === valueId
    const displayValue = value === null ? 'null' : typeof value === 'string' ? `"${value}"` : String(value)

    return (
      <div
        className={clsx(
          'flex items-center gap-1 py-0.5 px-1 rounded group/node',
          'hover:bg-gray-800/50 transition-colors duration-100',
          isSearchMatch && 'bg-yellow-500/10',
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        {hasKey && (
          <JsonKey
            keyName={keyName!}
            path={currentPath}
            onCopyPath={onCopyPath}
            copiedKey={copiedKey}
            isHighlighted={isSearchMatch}
          />
        )}
        <JsonValue value={value} isHighlighted={isSearchMatch} />

        {/* Copy value button */}
        <button
          onClick={() => onCopyValue(displayValue, valueId)}
          className={clsx(
            'ml-1 inline-flex items-center px-1 py-0.5 rounded text-xs transition-all duration-150',
            'opacity-0 group-hover/node:opacity-100',
            isCopiedValue
              ? 'text-green-400 bg-green-400/10'
              : 'text-gray-600 hover:text-gray-300 hover:bg-gray-700/60',
          )}
          title="Copy value"
          aria-label="Copy value"
        >
          {isCopiedValue ? <Check size={11} /> : <Copy size={11} />}
        </button>
      </div>
    )
  }

  // ── Object or Array ────────────────────────────────────────────────────────
  const isArr = isArray(value)
  const childCount = getChildCount(value as Record<string, unknown> | unknown[])
  const openBracket = isArr ? '[' : '{'
  const closeBracket = isArr ? ']' : '}'

  const toggle = () => setLocalExpanded((prev) => !prev)

  return (
    <div className="select-none">
      {/* Header row */}
      <div
        className={clsx(
          'flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer group/node',
          'hover:bg-gray-800/50 transition-colors duration-100',
          isSearchMatch && 'bg-yellow-500/10',
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={toggle}
        role="button"
        aria-expanded={isExpanded}
      >
        {/* Expand/collapse chevron */}
        <span className="text-gray-500 flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>

        {hasKey && (
          <JsonKey
            keyName={keyName!}
            path={currentPath}
            onCopyPath={onCopyPath}
            copiedKey={copiedKey}
            isHighlighted={isSearchMatch}
          />
        )}

        {/* Opening bracket */}
        <span className="text-gray-400 font-mono text-sm">{openBracket}</span>

        {!isExpanded && (
          <>
            <span className="text-gray-500 font-mono text-xs ml-1">
              {childCount} {childCount === 1 ? (isArr ? 'item' : 'key') : (isArr ? 'items' : 'keys')}
            </span>
            <span className="text-gray-400 font-mono text-sm ml-1">{closeBracket}</span>
          </>
        )}
      </div>

      {/* Children */}
      {isExpanded && (
        <div>
          {isArr
            ? (value as unknown[]).map((item, idx) => (
                <JsonNode
                  key={idx}
                  keyName={idx}
                  value={item}
                  path={[...path, idx]}
                  depth={depth + 1}
                  defaultExpanded={depth < 2}
                  forceExpand={forceExpand}
                  searchMatchedPaths={searchMatchedPaths}
                  onCopyPath={onCopyPath}
                  onCopyValue={onCopyValue}
                  copiedKey={copiedKey}
                />
              ))
            : Object.entries(value as Record<string, unknown>).map(([k, v]) => (
                <JsonNode
                  key={k}
                  keyName={k}
                  value={v}
                  path={[...path, k]}
                  depth={depth + 1}
                  defaultExpanded={depth < 2}
                  forceExpand={forceExpand}
                  searchMatchedPaths={searchMatchedPaths}
                  onCopyPath={onCopyPath}
                  onCopyValue={onCopyValue}
                  copiedKey={copiedKey}
                />
              ))}

          {/* Closing bracket */}
          <div
            className="py-0.5 px-1"
            style={{ paddingLeft: `${depth * 16 + 4 + 16}px` }}
          >
            <span className="text-gray-400 font-mono text-sm">{closeBracket}</span>
          </div>
        </div>
      )}
    </div>
  )
}
