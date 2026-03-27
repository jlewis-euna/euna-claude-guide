'use client'

import type { Role } from '@/data/content'
import { checklistItems } from '@/data/content'
import type { Page } from './ClientApp'
import styles from './Sidebar.module.css'
import { useProgress } from '@/lib/useProgress'
import { useState } from 'react'

interface NavItem { page: Page; label: string; icon: React.ReactNode }

const imNav: NavItem[] = [
  { page: 'getting-started', label: 'Getting started', icon: <StarIcon /> },
  { page: 'use-cases', label: 'Use cases', icon: <GridIcon /> },
  { page: 'prompts', label: 'Prompt builder', icon: <ChatIcon /> },
  { page: 'skills', label: 'Skills', icon: <PlugIcon /> },
  { page: 'tools', label: 'Tools', icon: <ToolIcon /> },
  { page: 'checklist', label: 'My checklist', icon: <CheckIcon /> },
]

const tssNav: NavItem[] = [
  { page: 'getting-started', label: 'Getting started', icon: <StarIcon /> },
  { page: 'use-cases', label: 'Use cases', icon: <GridIcon /> },
  { page: 'prompts', label: 'Prompt builder', icon: <ChatIcon /> },
  { page: 'skills', label: 'Skills', icon: <PlugIcon /> },
  { page: 'tools', label: 'Tools', icon: <ToolIcon /> },
  { page: 'insights', label: '/insights command', icon: <InsightIcon /> },
  { page: 'checklist', label: 'My checklist', icon: <CheckIcon /> },
]

interface Props {
  role: Role
  activePage: Page
  onNavigate: (p: Page) => void
  onRoleSwitch: () => void
}

export function Sidebar({ role, activePage, onNavigate, onRoleSwitch }: Props) {
  const nav = role === 'im' ? imNav : tssNav
  const accent = role === 'im' ? 'var(--purple)' : 'var(--teal)'
  const accentL = role === 'im' ? 'var(--purple-l)' : 'var(--teal-l)'
  const accentT = role === 'im' ? 'var(--purple-t)' : 'var(--teal-t)'
  const [mobileOpen, setMobileOpen] = useState(false)

  const total = checklistItems.filter(i => i.role === role).length
  const { completed } = useProgress(role)
  const pct = Math.round((completed / total) * 100)

  return (
    <>
      {/* Mobile top bar */}
      <div className={styles.mobileBar}>
        <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
          <HamburgerIcon />
        </button>
        <span className={styles.mobileLogo}>Claude at Euna</span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      <nav className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoDot} style={{ background: accent }} />
          <span className={styles.logoText}>Claude at Euna</span>
        </div>

        {/* Role badge */}
        <div className={styles.roleBadge} style={{ background: accentL, color: accentT }}>
          <span className={styles.roleDot} style={{ background: accent }} />
          {role === 'im' ? 'Implementation Manager' : 'Solutions Engineer'}
          <button className={styles.switchBtn} onClick={onRoleSwitch} title="Switch role">
            <SwitchIcon />
          </button>
        </div>

        {/* Nav items */}
        <div className={styles.nav}>
          {nav.map(item => {
            const isActive = activePage === item.page
            return (
              <button
                key={item.page}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                style={isActive ? { background: accentL, color: accentT } : {}}
                onClick={() => { onNavigate(item.page); setMobileOpen(false) }}
              >
                <span className={styles.navIcon} style={isActive ? { color: accent } : {}}>
                  {item.icon}
                </span>
                {item.label}
                {item.page === 'checklist' && completed > 0 && (
                  <span className={styles.badge} style={{ background: accent }}>
                    {completed}/{total}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Progress */}
        <div className={styles.progress}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Setup progress</span>
            <span className={styles.progressPct} style={{ color: accent }}>{pct}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${pct}%`, background: accent }}
            />
          </div>
        </div>

        {/* Confluence link */}
        <a
          href="https://eunasolutions.atlassian.net/wiki/spaces/IMPNEW/pages/1809874951/AI+Tools"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.confluenceLink}
        >
          <ConfluenceIcon />
          Confluence docs
          <ExternalIcon />
        </a>
      </nav>
    </>
  )
}

function StarIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function GridIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
function ChatIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
}
function PlugIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64A9 9 0 0 1 20.77 15"/><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"/><path d="M12 2v4"/><path d="M2 12h4"/><path d="m15 9-6 6"/></svg>
}
function ToolIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
}
function InsightIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
}
function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
}
function SwitchIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
}
function HamburgerIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
}
function ConfluenceIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
}
function ExternalIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
