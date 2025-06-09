// src/app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grammar Lab',
  description: 'AI-powered diagramming tool',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* TODO: create a page header */}
      <body className="text-center">{children}</body>
    </html>
  )
}
