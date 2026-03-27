'use client'

import type { Role } from '@/data/content'
import { skills } from '@/data/content'
import { PageHeader, SectionHeading, InsightBox, Step, PromptBlock } from '../UI'
import styles from './Pages.module.css'

interface Props { role: Role }

const priorityLabel: Record<string, string> = {
  'always-on': '★ Install first',
  'install-second': 'Install second',
  'per-project': 'Per-project',
  'when-needed': 'When needed',
}

export function SkillsPage({ role }: Props) {
  const isIM = role === 'im'

  const mySkills = skills.filter(s => s.roles.includes(role))
  const alwaysOn = mySkills.filter(s => s.priority === 'always-on' || s.priority === 'install-second' || s.priority === 'when-needed')
  const perProject = mySkills.filter(s => s.priority === 'per-project')

  return (
    <div className={styles.page}>
      <PageHeader
        badge="Skills"
        badgeColor={isIM ? 'purple' : 'teal'}
        title="Claude skills"
        subtitle="Skills are instruction files that teach Claude specialized behaviors. Once installed, they activate automatically in every conversation — no extra prompting needed."
      />

      <InsightBox color={isIM ? 'purple' : 'teal'}>
        <strong>The combination effect:</strong> With multiple skills active, a single conversation layers their behaviors automatically. Writing Skills + Deep Research means Claude researches systematically {isIM ? 'and writes the output cleanly for your client — one conversation, done.' : 'and writes the output in tight, direct prose — no extra prompting.'}
      </InsightBox>

      {isIM ? (
        <>
          <SectionHeading>Install in the Claude app UI</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            <Step num={1} color="purple" title="Go to claude.ai Settings" description="Click your profile icon (bottom-left) → Settings → Skills" />
            <Step num={2} color="purple" title="Download the SKILL.md file" description="Right-click the Download link below → Save Link As → save anywhere on your machine" />
            <Step num={3} color="purple" title="Upload and enable" description="Click Add skill → upload the file → toggle it on → save. Active in all new conversations immediately." />
          </div>

          <div className={styles.skillGrid}>
            {mySkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} labelColor="purple" />
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionHeading>Always-on skills — install in the Claude app UI</SectionHeading>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.6 }}>
            These apply to every conversation in claude.ai and Warp — install once, active everywhere.
          </p>
          <div className={styles.skillGrid}>
            {alwaysOn.map(skill => (
              <SkillCard key={skill.id} skill={skill} labelColor="teal" />
            ))}
          </div>

          {perProject.length > 0 && (
            <>
              <SectionHeading>Per-project skills — commit to your repo</SectionHeading>
              <InsightBox color="teal">
                <strong>Warp reads these automatically.</strong> Skills committed to <code>.claude/skills/</code> in a repo are picked up by Warp, Claude Code in VS Code, and the Claude app — no extra setup. Commit once, the whole team gets them.
              </InsightBox>
              <div className={styles.skillGrid}>
                {perProject.map(skill => (
                  <SkillCard key={skill.id} skill={skill} labelColor="teal" />
                ))}
              </div>

              <SectionHeading>Repo-level install (Mac & WSL)</SectionHeading>
              <PromptBlock
                label="Terminal"
                text={`mkdir -p .claude/skills\n\n# Example: install systematic-debugging\ncurl -o .claude/skills/systematic-debugging.md \\\n  https://raw.githubusercontent.com/obra/superpowers/main/skills/systematic-debugging/SKILL.md\n\ngit add .claude/skills/\ngit commit -m "Add Claude skill: systematic-debugging"\ngit push`}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

function SkillCard({ skill, labelColor }: { skill: typeof skills[0]; labelColor: 'purple' | 'teal' }) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.skillPriority} style={{ color: skill.priority === 'always-on' || skill.priority === 'install-second' ? 'var(--amber)' : 'var(--text3)' }}>
        {(skill.priority === 'always-on' || skill.priority === 'install-second') && <span className={styles.priorityStar}>★</span>}
        {priorityLabel[skill.priority]}
      </div>
      <div className={styles.skillTitle}>{skill.name}</div>
      <div className={styles.skillDesc}>{skill.description}</div>
      <div className={styles.skillBestFor}>Best for: {skill.bestFor}</div>
      <div className={styles.skillActions}>
        <a href={skill.downloadUrl} target="_blank" rel="noopener noreferrer" className={`${styles.skillBtn} ${styles.skillBtnPrimary}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </a>
        <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.skillBtn}>
          GitHub →
        </a>
      </div>
    </div>
  )
}
