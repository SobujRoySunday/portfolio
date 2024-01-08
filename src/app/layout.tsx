import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Sorbopriyo Roy - Full stack Developer',
  description: 'The portfolio of the greatest Web Developer of all time :)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
