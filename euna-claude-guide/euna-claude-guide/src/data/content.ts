export type Role = 'im' | 'tss'

export interface Prompt {
  id: string
  label: string
  description: string
  fields: PromptField[]
  template: string
  category: string
}

export interface PromptField {
  key: string
  label: string
  placeholder: string
  type: 'text' | 'select'
  options?: string[]
}

export interface Skill {
  id: string
  name: string
  description: string
  bestFor: string
  priority: 'always-on' | 'install-second' | 'per-project' | 'when-needed'
  downloadUrl: string
  sourceUrl: string
  roles: Role[]
}

export interface UseCase {
  id: string
  title: string
  description: string
  frequency: 'daily' | 'weekly' | 'as-needed'
  roles: Role[]
  category: string
}

export interface ChecklistItem {
  id: string
  role: Role
  category: string
  title: string
  description: string
}

// ─── PROMPTS ───────────────────────────────────────────────────────────────

export const prompts: Prompt[] = [
  // IM prompts
  {
    id: 'im-context-starter',
    label: 'Session context starter',
    description: 'Paste this at the start of every Claude conversation for better results',
    category: 'Getting started',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'type', label: 'Implementation type', placeholder: '', type: 'select', options: ['kiosk', 'web', 'cashiering', 'kiosk + web', 'web + cashiering'] },
      { key: 'phase', label: 'Current phase', placeholder: '', type: 'select', options: ['kickoff', 'discovery', 'build', 'UAT', 'go-live', 'stabilization'] },
    ],
    template: `I'm an Implementation Manager at Euna Solutions. I'm working on {{client}}, a {{type}} implementation currently in {{phase}}. Keep responses professional and concise.`,
  },
  {
    id: 'im-rag-status',
    label: 'Health status narrative (RAG)',
    description: 'Consistent health status write-up for any project',
    category: 'Project health',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'status', label: 'Health status', placeholder: '', type: 'select', options: ['Green', 'Amber', 'Red'] },
      { key: 'reason', label: 'Reason for status', placeholder: 'Go-live at risk due to delayed API credentials', type: 'text' },
      { key: 'deadline', label: 'Hard deadline', placeholder: 'April 15', type: 'text' },
      { key: 'mitigation', label: 'Mitigation taken', placeholder: 'Escalation email sent April 2, follow-up April 9', type: 'text' },
    ],
    template: `Write a project health narrative for {{client}}.
Health status: {{status}}.
Reason: {{reason}}.
Hard deadline: {{deadline}}.
Mitigation: {{mitigation}}.
Keep it concise and professional — suitable for internal reporting.`,
  },
  {
    id: 'im-budget-note',
    label: 'Budget status note',
    description: 'Narrative to accompany budget numbers in project tracking',
    category: 'Project health',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'bac', label: 'BAC (budget at completion)', placeholder: '$45,000', type: 'text' },
      { key: 'hours', label: 'Hours entered to date', placeholder: '120', type: 'text' },
      { key: 'etc', label: 'ETC (hours remaining)', placeholder: '40', type: 'text' },
      { key: 'tracking', label: 'Tracking', placeholder: '', type: 'select', options: ['on budget', 'over budget', 'under budget'] },
      { key: 'driver', label: 'Main driver', placeholder: 'Additional UAT cycles due to scope change', type: 'text' },
    ],
    template: `Write a budget status note for {{client}}.
BAC: {{bac}}. Hours entered to date: {{hours}}. ETC: {{etc}} hours remaining.
We're currently tracking {{tracking}}.
Main driver: {{driver}}.`,
  },
  {
    id: 'im-pre-call-agenda',
    label: 'Pre-call agenda',
    description: 'Structured agenda to send 24 hours before a status call',
    category: 'Status calls',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'datetime', label: 'Call date & time', placeholder: 'Thursday April 10 at 2pm CT', type: 'text' },
      { key: 'duration', label: 'Duration', placeholder: '', type: 'select', options: ['30 minutes', '45 minutes', '60 minutes'] },
      { key: 'open_items', label: 'Open items to discuss', placeholder: 'API credentials, UAT schedule, go-live date confirmation', type: 'text' },
      { key: 'risks', label: 'Risks to surface', placeholder: 'Go-live date at risk if credentials not received by April 11', type: 'text' },
    ],
    template: `Write a status call agenda for {{client}} for {{datetime}}.
Duration: {{duration}}.
Open items: {{open_items}}.
Risks to surface: {{risks}}.
Format for sending to client 24 hours in advance.`,
  },
  {
    id: 'im-post-call-followup',
    label: 'Post-call follow-up email',
    description: 'Clean follow-up with decisions and action items — send within 24 hours',
    category: 'Status calls',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'decisions', label: 'Decisions made', placeholder: 'Go-live confirmed for May 1, UAT window set for April 14-18', type: 'text' },
      { key: 'action_items', label: 'Action items (one per line)', placeholder: 'Client to send API credentials by April 11 — owner: IT lead\nOur team to complete config by April 12 — owner: SE', type: 'text' },
      { key: 'open_questions', label: 'Open questions', placeholder: 'Who approves UAT sign-off on their side?', type: 'text' },
    ],
    template: `Write a post-call follow-up email for {{client}} after today's status call.
Decisions made: {{decisions}}.
Action items:
{{action_items}}
Open questions: {{open_questions}}.
Tone: professional, friendly. Note that follow-up is sent within 24 hours.`,
  },
  {
    id: 'im-risk-email',
    label: 'Proactive risk email',
    description: 'Communicate a timeline risk to a client before it becomes a problem',
    category: 'Risk & escalation',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'risk', label: 'What the risk is', placeholder: 'Go-live may need to move from May 1 to May 15', type: 'text' },
      { key: 'dependency', label: 'What we need from them', placeholder: 'API credentials', type: 'text' },
      { key: 'deadline', label: 'Deadline for that deliverable', placeholder: 'April 11', type: 'text' },
    ],
    template: `Write a proactive risk email to {{client}}.
Risk: {{risk}} if we don't receive {{dependency}} by {{deadline}}.
I want to be direct about the dependency without it feeling like a threat.
Tone: professional, solution-focused. Include a clear ask and deadline.`,
  },
  {
    id: 'im-escalation-ticket',
    label: 'Escalation ticket',
    description: 'Clear, prioritized escalation for hardware, in-person, or platform teams',
    category: 'Risk & escalation',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'issue', label: 'Describe the issue', placeholder: 'Kiosk intermittently failing to process card payments', type: 'text' },
      { key: 'frequency', label: 'How often', placeholder: 'Roughly 1 in 10 transactions', type: 'text' },
      { key: 'team', label: 'Team to escalate to', placeholder: '', type: 'select', options: ['hardware', 'in-person', 'platform', 'web'] },
      { key: 'impact', label: 'Impact', placeholder: 'UAT is blocked, go-live in 3 weeks', type: 'text' },
    ],
    template: `Write an escalation ticket for this issue:
{{client}} is reporting that their {{issue}}.
Frequency: {{frequency}}.
This needs to go to the {{team}} team.
Impact: {{impact}}.
Format: summary, description, urgency, recommended action.`,
  },
  {
    id: 'im-uat-checklist',
    label: 'UAT readiness checklist',
    description: 'Client-facing checklist of everything they need before UAT starts',
    category: 'UAT & client prep',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'uat_start', label: 'UAT start date', placeholder: 'April 14', type: 'text' },
      { key: 'scope', label: 'What they are testing', placeholder: 'Web checkout flow, payment confirmation emails', type: 'text' },
    ],
    template: `Write a UAT readiness checklist for {{client}}.
UAT start date: {{uat_start}}.
Scope: {{scope}}.
Include: who needs to be available, what access they need, what scenarios they'll test, how to log issues, and the sign-off process.
Keep it simple — the audience includes non-technical staff.`,
  },
  {
    id: 'im-teams-update',
    label: 'Weekly Teams status post',
    description: 'Consistent weekly update for every open project in the Teams channel',
    category: 'Teams channel',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'week', label: 'Week of', placeholder: 'April 7', type: 'text' },
      { key: 'completed', label: 'Completed this week', placeholder: 'Kickoff call, received API specs from client', type: 'text' },
      { key: 'in_progress', label: 'In progress', placeholder: 'SE working on initial configuration', type: 'text' },
      { key: 'upcoming', label: 'Upcoming', placeholder: 'Configuration review call Thursday', type: 'text' },
      { key: 'risks', label: 'Risks or blockers', placeholder: 'Waiting on client to confirm go-live date', type: 'text' },
      { key: 'overall_status', label: 'Overall status', placeholder: '', type: 'select', options: ['Green', 'Amber', 'Red'] },
    ],
    template: `Write a weekly Teams channel status update for {{client}}.
Week of: {{week}}.
Completed this week: {{completed}}.
In progress: {{in_progress}}.
Upcoming: {{upcoming}}.
Risks or blockers: {{risks}}.
Overall status: {{overall_status}}.`,
  },
  {
    id: 'im-batch-tickets',
    label: 'Batch Jira tickets from call notes',
    description: 'Write multiple tickets at once from issues raised on a call',
    category: 'Tickets',
    fields: [
      { key: 'client', label: 'Client name', placeholder: 'City of Springfield', type: 'text' },
      { key: 'issue1', label: 'Issue 1', placeholder: 'Receipt template needs client logo and transaction ID', type: 'text' },
      { key: 'issue2', label: 'Issue 2', placeholder: 'Payment confirmation email not sending in UAT', type: 'text' },
      { key: 'issue3', label: 'Issue 3 (optional)', placeholder: '', type: 'text' },
    ],
    template: `Write Jira tickets for these issues raised on today's call with {{client}}:
1. {{issue1}}
2. {{issue2}}
{{issue3}}
Format each with: summary, description, and acceptance criteria.`,
  },
  // TSS prompts
  {
    id: 'tss-context-starter',
    label: 'Session context starter',
    description: 'Front-load context for technical sessions',
    category: 'Getting started',
    fields: [
      { key: 'project', label: 'Project or client', placeholder: 'City of Springfield / payment webhook', type: 'text' },
      { key: 'stack', label: 'Tech stack', placeholder: 'Ruby on Rails, Postgres, k8s', type: 'text' },
    ],
    template: `I'm a solutions engineer at Euna Solutions. I'm working on {{project}}.
The stack is {{stack}}. Keep responses technical and concise.
Ask me if you need more context before answering.`,
  },
  {
    id: 'tss-error-triage',
    label: 'Error triage',
    description: 'Paste a stack trace and code — get root cause and ranked fixes',
    category: 'Debugging',
    fields: [
      { key: 'error', label: 'Full error + stack trace', placeholder: 'Paste the complete error output here', type: 'text' },
      { key: 'code', label: 'Relevant code', placeholder: 'Paste the function or file where it occurs', type: 'text' },
    ],
    template: `Here's the error I'm seeing:
{{error}}

The relevant code is:
{{code}}

What's the root cause and what should I try first?`,
  },
  {
    id: 'tss-root-cause',
    label: 'Root cause tracing',
    description: "Bug keeps coming back? Trace upstream to where it actually originates",
    category: 'Debugging',
    fields: [
      { key: 'pattern', label: 'Describe the pattern', placeholder: "The fix keeps reverting or the same bug surfaces elsewhere", type: 'text' },
      { key: 'code', label: 'Relevant code', placeholder: 'Paste the relevant code', type: 'text' },
    ],
    template: `This bug keeps coming back. Help me trace the root cause rather than patching symptoms.
Here's what's happening: {{pattern}}
Relevant code:
{{code}}`,
  },
  {
    id: 'tss-code-review',
    label: 'Code review',
    description: 'Find bugs, edge cases, and anything that could fail under load',
    category: 'Code',
    fields: [
      { key: 'code', label: 'Code to review', placeholder: 'Paste the function or file to review', type: 'text' },
    ],
    template: `Review this code for bugs, edge cases, and anything that could fail under load or unexpected input:
{{code}}`,
  },
  {
    id: 'tss-implementation-plan',
    label: 'Implementation plan',
    description: 'Get a step-by-step approach with edge cases before writing any code',
    category: 'Planning',
    fields: [
      { key: 'what', label: 'What you need to build', placeholder: 'Payment webhook handler for Datacap integration', type: 'text' },
      { key: 'stack', label: 'Tech stack', placeholder: 'Ruby on Rails, Postgres', type: 'text' },
      { key: 'constraints', label: 'Known constraints', placeholder: 'Must be idempotent, needs to handle duplicate events', type: 'text' },
    ],
    template: `I need to implement {{what}} using {{stack}}.
Known constraints: {{constraints}}.
Walk me through an approach before I start coding — flag any gotchas or edge cases I should plan for.`,
  },
  {
    id: 'tss-three-approaches',
    label: '3 approaches with tradeoffs',
    description: "Ask for options instead of one answer — faster decision-making",
    category: 'Planning',
    fields: [
      { key: 'problem', label: 'The problem or decision', placeholder: 'How to handle retry logic for the payment webhook', type: 'text' },
      { key: 'constraints', label: 'Your constraints', placeholder: 'Must not cause duplicate charges, latency matters', type: 'text' },
    ],
    template: `Give me 3 different approaches to {{problem}} with the tradeoffs of each.
Constraints: {{constraints}}.
I'll decide which fits best — just surface the options clearly.`,
  },
  {
    id: 'tss-pr-description',
    label: 'PR description',
    description: 'Paste your diff or change summary → clean PR description',
    category: 'Shipping',
    fields: [
      { key: 'changes', label: 'What changed (diff or summary)', placeholder: 'Added idempotency key to payment webhook handler, updated tests', type: 'text' },
      { key: 'why', label: 'Why it changed', placeholder: 'Prevent duplicate charge processing on retry', type: 'text' },
      { key: 'testing', label: 'How to test it', placeholder: 'Run rake spec:webhooks, check logs for idempotency key header', type: 'text' },
      { key: 'deploy_notes', label: 'Deployment notes (optional)', placeholder: 'Needs DB migration before deploy', type: 'text' },
    ],
    template: `Write a PR description for these changes.
What changed: {{changes}}
Why: {{why}}
How to test: {{testing}}
Deployment notes: {{deploy_notes}}`,
  },
  {
    id: 'tss-change-notes-client',
    label: 'Change notes — client-facing',
    description: 'Turn technical changes into plain-language release notes for clients',
    category: 'Shipping',
    fields: [
      { key: 'changes', label: 'Raw changes or PR summary', placeholder: 'Fixed race condition in payment webhook, added retry logic, updated confirmation email template', type: 'text' },
    ],
    template: `Rewrite these changes as release notes for a non-technical client.
Focus on what they'll experience differently, not how it was implemented:
{{changes}}`,
  },
  {
    id: 'tss-rubber-duck',
    label: "Rubber duck — I'm stuck",
    description: 'Explain the problem to Claude and let it surface what you might be missing',
    category: 'Debugging',
    fields: [
      { key: 'problem', label: "What you're stuck on", placeholder: "Why the webhook handler is randomly returning 500s", type: 'text' },
      { key: 'tried', label: "What you've tried", placeholder: 'Checked logs, added error handling, confirmed API credentials are valid', type: 'text' },
    ],
    template: `I'm trying to figure out why {{problem}}. Let me explain what I've tried:
{{tried}}
Help me think through what I might be missing — ask me questions if you need more context.`,
  },
]

// ─── SKILLS ────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    id: 'writing-skills',
    name: 'Writing Skills',
    description: 'Cleaner, more direct output on all written tasks. Eliminates filler phrases and passive voice.',
    bestFor: 'All written output — emails, PRs, docs, tickets',
    priority: 'always-on',
    downloadUrl: 'https://raw.githubusercontent.com/obra/superpowers/main/skills/writing-skills/SKILL.md',
    sourceUrl: 'https://github.com/obra/superpowers/tree/main/skills/writing-skills',
    roles: ['im', 'tss'],
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    description: 'Systematic approach to open-ended questions — decompose, verify, synthesize with citations.',
    bestFor: 'Client discovery, escalation prep, evaluating go-live readiness',
    priority: 'install-second',
    downloadUrl: 'https://raw.githubusercontent.com/sanjay3290/ai-skills/main/skills/deep-research/SKILL.md',
    sourceUrl: 'https://github.com/sanjay3290/ai-skills/tree/main/skills/deep-research',
    roles: ['im', 'tss'],
  },
  {
    id: 'csv-summarizer',
    name: 'CSV Data Summarizer',
    description: 'Auto-analyzes uploaded CSV files — stats, missing values, visualizations. No prompting needed.',
    bestFor: 'Budget reports, client data exports, project tracking data',
    priority: 'when-needed',
    downloadUrl: 'https://raw.githubusercontent.com/coffeefuelbump/csv-data-summarizer-claude-skill/main/SKILL.md',
    sourceUrl: 'https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill',
    roles: ['im', 'tss'],
  },
  {
    id: 'root-cause-tracing',
    name: 'Root Cause Tracing',
    description: 'Traces bugs upstream to their actual origin rather than patching symptoms.',
    bestFor: 'Complex bugs where the error and cause are in different parts of the system',
    priority: 'always-on',
    downloadUrl: 'https://raw.githubusercontent.com/obra/superpowers/main/skills/root-cause-tracing/SKILL.md',
    sourceUrl: 'https://github.com/obra/superpowers/tree/main/skills/root-cause-tracing',
    roles: ['tss'],
  },
  {
    id: 'systematic-debugging',
    name: 'Systematic Debugging',
    description: 'Hypothesis → test → validate debugging methodology. Narrates reasoning at each step.',
    bestFor: 'Any debugging session, especially intermittent issues',
    priority: 'always-on',
    downloadUrl: 'https://raw.githubusercontent.com/obra/superpowers/main/skills/systematic-debugging/SKILL.md',
    sourceUrl: 'https://github.com/obra/superpowers/blob/main/skills/systematic-debugging',
    roles: ['tss'],
  },
  {
    id: 'tdd',
    name: 'Test-Driven Development',
    description: 'Write failing test first, confirm intent, then implement. Eliminates retrofitting tests.',
    bestFor: 'Feature work and bug fixes where correctness matters',
    priority: 'per-project',
    downloadUrl: 'https://raw.githubusercontent.com/obra/superpowers/main/skills/test-driven-development/SKILL.md',
    sourceUrl: 'https://github.com/obra/superpowers/tree/main/skills/test-driven-development',
    roles: ['tss'],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Assistant',
    description: 'CTEs, EXPLAIN plans, index design, schema review — applied automatically.',
    bestFor: 'Any repo with Postgres — queries, schema, migrations, performance',
    priority: 'per-project',
    downloadUrl: 'https://raw.githubusercontent.com/sanjay3290/ai-skills/main/skills/postgres/SKILL.md',
    sourceUrl: 'https://github.com/sanjay3290/ai-skills/tree/main/skills/postgres',
    roles: ['tss'],
  },
  {
    id: 'web-artifacts',
    name: 'Web Artifacts Builder',
    description: 'Builds complete, self-contained HTML/CSS/JS from natural language descriptions.',
    bestFor: 'Prototyping client-facing demos and internal tools',
    priority: 'per-project',
    downloadUrl: 'https://raw.githubusercontent.com/anthropics/skills/main/skills/web-artifacts-builder/SKILL.md',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder',
    roles: ['tss'],
  },
]

// ─── CHECKLIST ─────────────────────────────────────────────────────────────

export const checklistItems: ChecklistItem[] = [
  // IM checklist
  { id: 'im-1', role: 'im', category: 'Setup', title: 'Sign in to claude.ai', description: 'Go to claude.ai and sign in with your work email' },
  { id: 'im-2', role: 'im', category: 'Setup', title: 'Install Writing Skills', description: 'Settings → Skills → Add skill → upload Writing Skills SKILL.md' },
  { id: 'im-3', role: 'im', category: 'Setup', title: 'Install Deep Research', description: 'Settings → Skills → Add skill → upload Deep Research SKILL.md' },
  { id: 'im-4', role: 'im', category: 'Setup', title: 'Install CSV Data Summarizer', description: 'Settings → Skills → Add skill → upload CSV Data Summarizer SKILL.md' },
  { id: 'im-5', role: 'im', category: 'First week', title: 'Use the context starter prompt', description: 'Start every session with a short context sentence about your client and phase' },
  { id: 'im-6', role: 'im', category: 'First week', title: 'Write a RAG status narrative', description: 'Use the Health Status prompt to write a consistent narrative for one project' },
  { id: 'im-7', role: 'im', category: 'First week', title: 'Write a post-call follow-up', description: 'After your next status call, use Claude to turn rough notes into a clean follow-up' },
  { id: 'im-8', role: 'im', category: 'First week', title: 'Generate a weekly Teams update', description: 'Use the Teams status post prompt for one open project' },
  { id: 'im-9', role: 'im', category: 'First week', title: 'Write a Jira ticket from a call', description: 'Use the batch tickets prompt after a client call' },
  { id: 'im-10', role: 'im', category: 'Going deeper', title: 'Draft a proactive risk email', description: 'Use Claude to frame a timeline risk for a client — compare it to what you would have written' },
  { id: 'im-11', role: 'im', category: 'Going deeper', title: 'Use Copilot in Outlook', description: 'Try the Copilot draft button next time you write an email in Outlook' },
  { id: 'im-12', role: 'im', category: 'Going deeper', title: 'Prep for a TSS check-in with Claude', description: 'Use the multi-project agenda prompt before your next weekly TSS meeting' },

  // TSS checklist
  { id: 'tss-1', role: 'tss', category: 'Setup', title: 'Install Writing Skills in the Claude app', description: 'claude.ai Settings → Skills → upload Writing Skills' },
  { id: 'tss-2', role: 'tss', category: 'Setup', title: 'Install Root Cause Tracing', description: 'claude.ai Settings → Skills → upload Root Cause Tracing' },
  { id: 'tss-3', role: 'tss', category: 'Setup', title: 'Install Systematic Debugging', description: 'claude.ai Settings → Skills → upload Systematic Debugging' },
  { id: 'tss-4', role: 'tss', category: 'Setup', title: 'Install Claude Code', description: 'Run: npm install -g @anthropic-ai/claude-code' },
  { id: 'tss-5', role: 'tss', category: 'Setup', title: 'Download & configure Warp', description: 'warp.dev → set model to Sonnet 4.5/4.6 → set mode to Agent (not Auto)' },
  { id: 'tss-6', role: 'tss', category: 'Setup (Windows only)', title: 'Set Ubuntu WSL as default shell in Warp', description: 'Settings → Features → Session → Default shell → Ubuntu (WSL)' },
  { id: 'tss-7', role: 'tss', category: 'First week', title: 'Debug a real error with Claude', description: 'Paste a stack trace and the relevant code — compare Claude\'s root cause analysis to what you found' },
  { id: 'tss-8', role: 'tss', category: 'First week', title: 'Run claude from a repo root', description: 'cd into an Euna repo and run claude — ask it to explain a file or find something' },
  { id: 'tss-9', role: 'tss', category: 'First week', title: 'Write a PR description with Claude', description: 'Paste your next diff and use the PR description prompt — edit and ship' },
  { id: 'tss-10', role: 'tss', category: 'First week', title: 'Commit a skill to a repo', description: 'mkdir -p .claude/skills && install one skill → commit it so the team gets it' },
  { id: 'tss-11', role: 'tss', category: 'Going deeper', title: 'Ask for 3 approaches on a design decision', description: 'Use the 3 approaches prompt instead of asking for a single answer' },
  { id: 'tss-12', role: 'tss', category: 'Going deeper', title: 'Run /insights after a project milestone', description: 'Run claude /insights — read the report and act on one suggestion' },
  { id: 'tss-13', role: 'tss', category: 'Going deeper', title: 'Use Warp + Claude Code together', description: 'Run claude inside a Warp terminal for a full session with Warp\'s UI on top' },
]

// ─── USE CASES ──────────────────────────────────────────────────────────────

export const useCases: UseCase[] = [
  { id: 'im-uc-1', title: 'Project timeline updates', description: 'Write consistent health status narratives for RAG ratings across all your projects.', frequency: 'daily', roles: ['im'], category: 'Project health' },
  { id: 'im-uc-2', title: 'Budget & ETC notes', description: 'Draft supporting narrative for TTFV, budget status, and ETC numbers.', frequency: 'weekly', roles: ['im'], category: 'Project health' },
  { id: 'im-uc-3', title: 'Pre-call agendas', description: 'Build structured agendas based on open items — send 24 hours prior.', frequency: 'weekly', roles: ['im'], category: 'Status calls' },
  { id: 'im-uc-4', title: 'Post-call follow-ups', description: 'Turn rough notes into clean follow-ups with decisions and action items.', frequency: 'weekly', roles: ['im'], category: 'Status calls' },
  { id: 'im-uc-5', title: 'Proactive risk emails', description: 'Communicate timeline risks to clients before they become problems.', frequency: 'as-needed', roles: ['im'], category: 'Risk & escalation' },
  { id: 'im-uc-6', title: 'Escalation tickets', description: 'Write clear, prioritized escalations for hardware, in-person, and platform teams.', frequency: 'as-needed', roles: ['im'], category: 'Risk & escalation' },
  { id: 'im-uc-7', title: 'UAT readiness checklists', description: 'Generate client-facing checklists of everything they need before UAT starts.', frequency: 'as-needed', roles: ['im'], category: 'UAT & client prep' },
  { id: 'im-uc-8', title: 'UAT kick-off emails', description: 'Draft kick-off emails with instructions for client testers.', frequency: 'as-needed', roles: ['im'], category: 'UAT & client prep' },
  { id: 'im-uc-9', title: 'Weekly Teams channel posts', description: 'Consistent weekly project updates for every open project.', frequency: 'weekly', roles: ['im'], category: 'Teams channel' },
  { id: 'im-uc-10', title: 'Batch Jira ticket writing', description: 'Write multiple tickets at once from issues raised on a call.', frequency: 'weekly', roles: ['im'], category: 'Tickets' },
  { id: 'im-uc-11', title: 'Hardware issue escalations', description: 'Clear escalations for kiosk and cashiering device issues with all context needed to act.', frequency: 'as-needed', roles: ['im'], category: 'Hardware' },
  { id: 'im-uc-12', title: 'Payment processor onboarding', description: 'Cover emails, FAQ responses, and follow-ups for payment processing application forms.', frequency: 'as-needed', roles: ['im'], category: 'Payment processor' },
  { id: 'tss-uc-1', title: 'Error triage', description: 'Paste a stack trace + code → root cause in plain English + ranked fixes.', frequency: 'daily', roles: ['tss'], category: 'Debugging' },
  { id: 'tss-uc-2', title: 'Root cause tracing', description: 'Follow the call chain upstream to find where a bug actually originates.', frequency: 'weekly', roles: ['tss'], category: 'Debugging' },
  { id: 'tss-uc-3', title: 'Code review & edge cases', description: 'Spot bugs, edge cases, and failure modes before they hit production.', frequency: 'weekly', roles: ['tss'], category: 'Code' },
  { id: 'tss-uc-4', title: 'Implementation planning', description: 'Get a step-by-step approach with edge cases flagged before writing any code.', frequency: 'weekly', roles: ['tss'], category: 'Planning' },
  { id: 'tss-uc-5', title: 'PR description writing', description: 'Paste diff or change summary → clean PR description with context.', frequency: 'daily', roles: ['tss'], category: 'Shipping' },
  { id: 'tss-uc-6', title: 'Change & release notes', description: 'Raw changes → polished notes for technical or client audiences.', frequency: 'weekly', roles: ['tss'], category: 'Shipping' },
  { id: 'tss-uc-7', title: 'Test case generation', description: 'Paste a function → comprehensive tests: happy path, edge cases, failure modes.', frequency: 'weekly', roles: ['tss'], category: 'Code' },
  { id: 'tss-uc-8', title: 'Explain unfamiliar code', description: 'Walk through a codebase you haven\'t touched before — understand it before you change it.', frequency: 'as-needed', roles: ['tss'], category: 'Code' },
]
