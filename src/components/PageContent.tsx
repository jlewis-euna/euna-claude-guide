'use client'

import type { Role } from '@/data/content'
import type { Page } from './ClientApp'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { UseCasesPage } from './pages/UseCasesPage'
import { PromptsPage } from './pages/PromptsPage'
import { SkillsPage } from './pages/SkillsPage'
import { ToolsPage } from './pages/ToolsPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { InsightsPage } from './pages/InsightsPage'

interface Props {
  role: Role
  page: Page
  onNavigate: (p: Page) => void
}

export function PageContent({ role, page, onNavigate }: Props) {
  switch (page) {
    case 'getting-started': return <GettingStartedPage role={role} onNavigate={onNavigate} />
    case 'use-cases':       return <UseCasesPage role={role} />
    case 'prompts':         return <PromptsPage role={role} />
    case 'skills':          return <SkillsPage role={role} />
    case 'tools':           return <ToolsPage role={role} />
    case 'checklist':       return <ChecklistPage role={role} />
    case 'insights':        return <InsightsPage />
    default:                return <GettingStartedPage role={role} onNavigate={onNavigate} />
  }
}
