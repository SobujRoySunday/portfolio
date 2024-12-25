'use client'

import { NAV_ITEMS } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = () => {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full flex justify-center items-center relative bg-background md:bg-transparent">
            <div className="w-full md:w-4/5 flex flex-row justify-between items-center px-2 md:px-0 py-2">
                <h1 className="text-lg font-semibold">Sorbopriyo Roy</h1>
                {/* Hamburger menu for mobile */}
                <button
                    className="sm:hidden text-xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
                {/* Desktop menu */}
                <ul className="hidden md:flex flex-row gap-2">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className={`px-2 py-2 border-b-2 ${path === item.href
                                    ? 'border-foreground'
                                    : 'border-transparent'
                                    } hover:border-foreground transition`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Mobile menu */}
            {isMenuOpen && (
                <ul className="sm:hidden w-full bg-white absolute top-full left-0 flex flex-col items-center shadow-md">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index} className="w-full text-center">
                            <Link
                                href={item.href}
                                className={`block px-4 py-2 hover:bg-gray-100 transition`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
