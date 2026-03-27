'use client'

import type { Role } from '@/data/content'
import type { Page } from '../ClientApp'
import { PageHeader, SectionHeading, Prose, InsightBox, Step, Warning, PromptBlock } from '../UI'
import { ClaudeDesktopDemo } from './ClaudeDesktopDemo'
import { WarpDemo } from './WarpDemo'
import styles from './Pages.module.css'

interface Props { role: Role; onNavigate: (p: Page) => void }

export function GettingStartedPage({ role, onNavigate }: Props) {
  const isIM = role === 'im'

  return (
    <div className={styles.page}>
      <PageHeader
        badge={isIM ? 'Implementation Manager' : 'Solutions Engineer'}
        badgeColor={isIM ? 'purple' : 'teal'}
        title="Getting started with Claude"
        subtitle={isIM
          ? "Everything works in the Claude app at claude.ai — no installation, no code required."
          : "You have three ways to use Claude: the app for reasoning and writing, Claude Code in your terminal for repo work, and Warp for AI-native terminal sessions."}
      />

      <InsightBox color={isIM ? 'purple' : 'teal'}>
        <strong>One habit that makes a big difference:</strong> Start every conversation with a short context sentence.
        Claude doesn't remember previous sessions — a quick intro immediately improves output quality.{' '}
        <button
          onClick={() => onNavigate('prompts')}
          style={{ color: isIM ? 'var(--purple-t)' : 'var(--teal-t)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 'inherit' }}
        >
          Open the prompt builder →
        </button>
      </InsightBox>

      <PromptBlock
        label="Your context starter"
        text={isIM
          ? "I'm an Implementation Manager at Euna Solutions. I'm working on [client name], a [kiosk / web / cashiering] implementation currently in [phase]. Keep responses professional and concise."
          : "I'm a solutions engineer at Euna Solutions. I'm working on [project/client]. The stack is [tech stack]. Keep responses technical and concise. Ask me if you need more context before answering."}
      />

      {isIM ? <IMContent onNavigate={onNavigate} /> : <TSSContent onNavigate={onNavigate} />}
    </div>
  )
}

function IMContent({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <>
      <SectionHeading>How to access Claude</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Step num={1} color="purple" title="Go to claude.ai" description="Sign in with your Euna work email — no additional setup needed." />
        <Step num={2} color="purple" title="Install your skills" description={<>Go to Settings → Skills → Add skill. Start with <strong>Writing Skills</strong> first — it improves everything you write. <button onClick={() => onNavigate('skills')} style={{ color: 'var(--purple-t)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>See the skills guide →</button></>} />
        <Step num={3} color="purple" title="Start your first session" description="Paste the context starter above, then describe what you need. Claude will ask if it needs more info." />
      </div>

      <InsightBox color="purple">
        <strong>Claude Cowork</strong> is a desktop tool that lets Claude work autonomously across your files and apps — reading Confluence pages, creating Jira tickets, drafting documents, and saving outputs, all in sequence without you switching tabs. It's available from the Claude desktop app.
      </InsightBox>

      <SectionHeading>See it in action</SectionHeading>
      <ClaudeDesktopDemo />

      <SectionHeading>What you'll use Claude for</SectionHeading>
      <div className={styles.quickLinks}>
        {[
          { label: 'Project health & RAG statuses', page: 'use-cases' as Page },
          { label: 'Pre-call agendas & follow-ups', page: 'use-cases' as Page },
          { label: 'Proactive risk emails', page: 'prompts' as Page },
          { label: 'Jira tickets from call notes', page: 'prompts' as Page },
          { label: 'Weekly Teams channel updates', page: 'prompts' as Page },
          { label: 'UAT readiness checklists', page: 'prompts' as Page },
        ].map(item => (
          <button key={item.label} className={styles.quickLink} onClick={() => onNavigate(item.page)}>
            {item.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        ))}
      </div>
    </>
  )
}

function TSSContent({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <>
      <SectionHeading>Warp setup (recommended terminal)</SectionHeading>
      <Prose>Warp has Claude built in natively and is the recommended terminal for all SE work.</Prose>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Step num={1} color="teal" title="Download Warp from warp.dev" description="Available for Mac and Windows." />
        <Step num={2} color="teal" title="Set model to Claude Sonnet 4.5 or 4.6" description="Warp Settings → AI → Model. These use extended thinking — better command suggestions and multi-step reasoning." />
        <Step num={3} color="teal" title="Set mode to Agent (not Auto)" description="Warp Settings → AI → Mode → Agent. Agent suggests commands you approve. Auto runs them without asking." />
        <Step num={4} color="teal" title="Windows only: set Ubuntu WSL as default shell" description={<>Settings → Features → Session → Default shell → Ubuntu (WSL). Run <code>wsl --install -d Ubuntu</code> in PowerShell if Ubuntu isn't listed, then restart.</>} />
      </div>

      <Warning><strong>Never use Auto mode</strong> in production environments. Always stay on Agent mode.</Warning>

      <SectionHeading>See it in action</SectionHeading>
      <WarpDemo />

      <SectionHeading>Claude Code in VS Code</SectionHeading>
      <PromptBlock label="Install" text={`npm install -g @anthropic-ai/claude-code\n\n# Start from your repo root\ncd ~/path/to/your/euna-repo\nclaude`} />

      <SectionHeading>What you'll use Claude for</SectionHeading>
      <div className={styles.quickLinks}>
        {[
          { label: 'Error triage & root cause tracing', page: 'use-cases' as Page },
          { label: 'Implementation planning', page: 'prompts' as Page },
          { label: 'PR descriptions & change notes', page: 'prompts' as Page },
          { label: 'Skills for your repos', page: 'skills' as Page },
          { label: '/insights command', page: 'insights' as Page },
        ].map(item => (
          <button key={item.label} className={styles.quickLink} onClick={() => onNavigate(item.page)}>
            {item.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        ))}
      </div>
    </>
  )
}
