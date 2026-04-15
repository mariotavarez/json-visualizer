import { useState } from 'react'
import { Braces } from 'lucide-react'
import { JsonInput } from './components/JsonInput'
import { SAMPLE_JSON } from './data/sampleJson'
import { JsonTree } from './components/JsonTree'
import { RawView } from './components/RawView'
import { SearchBar } from './components/SearchBar'
import { StatsBar } from './components/StatsBar'
import { ViewToggle, type ViewMode } from './components/ViewToggle'
import { useJsonParser } from './hooks/useJsonParser'
import { useSearch } from './hooks/useSearch'
import { computeStats } from './utils/jsonStats'

export default function App() {
  const [input, setInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('tree')

  const { data, error, raw } = useJsonParser(input)
  const { matchedPaths, matchCount } = useSearch(data, searchQuery)
  const stats = data !== null ? computeStats(raw, data) : null

  const hasData = data !== null

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Top bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-violet-600/20 border border-violet-600/30 flex items-center justify-center">
            <Braces size={15} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-100 leading-none">json-visualizer</h1>
            <p className="text-xs text-gray-600 mt-0.5 leading-none">Paste JSON. See everything. Instantly.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasData && (
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          )}
        </div>
      </header>

      {/* Main two-panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left panel — Input (40%) */}
        <div className="lg:w-2/5 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-800 h-[45vh] lg:h-auto">
          <JsonInput value={input} onChange={setInput} error={error} />
        </div>

        {/* Right panel — Visualizer (60%) */}
        <div className="lg:w-3/5 flex flex-col overflow-hidden flex-1">
          {/* Search bar */}
          <div className="flex-shrink-0 px-3 py-2 border-b border-gray-800 bg-gray-900/40">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              matchCount={matchCount}
              hasData={hasData}
            />
          </div>

          {/* Stats */}
          {hasData && stats && (
            <StatsBar stats={stats} />
          )}

          {/* Content area */}
          <div className="flex-1 overflow-hidden">
            {!hasData && !error && (
              <EmptyState onExampleClick={() => setInput(SAMPLE_JSON)} />
            )}
            {!hasData && error && input && (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-600 text-sm">Fix the JSON error to visualize the tree.</p>
              </div>
            )}
            {hasData && viewMode === 'tree' && (
              <JsonTree data={data} searchMatchedPaths={matchedPaths} />
            )}
            {hasData && viewMode === 'raw' && (
              <RawView data={data} searchQuery={searchQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onExampleClick }: { onExampleClick: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center">
        <Braces size={28} className="text-gray-700" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-400">No JSON yet</h2>
        <p className="text-sm text-gray-600 mt-1 max-w-xs">
          Paste any JSON in the left panel to explore it as a collapsible, color-coded tree.
        </p>
      </div>
        <button
        onClick={onExampleClick}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 border border-violet-600/30 transition-colors"
      >
        Load example JSON
      </button>
      <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-700">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400/60 inline-block" />strings</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400/60 inline-block" />numbers</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400/60 inline-block" />booleans</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400/60 inline-block" />null</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-400/60 inline-block" />keys</span>
      </div>
    </div>
  )
}
