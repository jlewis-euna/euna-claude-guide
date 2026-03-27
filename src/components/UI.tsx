'use client'

import { useState } from 'react'
import styles from './UI.module.css'

// ── PageHeader ──────────────────────────────────────────────────────────────

interface PageHeaderProps {
  badge: string
  badgeColor: 'purple' | 'teal'
  title: string
  subtitle?: string
}

export function PageHeader({ badge, badgeColor, title, subtitle }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <span className={`${styles.badge} ${styles[`badge-${badgeColor}`]}`}>{badge}</span>
      <h1 className={`${styles.pageTitle} serif`}>{title}</h1>
      {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
    </div>
  )
}

// ── SectionHeading ───────────────────────────────────────────────────────────

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.subHeading}>{children}</h3>
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <p className={styles.prose}>{children}</p>
}

// ── InsightBox ───────────────────────────────────────────────────────────────

interface InsightProps {
  color: 'purple' | 'teal' | 'amber'
  children: React.ReactNode
}

export function InsightBox({ color, children }: InsightProps) {
  return (
    <div className={`${styles.insight} ${styles[`insight-${color}`]}`}>
      <div className={`${styles.insightIcon} ${styles[`insightIcon-${color}`]}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
        </svg>
      </div>
      <div className={styles.insightBody}>{children}</div>
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  label?: string
  labelColor?: 'purple' | 'teal' | 'muted'
  title: string
  description: string
}

export function Card({ label, labelColor = 'muted', title, description }: CardProps) {
  return (
    <div className={styles.card}>
      {label && <div className={`${styles.cardLabel} ${styles[`label-${labelColor}`]}`}>{label}</div>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
    </div>
  )
}

// ── CardGrid ─────────────────────────────────────────────────────────────────

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardGrid}>{children}</div>
}

// ── Step ─────────────────────────────────────────────────────────────────────

interface StepProps {
  num: number
  title: string
  description: React.ReactNode
  color: 'purple' | 'teal'
}

export function Step({ num, title, description, color }: StepProps) {
  return (
    <div className={styles.step}>
      <div className={`${styles.stepNum} ${styles[`stepNum-${color}`]}`}>{num}</div>
      <div>
        <div className={styles.stepTitle}>{title}</div>
        <div className={styles.stepDesc}>{description}</div>
      </div>
    </div>
  )
}

// ── Warning ───────────────────────────────────────────────────────────────────

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.warning}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
      </svg>
      <span>{children}</span>
    </div>
  )
}

// ── PromptBlock (static display) ─────────────────────────────────────────────

interface PromptBlockProps {
  label: string
  text: string
}

export function PromptBlock({ label, text }: PromptBlockProps) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.promptBlock}>
      <div className={styles.promptLabel}>{label}</div>
      <pre className={styles.promptText}>{text}</pre>
      <button className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} onClick={copy}>
        {copied ? 'Copied!' : 'Copy prompt'}
      </button>
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────

export function Divider() {
  return <hr className={styles.divider} />
}
