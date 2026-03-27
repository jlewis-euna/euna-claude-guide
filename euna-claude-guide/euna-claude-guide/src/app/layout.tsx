import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude at Euna — AI Guide',
  description: 'Interactive AI tools guide for Implementation Managers and Solutions Engineers at Euna Solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
