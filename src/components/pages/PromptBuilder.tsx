'use client'

import { useState, useEffect } from 'react'
import type { Prompt } from '@/data/content'
import styles from './Pages.module.css'

interface Props {
  prompt: Prompt
  accentColor: string
}

export function PromptBuilder({ prompt, accentColor }: Props) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const defaults: Record<string, string> = {}
    prompt.fields.forEach(f => {
      defaults[f.key] = f.options ? f.options[0] : ''
    })
    setValues(defaults)
  }, [prompt.id])

  function buildOutput() {
    let out = prompt.template
    prompt.fields.forEach(f => {
      const val = values[f.key] || `[${f.label}]`
      out = out.replaceAll(`{{${f.key}}}`, val)
    })
    // Remove lines that are just an empty optional field
    out = out.split('\n').filter(l => l.trim() !== '' || !l.includes('[') ).join('\n')
    return out
  }

  function copy() {
    navigator.clipboard.writeText(buildOutput()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.promptBuilder}>
      <div className={styles.promptBuilderHeader}>
        <div className={styles.promptBuilderTitle}>{prompt.label}</div>
        <div className={styles.promptBuilderDesc}>{prompt.description}</div>
      </div>
      <div className={styles.promptBuilderBody}>
        <div className={styles.fieldGroup}>
          {prompt.fields.map(field => (
            <div key={field.key}>
              <label className={styles.fieldLabel}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  className={styles.fieldSelect}
                  value={values[field.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                >
                  {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : field.key === 'action_items' || field.key === 'error' || field.key === 'code' || field.key === 'tried' || field.key === 'changes' ? (
                <textarea
                  className={styles.fieldTextarea}
                  placeholder={field.placeholder}
                  value={values[field.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                />
              ) : (
                <input
                  type="text"
                  className={styles.fieldInput}
                  placeholder={field.placeholder}
                  value={values[field.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.promptOutput}>
          <div className={styles.promptOutputLabel}>Generated prompt</div>
          <pre className={styles.promptOutputText}>{buildOutput()}</pre>
          <div className={styles.promptOutputActions}>
            <button
              className={`${styles.copyBtn} ${styles.copyBtnPrimary} ${copied ? styles.copied : ''}`}
              onClick={copy}
              style={!copied ? { background: accentColor, borderColor: accentColor, color: 'white' } : {}}
            >
              {copied ? '✓ Copied to clipboard' : 'Copy prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
