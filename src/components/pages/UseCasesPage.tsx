'use client'

import { useState } from 'react'
import type { Role } from '@/data/content'
import { useCases } from '@/data/content'
import { PageHeader } from '../UI'
import styles from './Pages.module.css'

interface Props { role: Role }

export function UseCasesPage({ role }: Props) {
  const isIM = role === 'im'
  const accentHex = isIM ? '#4B3FBF' : '#0F6E56'

  const roleUCs = useCases.filter(u => u.roles.includes(role))
  const categories = ['All', ...new Set(roleUCs.map(u => u.category))]
  const frequencies = ['All', 'daily', 'weekly', 'as-needed']
  const [cat, setCat] = useState('All')
  const [freq, setFreq] = useState('All')

  const filtered = roleUCs.filter(u =>
    (cat === 'All' || u.category === cat) &&
    (freq === 'All' || u.frequency === freq)
  )

  return (
    <div className={styles.page}>
      <PageHeader
        badge="Use cases"
        badgeColor={isIM ? 'purple' : 'teal'}
        title="What you can do with Claude"
        subtitle={isIM
          ? "Every common IM workflow — from daily health updates to payment processor onboarding."
          : "Debugging, implementation work, PRs, client comms, and everything in between."}
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {categories.map(c => (
          <button
            key={c}
            className={`${styles.filterBtn} ${cat === c ? styles.filterActive : ''}`}
            style={cat === c ? { borderColor: accentHex, color: accentHex, background: isIM ? 'var(--purple-l)' : 'var(--teal-l)' } : {}}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {frequencies.map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${freq === f ? styles.filterActive : ''}`}
            onClick={() => setFreq(f)}
          >
            {f === 'as-needed' ? 'as needed' : f}
          </button>
        ))}
      </div>

      <div className={styles.ucGrid}>
        {filtered.map(uc => (
          <div key={uc.id} className={styles.ucCard}>
            <div className={styles.ucMeta}>
              <span className={styles.ucCategory} style={{ color: isIM ? 'var(--purple)' : 'var(--teal)' }}>
                {uc.category}
              </span>
              <span className={`${styles.ucFreq} ${
                uc.frequency === 'daily' ? styles.freqDaily :
                uc.frequency === 'weekly' ? styles.freqWeekly :
                styles.freqAsNeeded
              }`}>
                {uc.frequency === 'as-needed' ? 'as needed' : uc.frequency}
              </span>
            </div>
            <div className={styles.ucTitle}>{uc.title}</div>
            <div className={styles.ucDesc}>{uc.description}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text3)', fontSize: 14 }}>
          No use cases match those filters.
        </div>
      )}
    </div>
  )
}
