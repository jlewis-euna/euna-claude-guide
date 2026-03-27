'use client'

import type { Role } from '@/data/content'
import styles from './RolePicker.module.css'

interface Props { onSelect: (r: Role) => void }

export function RolePicker({ onSelect }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Euna Solutions · AI Tools
        </div>

        <h1 className={`${styles.heading} serif`}>
          Claude at Euna.<br />
          <em>Your guide to working smarter.</em>
        </h1>

        <p className={styles.sub}>
          Interactive reference for Implementation Managers and Technical Solutions Specialists.
          Select your role to get a tailored guide.
        </p>

        <div className={styles.cards}>
          <button className={`${styles.card} ${styles.cardIm}`} onClick={() => onSelect('im')}>
            <div className={styles.cardIcon} style={{ background: 'var(--purple)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <div className={styles.cardTitle}>Implementation Manager</div>
              <div className={styles.cardDesc}>Scheduling, tickets, status updates, client comms — all in the Claude app UI</div>
            </div>
            <svg className={styles.cardArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <button className={`${styles.card} ${styles.cardTss}`} onClick={() => onSelect('tss')}>
            <div className={styles.cardIcon} style={{ background: 'var(--teal)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div>
              <div className={styles.cardTitle}>Technical Solutions Specialist</div>
              <div className={styles.cardDesc}>Debugging, PRs, implementations, Warp terminal, Claude Code</div>
            </div>
            <svg className={styles.cardArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <p className={styles.footnote}>Your role is remembered for next time.</p>
      </div>
    </div>
  )
}
