import './globals.css'
import type { Metadata } from 'next'
import { Righteous } from 'next/font/google'

const righteous = Righteous({ weight:"400",subsets:['latin'], style: ['normal'] })

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
