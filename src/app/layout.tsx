import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sorbopriyo Roy — Starfleet-Grade Full Stack Developer',
  description: 'The portfolio of Sorbopriyo Roy — Full Stack Developer crafting warp-speed digital experiences with precision engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Animated starfield background */}
        <div className='starfield' aria-hidden="true" />
        {/* Subtle CRT scanline overlay */}
        <div className='scanlines' aria-hidden="true" />
        {/* Watermark */}
        <div className='watermark-text rotate-90 text-[300px] md:text-[420px] top-[5rem] left-[-15rem] md:left-[-20rem]'>DEV</div>
        {children}
      </body>
    </html>
  )
}