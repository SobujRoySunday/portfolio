import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'


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
      <body>
        <div className='fixed rotate-90 text-[496px] font-black top-[5rem] left-[-20rem] -z-10 opacity-5'>DEV</div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
