import './globals.css'
import type { Metadata } from 'next'
import { righteous } from './fonts';

export const metadata: Metadata = {
  title: 'Getknowtifyd',
  description: 'Never miss an important event',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={righteous.className}>{children}</body>
    </html>
  )
}
