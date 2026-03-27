'use client'

import { useState } from 'react'
import type { Role } from '@/data/content'
import { prompts } from '@/data/content'
import { PageHeader, SectionHeading } from '../UI'
import { PromptBuilder } from './PromptBuilder'
import styles from './Pages.module.css'

interface Props { role: Role }

export function PromptsPage({ role }: Props) {
  const isIM = role === 'im'
  const accent = isIM ? 'var(--purple)' : 'var(--teal)'
  const accentHex = isIM ? '#4B3FBF' : '#0F6E56'

  const rolePrompts = prompts.filter(p => p.id.startsWith(role === 'im' ? 'im-' : 'tss-'))

  const categories = [...new Set(rolePrompts.map(p => p.category))]
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [activePrompt, setActivePrompt] = useState(rolePrompts[0])

  const filtered = rolePrompts.filter(p => p.category === activeCategory)

  return (
    <div className={styles.page}>
      <PageHeader
        badge="Prompt builder"
        badgeColor={isIM ? 'purple' : 'teal'}
        title="Build your prompts"
        subtitle="Fill in the fields and copy the finished prompt straight to Claude. No more starting from scratch."
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
            style={activeCategory === cat ? { borderColor: accentHex, color: accentHex, background: isIM ? 'var(--purple-l)' : 'var(--teal-l)' } : {}}
            onClick={() => {
              setActiveCategory(cat)
              const first = rolePrompts.find(p => p.category === cat)
              if (first) setActivePrompt(first)
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {filtered.map(p => (
            <button
              key={p.id}
              className={`${styles.filterBtn} ${activePrompt.id === p.id ? styles.filterActive : ''}`}
              style={activePrompt.id === p.id ? { borderColor: accentHex, color: accentHex } : {}}
              onClick={() => setActivePrompt(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <PromptBuilder prompt={activePrompt} accentColor={accentHex} />

      <SectionHeading>All prompts at a glance</SectionHeading>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: 24 }}>
          <div className={styles.checklistCategory}>{cat}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rolePrompts.filter(p => p.category === cat).map(p => (
              <button
                key={p.id}
                className={styles.quickLink}
                onClick={() => { setActiveCategory(cat); setActivePrompt(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              >
                <div>
                  <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 14, marginBottom: 2 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{p.description}</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
