"use client"

import Link from "next/link"
import { SOCIAL_LINKS } from "@/constants"
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaSquareXTwitter } from "@/constants"

const Footer = () => {
  return (
    <footer className="relative mt-20 lcars-border-top">
      {/* Top decorative LCARS bar */}
      <div className="flex items-center gap-2 px-8 pt-6 pb-2">
        <div className="h-2 w-20 rounded-full bg-lcars-amber/60" />
        <div className="h-2 w-8 rounded-full bg-warp-cyan/40" />
        <div className="h-2 flex-1 rounded-full bg-panel" />
        <div className="h-2 w-8 rounded-full bg-shield-violet/40" />
        <div className="h-2 w-12 rounded-full bg-lcars-amber/40" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center px-8 py-6">
        {/* Social Links */}
        <div>
          <ul className="flex flex-row gap-4">
            {
              SOCIAL_LINKS.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    target="_blank"
                    className="group relative flex items-center justify-center w-10 h-10 rounded-lg border border-dim hover:border-active transition-all duration-300 hover:shadow-glow-cyan"
                  >
                    {link.name === "Github" && <FaGithub className="text-lg text-text-secondary group-hover:text-warp-cyan transition-colors duration-300" />}
                    {link.name === "Linkedin" && <FaLinkedin className="text-lg text-text-secondary group-hover:text-warp-cyan transition-colors duration-300" />}
                    {link.name === "Twitter" && <FaSquareXTwitter className="text-lg text-text-secondary group-hover:text-warp-cyan transition-colors duration-300" />}
                    {link.name === "Instagram" && <FaInstagram className="text-lg text-text-secondary group-hover:text-shield-purple transition-colors duration-300" />}
                    {link.name === "Email" && <FaEnvelope className="text-lg text-text-secondary group-hover:text-lcars-amber transition-colors duration-300" />}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        <p className="text-sm text-text-muted text-center my-2 sm:my-0 font-rajdhani tracking-wider">
          Engineered with <span className="text-alert-red">❤️</span> by <span className="font-orbitron text-xs text-warp-cyan">Sorbopriyo Roy</span>
        </p>

        <div>
          <button 
            className="group flex items-center gap-3 font-mono text-xs text-text-secondary hover:text-warp-cyan transition-colors duration-300 tracking-widest uppercase"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
            {/* Animated up arrow */}
            <div className="w-6 h-6 rounded-full border border-dim group-hover:border-active flex items-center justify-center transition-all duration-300 group-hover:shadow-glow-cyan group-hover:-translate-y-1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-current">
                <path d="M5 8V2M5 2L2 5M5 2L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom LCARS decoration */}
      <div className="flex items-center gap-2 px-8 pb-4">
        <div className="h-1 flex-1 rounded-full bg-panel" />
        <span className="font-mono text-[10px] text-text-muted tracking-[0.2em]">STARDATE {new Date().getFullYear()}.{Math.floor((Date.now() % 31536000000) / 86400000)}</span>
        <div className="h-1 flex-1 rounded-full bg-panel" />
      </div>
    </footer>
  )
}

export default Footer