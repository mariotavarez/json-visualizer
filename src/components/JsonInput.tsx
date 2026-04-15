import { useRef } from 'react'
import { Clipboard, Trash2, Sparkles, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'
import type { ParseError } from '../hooks/useJsonParser'
import { SAMPLE_JSON } from '../data/sampleJson'

interface JsonInputProps {
  value: string
  onChange: (v: string) => void
  error: ParseError | null
}

export function JsonInput({ value, onChange, error }: JsonInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      textareaRef.current?.focus()
    } catch {
      textareaRef.current?.focus()
    }
  }

  const handleClear = () => {
    onChange('')
    textareaRef.current?.focus()
  }

  const handleExample = () => {
    onChange(SAMPLE_JSON)
    textareaRef.current?.focus()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-300 tracking-wide">JSON Input</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-gray-700 transition-colors"
            title="Paste from clipboard"
          >
            <Clipboard size={12} />
            Paste
          </button>
          <button
            onClick={handleExample}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 border border-violet-600/30 transition-colors"
            title="Load example JSON"
          >
            <Sparkles size={12} />
            Example
          </button>
          {value && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-900/20 border border-gray-700 hover:border-red-800 transition-colors"
              title="Clear input"
            >
              <Trash2 size={12} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste your JSON here…\n\n{\n  "example": "value"\n}`}
          spellCheck={false}
          className={clsx(
            'w-full h-full resize-none bg-gray-950 text-gray-300 font-mono text-sm leading-relaxed',
            'px-4 py-4 focus:outline-none placeholder-gray-700',
            'transition-colors duration-150',
            error && value ? 'border-l-2 border-red-500' : 'border-l-2 border-transparent',
          )}
        />
      </div>

      {/* Error display */}
      {error && value && (
        <div className="flex-shrink-0 flex items-start gap-2.5 px-4 py-3 bg-red-950/40 border-t border-red-900/60">
          <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-red-400">Invalid JSON</p>
            <p className="text-xs text-red-300/80 font-mono mt-0.5 break-words">
              {error.message}
              {error.line !== undefined && (
                <span className="ml-2 text-red-400/60">
                  (line {error.line}{error.column !== undefined ? `, col ${error.column}` : ''})
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
