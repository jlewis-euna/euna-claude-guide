'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Role } from '@/data/content'

const KEY = (role: Role) => `euna-checklist-${role}`

export function useProgress(role: Role) {
  const [done, setDone] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY(role))
      if (raw) setDone(new Set(JSON.parse(raw)))
    } catch {}
  }, [role])

  const toggle = useCallback((id: string) => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try {
        localStorage.setItem(KEY(role), JSON.stringify([...next]))
      } catch {}
      return next
    })
  }, [role])

  return { done, toggle, completed: done.size }
}
