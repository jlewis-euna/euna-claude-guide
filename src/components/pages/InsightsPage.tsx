'use client'

import { PageHeader, SectionHeading, InsightBox, PromptBlock } from '../UI'
import { WarpDemo } from './WarpDemo'
import styles from './Pages.module.css'

export function InsightsPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        badge="Claude Code"
        badgeColor="teal"
        title="/insights — understand your habits"
        subtitle="A built-in Claude Code command that analyzes your past month of sessions and generates a detailed HTML report — written by Claude, about how you use Claude."
      />

      <InsightBox color="teal">
        <strong>Genuinely useful.</strong> Users consistently report it calls them out in specific ways: "you type this exact prompt 4 times a day — make it a slash command" or "you're abandoning sessions before getting concrete results." The suggestions include copy-pasteable skill files generated from your actual usage, not generic advice.
      </InsightBox>

      <SectionHeading>How to run it</SectionHeading>
      <PromptBlock label="Terminal command" text="claude /insights" />
      <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
        Claude processes your session history and outputs a link to a <code>report.html</code> file. If the command fails, exit Claude Code with <code>Ctrl+C</code>, reopen it, and try again — you may need a version update.
      </p>

      <SectionHeading>What the report looks like</SectionHeading>
      <div className={styles.insightReport}>
        <div className={styles.insightReportHeader}>
          <div className={styles.insightReportTitle}>report.html · Generated March 24, 2026</div>
          <div className={styles.insightReportH}>Your Claude Code usage — last 30 days</div>
          <div className={styles.insightReportMeta}>42 sessions · 8 projects · 1,240 messages</div>
        </div>
        <div className={styles.insightReportBody}>
          <div className={styles.insightSection}>
            <div className={styles.insightSectionLabel} style={{ color: 'var(--teal)' }}>What&apos;s working</div>
            <div className={styles.insightSectionText}>
              You have a strong habit of pasting full stack traces before asking for help — Claude can give specific answers rather than generic guidance. Your debugging sessions are consistently well-structured.
            </div>
          </div>
          <div className={styles.insightSection}>
            <div className={styles.insightSectionLabel} style={{ color: 'var(--amber)' }}>What&apos;s hindering you</div>
            <div className={styles.insightSectionText}>
              <strong>Claude&apos;s side:</strong> Occasionally misidentifies the failing layer in multi-service errors.<br /><br />
              <strong>Your side:</strong> You type nearly the same prompt for PR descriptions in 8 different sessions. This should be a custom slash command.
            </div>
          </div>
          <div className={styles.insightSection}>
            <div className={styles.insightSectionLabel} style={{ color: 'var(--purple)' }}>Quick wins to try</div>
            <div className={styles.insightSectionText}>
              Create a <code>/pr-description</code> skill — here&apos;s a copy-pasteable SKILL.md based on your actual prompt pattern. Also consider adding the Systematic Debugging skill; you&apos;d benefit from structured hypothesis tracking.
            </div>
          </div>
          <div className={styles.insightSection}>
            <div className={styles.insightSectionLabel} style={{ color: 'var(--text3)' }}>Memorable moment</div>
            <div className={styles.insightSectionText}>
              You asked Claude to explain the entire Datacap integration while muttering &quot;this codebase is a crime scene&quot; in the prompt. Claude agreed, and helped you add 14 missing error handlers in one session.
            </div>
          </div>
        </div>
      </div>

      <SectionHeading>Running /insights in Warp</SectionHeading>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.6 }}>
        You can run <code>/insights</code> directly inside a Warp terminal session where Claude Code is active. The &quot;Claude Code in Warp&quot; tab shows what this looks like in practice.
      </p>

      <WarpDemo />

      <SectionHeading>When to run it</SectionHeading>
      <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>
        Run <code>/insights</code> monthly or at natural breakpoints — after finishing a major feature, wrapping up a client implementation, or after a round of PRs. Running it too frequently surfaces the same patterns before you&apos;ve had time to change habits. The report gets more useful as your habits evolve.
      </p>
    </div>
  )
}
