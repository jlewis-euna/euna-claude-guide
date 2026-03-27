'use client'

import { useState, useEffect } from 'react'
import type { Role } from '@/data/content'
import { RolePicker } from './RolePicker'
import { Sidebar } from './Sidebar'
import { PageContent } from './PageContent'
import styles from './ClientApp.module.css'

export type Page =
  | 'home'
  | 'getting-started'
  | 'use-cases'
  | 'prompts'
  | 'skills'
  | 'tools'
  | 'checklist'
  | 'insights'

export function ClientApp() {
  const [role, setRole] = useState<Role | null>(null)
  const [page, setPage] = useState<Page>('home')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedRole = localStorage.getItem('euna-guide-role') as Role | null
    if (savedRole) {
      setRole(savedRole)
      setPage('getting-started')
    }
  }, [])

  function handleRoleSelect(r: Role) {
    setRole(r)
    setPage('getting-started')
    localStorage.setItem('euna-guide-role', r)
  }

  function handleRoleSwitch() {
    setRole(null)
    setPage('home')
    localStorage.removeItem('euna-guide-role')
  }

  if (!mounted) return null

  if (!role) {
    return <RolePicker onSelect={handleRoleSelect} />
  }

  return (
    <div className={styles.app}>
      <Sidebar
        role={role}
        activePage={page}
        onNavigate={setPage}
        onRoleSwitch={handleRoleSwitch}
      />
      <main className={styles.main}>
        <PageContent role={role} page={page} onNavigate={setPage} />
      </main>
    </div>
  )
}
