import { useState, useCallback } from 'react'

export function useClipboard(resetDelay = 1500) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copy = useCallback(
    (text: string, key: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key)
        setTimeout(() => setCopiedKey(null), resetDelay)
      })
    },
    [resetDelay],
  )

  return { copy, copiedKey }
}
