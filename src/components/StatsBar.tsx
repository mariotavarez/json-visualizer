import { Hash, Layers, FileText, HardDrive } from 'lucide-react'
import type { JsonStats } from '../utils/jsonStats'
import { formatBytes } from '../utils/jsonStats'

interface StatsBarProps {
  stats: JsonStats
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 px-3 py-2 bg-gray-900/60 border-b border-gray-800 text-xs text-gray-500 font-mono">
      <span className="flex items-center gap-1.5">
        <FileText size={11} className="text-gray-600" />
        <span className="text-gray-300">{stats.lineCount.toLocaleString()}</span>
        {' '}lines
      </span>
      <span className="flex items-center gap-1.5">
        <Hash size={11} className="text-gray-600" />
        <span className="text-gray-300">{stats.totalKeys.toLocaleString()}</span>
        {' '}keys
      </span>
      <span className="flex items-center gap-1.5">
        <Layers size={11} className="text-gray-600" />
        <span className="text-gray-300">{stats.maxDepth}</span>
        {' '}depth
      </span>
      <span className="flex items-center gap-1.5">
        <HardDrive size={11} className="text-gray-600" />
        <span className="text-gray-300">{formatBytes(stats.byteSize)}</span>
      </span>
    </div>
  )
}
