'use client'

import type { Role } from '@/data/content'
import { PageHeader, SectionHeading, InsightBox, Warning } from '../UI'
import { WarpDemo } from './WarpDemo'
import { ClaudeDesktopDemo } from './ClaudeDesktopDemo'
import styles from './Pages.module.css'

interface Props { role: Role }

export function ToolsPage({ role }: Props) {
  const isIM = role === 'im'

  return (
    <div className={styles.page}>
      <PageHeader
        badge="Tools"
        badgeColor={isIM ? 'purple' : 'teal'}
        title={isIM ? "Claude and Microsoft Copilot" : "Your AI tool stack"}
        subtitle={isIM
          ? "Claude is your primary tool. Microsoft Copilot is a useful supplement when you're already inside Outlook, Teams, or Word."
          : "Three tools, each for a different context. Warp + Claude Code together is the most powerful setup for active development."}
      />

      {isIM ? <IMTools /> : <TSSTools />}
    </div>
  )
}

function IMTools() {
  return (
    <>
      <div className={styles.toolGrid}>
        <div className={`${styles.toolCard} ${styles.toolCardFeatured} ${styles.toolFeaturedIm}`}>
          <div className={styles.toolName}>Claude</div>
          <div className={styles.toolRole} style={{ color: 'var(--purple)' }}>Primary tool</div>
          <div className={styles.toolDesc}>Anything requiring nuance, extended context, or quality writing. Client emails, tickets, risk comms, status narratives, documentation.</div>
        </div>
        <div className={`${styles.toolCard} ${styles.toolCardFeatured} ${styles.toolFeaturedIm}`}>
          <div className={styles.toolName}>Claude Cowork</div>
          <div className={styles.toolRole} style={{ color: 'var(--purple)' }}>Desktop automation</div>
          <div className={styles.toolDesc}>Automates multi-step tasks across your files and apps — reads Confluence, creates Jira tickets, drafts and saves documents, all in sequence.</div>
        </div>
        <div className={styles.toolCard}>
          <div className={styles.toolName}>Microsoft Copilot</div>
          <div className={styles.toolRole} style={{ color: 'var(--text3)' }}>Supplementary</div>
          <div className={styles.toolDesc}>Quick email drafts in Outlook, Teams meeting summaries, Word section rewrites, Excel formulas — use when already inside a Microsoft app.</div>
        </div>
      </div>

      <SectionHeading>Claude in action — IM workflows</SectionHeading>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.6 }}>
        Switch between scenarios to see how Claude handles real IM tasks: pulling Jira tickets, drafting status updates with Writing Skills + Deep Research active, building portfolio health charts, and running Cowork to automate multi-step workflows.
      </p>

      <ClaudeDesktopDemo />

      <SectionHeading>The practical rule</SectionHeading>
      <InsightBox color="purple">
        <strong>Use Claude when you need depth and control.</strong> Use Copilot when you're already in a Microsoft app and need something fast. Use Cowork when you have a multi-step task that involves reading and writing across several tools at once.
      </InsightBox>

      <SectionHeading>Copilot — where to find it</SectionHeading>
      <div className={styles.toolGrid}>
        {[
          { app: 'Outlook', desc: 'Copilot button in the compose window — drafts, rewrites, summarizes threads' },
          { app: 'Teams', desc: 'Copilot button top-right of any chat — meeting summaries, message drafts' },
          { app: 'Word', desc: 'Copilot in the ribbon — draft sections, rewrite, summarize long docs' },
          { app: 'Excel', desc: 'Copilot in the ribbon — formulas, data summaries, trend highlights' },
          { app: 'copilot.microsoft.com', desc: 'Standalone chat — similar to Claude but integrated with your M365 data' },
        ].map(item => (
          <div key={item.app} className={styles.toolCard}>
            <div className={styles.toolName}>{item.app}</div>
            <div className={styles.toolDesc} style={{ marginTop: 6 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}

function TSSTools() {
  return (
    <>
      <div className={styles.toolGrid}>
        <div className={`${styles.toolCard} ${styles.toolCardFeatured} ${styles.toolFeaturedTss}`}>
          <div className={styles.toolName}>Claude app</div>
          <div className={styles.toolRole} style={{ color: 'var(--teal)' }}>Primary — writing & reasoning</div>
          <div className={styles.toolDesc}>PRs, change notes, client comms, implementation planning, data analysis — anything needing extended back-and-forth.</div>
        </div>
        <div className={`${styles.toolCard} ${styles.toolCardFeatured} ${styles.toolFeaturedTss}`}>
          <div className={styles.toolName}>Warp + Claude Code</div>
          <div className={styles.toolRole} style={{ color: 'var(--teal)' }}>Primary — terminal & code</div>
          <div className={styles.toolDesc}>Repo navigation, multi-file edits, kubectl, git ops, debugging in context. Use Sonnet 4.5 / 4.6 for extended thinking.</div>
        </div>
        <div className={styles.toolCard}>
          <div className={styles.toolName}>GitHub Copilot</div>
          <div className={styles.toolRole} style={{ color: 'var(--text3)' }}>Supplementary — in-editor</div>
          <div className={styles.toolDesc}>Inline autocomplete in VS Code. Less useful for reasoning but fast for boilerplate and repetitive patterns.</div>
        </div>
        <div className={styles.toolCard}>
          <div className={styles.toolName}>Microsoft Copilot</div>
          <div className={styles.toolRole} style={{ color: 'var(--text3)' }}>Supplementary — M365</div>
          <div className={styles.toolDesc}>Outlook drafts, Teams meeting recaps, Excel formulas — when you're already inside a Microsoft app.</div>
        </div>
      </div>

      <SectionHeading>Warp in action</SectionHeading>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 4, lineHeight: 1.6 }}>
        Warp has Claude built in natively. Press <code>Cmd+I</code> anywhere to ask a question, get a command suggestion, or run Claude Code for full repo access. Switch between scenarios to see how it works.
      </p>

      <Warning><strong>Always use Agent mode, not Auto.</strong> Agent mode suggests commands and explains them — you approve before anything runs. Auto mode executes without asking, which is a risk in production environments.</Warning>

      <WarpDemo />

      <SectionHeading>Skills in Warp</SectionHeading>
      <InsightBox color="teal">
        <strong>Skills work in Warp automatically.</strong> Warp scans <code>.claude/skills/</code>, <code>.warp/skills/</code>, and <code>.agents/skills/</code> — the same directories as Claude Code. Commit skills to a repo once and they're active in Warp, Claude Code, and the app with zero extra setup.
      </InsightBox>
    </>
  )
}
