'use client'

import { useState } from 'react'
import styles from './Pages.module.css'

interface WarpLine {
  type: 'cmd' | 'output' | 'ai' | 'success' | 'warning' | 'spacer'
  content: string
  aiCmd?: string
}

interface WarpScenario {
  id: string
  label: string
  path: string
  lines: WarpLine[]
}

const scenarios: WarpScenario[] = [
  {
    id: 'debug',
    label: 'Debug a 500 error',
    path: '~/euna/payment-service  •  SE-8142',
    lines: [
      { type: 'cmd', content: 'kubectl logs payment-service-7d4b9c-xk2p9 -n uat --tail=30' },
      { type: 'output', content: 'NilPointerException at PaymentWebhookHandler:42\n  → processor.charge_id was nil on retry attempt #3' },
      { type: 'spacer', content: '' },
      {
        type: 'ai',
        content: 'The nil pointer on charge_id is happening because the retry path doesn\'t re-fetch the charge object — it reuses the stale local variable from the first attempt. The fix is to re-fetch before accessing .charge_id on any retry.',
        aiCmd: 'grep -n "charge_id" app/handlers/payment_webhook.rb',
      },
      { type: 'cmd', content: 'grep -n "charge_id" app/handlers/payment_webhook.rb' },
      { type: 'output', content: '42:  charge_id = processor.charge_id\n67:  retry_payment(charge_id)   ← stale reference here' },
      { type: 'success', content: '✓ Root cause confirmed — line 67 needs re-fetch before retry' },
    ],
  },
  {
    id: 'kubectl',
    label: 'kubectl with AI help',
    path: '~/euna/app-state  •  Denver UAT',
    lines: [
      { type: 'cmd', content: 'Cmd+I  →  "show me pods failing in the denver-uat namespace"' },
      {
        type: 'ai',
        content: 'To list pods with non-Running status in a specific namespace:',
        aiCmd: 'kubectl get pods -n denver-uat --field-selector=status.phase!=Running',
      },
      { type: 'cmd', content: 'kubectl get pods -n denver-uat --field-selector=status.phase!=Running' },
      { type: 'output', content: 'NAME                            READY   STATUS             RESTARTS\ncbops-worker-5f8c2d-mn4x1      0/1     CrashLoopBackOff   11\nweb-checkout-7d4b9c-xk2p9      0/1     ImagePullBackOff   0' },
      { type: 'warning', content: '2 pods failing  •  Denver NI Web UAT blocked (SE-7840)' },
      { type: 'spacer', content: '' },
      { type: 'cmd', content: 'Cmd+I  →  "what causes CrashLoopBackOff, check the logs"' },
      {
        type: 'ai',
        content: 'CrashLoopBackOff = container starts but immediately exits. Most common: missing env var or secret, app error on startup, OOMKilled. Let\'s check:',
        aiCmd: 'kubectl logs cbops-worker-5f8c2d-mn4x1 -n denver-uat --previous | tail -20',
      },
    ],
  },
  {
    id: 'pr',
    label: 'PR + change notes',
    path: '~/euna/checkout-web  •  SE-7395 St. Louis Kiosk',
    lines: [
      { type: 'cmd', content: 'git log --oneline -5' },
      { type: 'output', content: 'a3f92c1 fix: nil check on Datacap retry path\nb1e7d40 feat: add idempotency key to webhook handler\n9c2a441 test: webhook handler retry specs\n4d8f221 chore: bump datacap_client gem to 2.4.1\ne1b3390 fix: timeout on void() call' },
      { type: 'spacer', content: '' },
      { type: 'cmd', content: 'Cmd+I  →  "write a PR description for these 5 commits"' },
      {
        type: 'ai',
        content: 'Fix Datacap webhook reliability for St. Louis kiosk (SE-7395)\n\nAdds idempotency key support and fixes a nil pointer on payment retry. Bumps datacap_client and resolves a void() timeout that was blocking refunds.\n\nTesting: rake spec:webhooks  •  Deploy: no migration needed',
        aiCmd: '',
      },
      { type: 'spacer', content: '' },
      { type: 'cmd', content: 'Cmd+I  →  "write client-facing release notes for the same changes"' },
      {
        type: 'ai',
        content: 'Payment reliability improvements — March 2026\n\nWe resolved an issue where payment retries could occasionally fail on the kiosk. Refunds now process more reliably. No action needed on your end.',
        aiCmd: '',
      },
    ],
  },
  {
    id: 'claude-code',
    label: 'Claude Code in Warp',
    path: '~/euna/integration-layer  •  Systematic Debugging skill active',
    lines: [
      { type: 'cmd', content: 'claude' },
      { type: 'output', content: '✓ Claude Code  •  Sonnet 4.6  •  Agent mode\n  Skills loaded: systematic-debugging, root-cause-tracing, writing-skills\n  Reading repo context...' },
      { type: 'spacer', content: '' },
      { type: 'cmd', content: 'Find all Datacap API calls without error handling' },
      {
        type: 'ai',
        content: 'Found 4 Datacap call sites. 2 are unprotected:\n• app/services/datacap_client.rb:88  →  charge() — no rescue block\n• lib/integrations/datacap.rb:134   →  void() — swallows all errors silently\n\nI\'ll add DatacapError rescue blocks to both. Review before I write?',
        aiCmd: '',
      },
      { type: 'cmd', content: 'Yes, add proper rescue blocks to both' },
      { type: 'success', content: '✓ Updated 2 files  •  Awaiting your approval to write changes' },
    ],
  },
  {
    id: 'insights',
    label: '/insights report',
    path: '~/euna/checkout-web',
    lines: [
      { type: 'cmd', content: 'claude /insights' },
      { type: 'output', content: 'Analyzing 38 sessions across 6 projects...\nGenerating report...' },
      { type: 'spacer', content: '' },
      {
        type: 'ai',
        content: 'What\'s working: You consistently paste full stack traces — Claude can give specific answers vs. generic guidance. Strong debugging workflow.\n\nHindering you: You\'ve typed nearly identical PR description prompts 9 times this month. This should be a /pr-description skill — here\'s the SKILL.md:\n\nQuick win: Add the postgres skill to your SE repos. You\'ve asked 6 Postgres-related questions that would benefit from automatic schema context.',
        aiCmd: '',
      },
      { type: 'success', content: '✓ report.html saved  →  open report.html' },
    ],
  },
]

export function WarpDemo() {
  const [active, setActive] = useState('debug')
  const [running, setRunning] = useState<string | null>(null)

  const scenario = scenarios.find(s => s.id === active)!

  function handleRun(cmd: string) {
    setRunning(cmd)
    setTimeout(() => setRunning(null), 1200)
  }

  return (
    <div className={styles.warpDemo}>
      {/* Tab strip above terminal */}
      <div className={styles.warpTabStrip}>
        {scenarios.map(s => (
          <button
            key={s.id}
            className={`${styles.warpTabStripBtn} ${active === s.id ? styles.warpTabStripActive : ''}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Title bar */}
      <div className={styles.warpBar}>
        <span className={styles.warpDot} style={{ background: '#FF5F56' }} />
        <span className={styles.warpDot} style={{ background: '#FFBD2E' }} />
        <span className={styles.warpDot} style={{ background: '#27C93F' }} />
        <span className={styles.warpPath}>{scenario.path}</span>
      </div>

      {/* Terminal body */}
      <div className={styles.warpBody}>
        {scenario.lines.map((line, i) => {
          if (line.type === 'spacer') {
            return <div key={i} style={{ height: 8 }} />
          }
          if (line.type === 'cmd') {
            return (
              <div key={i} className={styles.warpLine}>
                <span className={styles.warpPromptChar}>❯</span>
                <span className={styles.warpCmd}>{line.content}</span>
              </div>
            )
          }
          if (line.type === 'output') {
            return (
              <div key={i} className={styles.warpLine} style={{ marginBottom: 10 }}>
                <pre className={styles.warpOutput} style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{line.content}</pre>
              </div>
            )
          }
          if (line.type === 'success') {
            return (
              <div key={i} className={styles.warpLine}>
                <span className={styles.warpSuccess}>{line.content}</span>
              </div>
            )
          }
          if (line.type === 'warning') {
            return (
              <div key={i} className={styles.warpLine}>
                <span className={styles.warpWarning}>{line.content}</span>
              </div>
            )
          }
          if (line.type === 'ai') {
            return (
              <div key={i} className={styles.warpAiBlock}>
                <div className={styles.warpAiLabel}>Claude · Agent mode</div>
                <div className={styles.warpAiText} style={{ whiteSpace: 'pre-line' }}>{line.content}</div>
                {line.aiCmd && (
                  <div className={styles.warpAiCmd}>
                    <span style={{ fontFamily: 'inherit' }}>{line.aiCmd}</span>
                    <button
                      className={styles.warpRunBtn}
                      onClick={() => handleRun(line.aiCmd!)}
                    >
                      {running === line.aiCmd ? 'Running…' : 'Run ↵'}
                    </button>
                  </div>
                )}
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Input row */}
      <div className={styles.warpInputRow}>
        <span className={styles.warpInputPromptIcon}>❯</span>
        <input
          className={styles.warpInput}
          placeholder="Type a command or Cmd+I for AI..."
          readOnly
        />
        <button className={styles.warpAiBtn}>Cmd+I</button>
      </div>
    </div>
  )
}
