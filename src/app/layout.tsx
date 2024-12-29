import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sorbopriyo Roy - Full stack Developer',
  description: 'The portfolio of the greatest Web Developer of all time 😉',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='fixed rotate-90 text-[300px] md:text-[420px] font-black top-[5rem] left-[-15rem] md:left-[-20rem] -z-10 opacity-5'>DEV</div>
        {children}
      </body>
    </html>
  )
}