'use client'

import { NAV_ITEMS } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`w-full flex justify-center items-center sticky top-0 z-50 transition-all duration-500 lcars-border-bottom ${
            scrolled 
                ? 'bg-void/80 backdrop-blur-xl shadow-glow-blue' 
                : 'bg-transparent'
        }`}>
            <div className="w-full md:w-4/5 flex flex-row justify-between items-center px-4 md:px-0 py-3">
                {/* Logo / Name */}
                <Link href="/" className="group flex items-center gap-3">
                    {/* LCARS-style decorative element */}
                    <div className="hidden md:flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-warp-cyan animate-warp-pulse" />
                        <div className="w-8 h-1 rounded-full bg-lcars-amber" />
                    </div>
                    <h1 className="text-lg font-orbitron font-semibold tracking-wider text-text-primary group-hover:text-warp-cyan transition-colors duration-300">
                        SORBOPRIYO<span className="text-warp-cyan">.</span>ROY
                    </h1>
                </Link>

                {/* Hamburger menu for mobile */}
                <button
                    className="sm:hidden text-xl text-warp-cyan hover:text-lcars-amber transition-colors p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1.5 w-6">
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Desktop menu */}
                <ul className="hidden md:flex flex-row gap-1 items-center">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className={`relative px-4 py-2 font-orbitron text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                                    path === item.href
                                        ? 'text-warp-cyan'
                                        : 'text-text-secondary hover:text-text-primary'
                                }`}
                            >
                                {item.label}
                                {/* Active indicator */}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-warp-cyan transition-all duration-300 ${
                                    path === item.href ? 'w-full' : 'w-0'
                                }`} />
                                {/* Hover glow */}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-warp-cyan/50 transition-all duration-300 ${
                                    path === item.href ? 'w-0' : 'group-hover:w-full w-0'
                                }`} />
                            </Link>
                        </li>
                    ))}
                    {/* LCARS decorative bar */}
                    <li className="ml-4 flex items-center gap-1">
                        <div className="w-12 h-1 rounded-full bg-lcars-amber/60" />
                        <div className="w-3 h-3 rounded-full bg-warp-cyan/40" />
                    </li>
                </ul>
            </div>

            {/* Mobile menu */}
            <div className={`sm:hidden fixed top-[52px] left-0 w-full transition-all duration-500 ${
                isMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
                <ul className="bg-hull/95 backdrop-blur-xl border-b border-subtle flex flex-col items-center">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index} className="w-full text-center">
                            <Link
                                href={item.href}
                                className={`block px-4 py-4 font-orbitron text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                                    path === item.href
                                        ? 'text-warp-cyan bg-warp-cyan/5'
                                        : 'text-text-secondary hover:text-warp-cyan hover:bg-warp-cyan/5'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
