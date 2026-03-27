'use client'

import type { Role } from '@/data/content'
import { checklistItems } from '@/data/content'
import { PageHeader } from '../UI'
import { useProgress } from '@/lib/useProgress'
import styles from './Pages.module.css'

interface Props { role: Role }

export function ChecklistPage({ role }: Props) {
  const isIM = role === 'im'
  const accent = isIM ? 'var(--purple)' : 'var(--teal)'
  const accentHex = isIM ? '#4B3FBF' : '#0F6E56'

  const items = checklistItems.filter(i => i.role === role)
  const categories = [...new Set(items.map(i => i.category))]
  const { done, toggle } = useProgress(role)

  const completed = done.size
  const total = items.length
  const pct = Math.round((completed / total) * 100)

  return (
    <div className={styles.page}>
      <PageHeader
        badge="My checklist"
        badgeColor={isIM ? 'purple' : 'teal'}
        title="Your setup checklist"
        subtitle="Track your progress getting set up and trying Claude for the first time. Progress is saved automatically."
      />

      <div className={styles.progressSummary}>
        <div>
          <div className={styles.progressCount} style={{ color: accent }}>{completed}</div>
          <div className={styles.progressText}>of {total} complete</div>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%`, background: accent }}
          />
        </div>
        <div style={{ fontSize: 20, fontWeight: 500, color: accent, minWidth: 44 }}>{pct}%</div>
      </div>

      {categories.map(cat => {
        const catItems = items.filter(i => i.category === cat)
        const catDone = catItems.filter(i => done.has(i.id)).length
        return (
          <div key={cat} className={styles.checklistSection}>
            <div className={styles.checklistCategory}>
              {cat}
              <span style={{ marginLeft: 8, fontWeight: 400, color: 'var(--text3)' }}>
                {catDone}/{catItems.length}
              </span>
            </div>
            <div className={styles.checklistItems}>
              {catItems.map(item => {
                const isDone = done.has(item.id)
                return (
                  <button
                    key={item.id}
                    className={`${styles.checklistItem} ${isDone ? styles.checklistItemDone : ''}`}
                    onClick={() => toggle(item.id)}
                  >
                    <div className={`${styles.checkBox} ${isDone ? (isIM ? styles['checkBoxDone-purple'] : styles['checkBoxDone-teal']) : ''}`}>
                      {isDone && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <div className={styles.checkContent}>
                      <div className={styles.checkTitle} style={isDone ? { textDecoration: 'line-through' } : {}}>
                        {item.title}
                      </div>
                      <div className={styles.checkDesc}>{item.description}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {completed === total && (
        <div style={{
          padding: '20px 24px',
          background: isIM ? 'var(--purple-l)' : 'var(--teal-l)',
          borderRadius: 'var(--r-xl)',
          textAlign: 'center',
          marginTop: 8
        }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>All done</div>
          <p style={{ fontSize: 14, color: isIM ? 'var(--purple-t)' : 'var(--teal-t)', lineHeight: 1.6 }}>
            You've completed the full setup. Head to the Prompt Builder whenever you need a starting point.
          </p>
        </div>
      )}
    </div>
  )
}
