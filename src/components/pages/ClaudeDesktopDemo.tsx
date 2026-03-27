'use client'

import { useState } from 'react'
import styles from './Pages.module.css'

interface DesktopScenario {
  id: string
  label: string
  description: string
  steps: DesktopStep[]
}

interface DesktopStep {
  type: 'user' | 'claude' | 'cowork' | 'tool-call' | 'artifact' | 'chart'
  content: string
  toolName?: string
  artifactTitle?: string
  chartData?: { label: string; value: number; color: string }[]
}

const scenarios: DesktopScenario[] = [
  {
    id: 'jira-list',
    label: 'List my Jira tickets',
    description: 'Claude pulls your open SE tickets from Jira and summarizes them',
    steps: [
      {
        type: 'user',
        content: "Show me my open Jira tickets and flag anything that's at risk",
      },
      {
        type: 'tool-call',
        toolName: 'Jira · search_issues',
        content: 'assignee = currentUser() AND status != Done ORDER BY priority DESC',
      },
      {
        type: 'claude',
        content: "Here are your 6 open tickets. One is flagged as at risk:\n\n🔴 **SE-7840** — Denver NI Web · Review Scope\nDue before kickoff call. Draft Source System Integration Worksheet not yet started. **This needs attention today.**\n\n🟡 **SE-7398** — St. Louis, MO · Kiosk Workflow\nIn progress. Blocked pending AIMS Parking API credentials from client.\n\n🟡 **IMPL-468** — St. Louis · Account Number Lookup\nOpen. Depends on SE-7398 workflow completion.\n\n🟢 **IMPL-469** — St. Louis · Ticket Number Lookup\nOpen. On track.\n\n🟢 **IMPL-474** — St. Louis · API Payment Report\nOpen. On track.\n\n🟢 **SE-6035** — City of Oakland · Cashiering & Web · Paper Receipt\nIn review.",
      },
      {
        type: 'user',
        content: 'Create a follow-up ticket for the Denver worksheet being overdue',
      },
      {
        type: 'tool-call',
        toolName: 'Jira · create_issue',
        content: 'Project: SE  •  Type: Task  •  Priority: High  •  Parent: SE-7840',
      },
      {
        type: 'claude',
        content: '✓ Created **SE-7841** — Denver NI Web: Complete SSIW draft before kickoff\n\nAssigned to Jarell Lewis · Priority: High · Linked to SE-7840 as a subtask.',
      },
    ],
  },
  {
    id: 'status-update',
    label: 'Weekly status update',
    description: 'Deep Research + Writing Skills draft a TSS check-in brief',
    steps: [
      {
        type: 'user',
        content: "Help me prep for my TSS check-in. I'm covering St. Louis (kiosk, blocked on API creds), Denver NI Web (scope review in progress), and Oakland (receipt config done, waiting UAT). Writing Skills + Deep Research skills are active.",
      },
      {
        type: 'claude',
        content: "**TSS Check-in Brief — March 26, 2026**\n\nSkills active: Writing Skills · Deep Research\n\n**St. Louis, MO — Kiosk** 🔴 At risk\nBlocked: AIMS Parking API credentials not received. Without them, integration testing cannot begin. Go-live at risk if not received by April 2.\n→ Escalate to IM today. Ask client IT lead directly.\n\n**Denver — NI Web** 🟡 Watch\nScope review in progress (SE-7840). SSIW draft not started. Kickoff call approaching.\n→ Complete SSIW draft before kickoff. Flag open questions from SOW to IM.\n\n**City of Oakland — Web & Cashiering** 🟢 On track\nPaper receipt config complete (SE-6035). UAT window starts next week.\n→ Send UAT readiness checklist to client today.",
      },
      {
        type: 'user',
        content: 'Write the Teams post version of this for the project channel',
      },
      {
        type: 'artifact',
        artifactTitle: 'Teams channel post · TSS Weekly Update',
        content: '📊 **TSS Project Update — Week of March 24**\n\n🔴 St. Louis Kiosk — BLOCKED on API creds. Escalation in flight.\n🟡 Denver NI Web — Scope review underway. SSIW due before kickoff.\n🟢 City of Oakland — Receipt config done. UAT starts next week.\n\nAction items:\n• @IM — St. Louis API creds needed by April 2 or go-live slips\n• SE — SSIW draft for Denver by EOD Friday\n• SE — Send Oakland UAT checklist today',
      },
    ],
  },
  {
    id: 'skills-writing',
    label: 'Skills in action',
    description: 'Writing Skills + Deep Research turn a rough update into a polished client email',
    steps: [
      {
        type: 'user',
        content: "Here are my rough notes from the St. Louis call. Writing Skills + Deep Research are active — turn this into a clean client follow-up.\n\nNotes: talked about api creds again. they said IT is working on it. we need it by april 2 or go live moves. also confirmed UAT window april 14-18. they will send test scenarios. open q: who signs off UAT on their side.",
      },
      {
        type: 'claude',
        content: '**Skills applied:** Deep Research structured the action items · Writing Skills tightened tone and removed filler\n\n---\n\n**Draft client follow-up:**\n\nSubject: St. Louis Kiosk — Follow-up from today\'s call\n\nHi [Client name],\n\nThank you for the update on the API credentials — please keep us posted as your IT team works through the process. To stay on schedule for our May go-live, we\'ll need the credentials by **April 2**. If that date is at risk, please let us know as soon as possible so we can adjust the timeline together.\n\nA few items confirmed on today\'s call:\n\n- **UAT window:** April 14–18\n- **Test scenarios:** Your team will send these in advance\n- **Open item:** Please confirm who will provide final UAT sign-off on your side\n\nWe\'ll send the UAT readiness checklist by end of this week.\n\nBest,\n[Your name]',
      },
    ],
  },
  {
    id: 'chart',
    label: 'Project health chart',
    description: 'Claude builds a visual project status chart from your portfolio',
    steps: [
      {
        type: 'user',
        content: "Create a project health chart for my current portfolio: St. Louis (Red — blocked), Denver NI Web (Amber — scope), Oakland (Green — UAT), City of Chicago (Green — stable), Reedley CA (Amber — hardware delay).",
      },
      {
        type: 'chart',
        content: 'Portfolio health visualization',
        chartData: [
          { label: 'St. Louis, MO', value: 1, color: '#E24B4A' },
          { label: 'Denver NI Web', value: 2, color: '#EF9F27' },
          { label: 'Reedley, CA', value: 2, color: '#EF9F27' },
          { label: 'City of Oakland', value: 3, color: '#1D9E75' },
          { label: 'City of Chicago', value: 3, color: '#1D9E75' },
        ],
      },
      {
        type: 'claude',
        content: '**Portfolio summary — March 26, 2026**\n\n🔴 1 project at risk · needs immediate action\n🟡 2 projects to watch · active blockers\n🟢 2 projects on track\n\nHighest priority this week: St. Louis API credentials. Everything else is manageable.',
      },
    ],
  },
  {
    id: 'cowork',
    label: 'Claude Cowork tasks',
    description: 'Cowork automates multi-step tasks across files and apps',
    steps: [
      {
        type: 'user',
        content: 'Using Cowork: Read my St. Louis project notes from the Confluence page, draft a UAT readiness checklist, and save it as a new Confluence page under the project.',
      },
      {
        type: 'cowork',
        content: 'Step 1 of 3 — Reading Confluence: City of St. Louis Project Page',
      },
      {
        type: 'cowork',
        content: "Step 2 of 3 — Drafting UAT readiness checklist based on project scope (kiosk, AIMS Parking API, account number + ticket number lookup, payment report)",
      },
      {
        type: 'cowork',
        content: 'Step 3 of 3 — Creating Confluence page: "St. Louis — UAT Readiness Checklist" under the project space',
      },
      {
        type: 'claude',
        content: '✓ Done. Created **St. Louis — UAT Readiness Checklist** in Confluence.\n\nThe checklist covers:\n• Who needs to be available (IT lead, finance contact)\n• Access required (AIMS Parking test environment, kiosk hardware)\n• Scenarios to test (account lookup, ticket lookup, payment, receipt)\n• How to log issues (Jira project SE)\n• Sign-off process and deadline (April 18)\n\nReview it before sending to the client — you\'ll want to add the specific IT contact name.',
      },
    ],
  },
]

function HealthBar({ data }: { data: { label: string; value: number; color: string }[] }) {
  const statusLabel = (v: number) => v === 1 ? 'Red' : v === 2 ? 'Amber' : 'Green'
  const statusIcon = (v: number) => v === 1 ? '🔴' : v === 2 ? '🟡' : '🟢'

  return (
    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', margin: '8px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
        Portfolio health
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', width: 140, flexShrink: 0 }}>{item.label}</div>
            <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${(item.value / 3) * 100}%`, height: '100%', background: item.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ fontSize: 12, color: item.color, width: 50, textAlign: 'right', flexShrink: 0 }}>
              {statusIcon(item.value)} {statusLabel(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClaudeDesktopDemo() {
  const [active, setActive] = useState('jira-list')
  const scenario = scenarios.find(s => s.id === active)!

  return (
    <div className={styles.desktopDemo}>
      {/* Tab strip */}
      <div className={styles.desktopTabStrip}>
        {scenarios.map(s => (
          <button
            key={s.id}
            className={`${styles.desktopTab} ${active === s.id ? styles.desktopTabActive : ''}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Window chrome */}
      <div className={styles.desktopBar}>
        <span className={styles.warpDot} style={{ background: '#FF5F56' }} />
        <span className={styles.warpDot} style={{ background: '#FFBD2E' }} />
        <span className={styles.warpDot} style={{ background: '#27C93F' }} />
        <span className={styles.desktopTitle}>Claude — {scenario.label}</span>
        <span className={styles.desktopSkillPills}>
          <span className={styles.desktopSkillPill}>✍ Writing Skills</span>
          <span className={styles.desktopSkillPill}>🔬 Deep Research</span>
          <span className={styles.desktopSkillPill}>📊 CSV Summarizer</span>
        </span>
      </div>

      {/* Chat body */}
      <div className={styles.desktopBody}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {scenario.description}
        </div>

        {scenario.steps.map((step, i) => {
          if (step.type === 'user') {
            return (
              <div key={i} className={styles.desktopUserMsg}>
                <div className={styles.desktopUserBubble}>{step.content}</div>
              </div>
            )
          }

          if (step.type === 'tool-call') {
            return (
              <div key={i} className={styles.desktopToolCall}>
                <span className={styles.desktopToolIcon}>⚙</span>
                <span className={styles.desktopToolName}>{step.toolName}</span>
                <span className={styles.desktopToolQuery}>{step.content}</span>
              </div>
            )
          }

          if (step.type === 'cowork') {
            return (
              <div key={i} className={styles.desktopCowork}>
                <span className={styles.desktopCoworkIcon}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                </span>
                <span className={styles.desktopCoworkText}>{step.content}</span>
              </div>
            )
          }

          if (step.type === 'artifact') {
            return (
              <div key={i} className={styles.desktopArtifact}>
                <div className={styles.desktopArtifactHeader}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  {step.artifactTitle}
                </div>
                <pre className={styles.desktopArtifactBody}>{step.content}</pre>
              </div>
            )
          }

          if (step.type === 'chart' && step.chartData) {
            return (
              <div key={i} className={styles.desktopClaudeMsg}>
                <div className={styles.desktopClaudeAvatar}>C</div>
                <div className={styles.desktopClaudeBubble}>
                  <HealthBar data={step.chartData} />
                </div>
              </div>
            )
          }

          // claude type
          return (
            <div key={i} className={styles.desktopClaudeMsg}>
              <div className={styles.desktopClaudeAvatar}>C</div>
              <div className={styles.desktopClaudeBubble}>
                <pre className={styles.desktopClaudeText}>{step.content}</pre>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className={styles.desktopInput}>
        <input className={styles.desktopInputField} placeholder="Ask Claude anything about your projects..." readOnly />
        <button className={styles.desktopSendBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
