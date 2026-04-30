'use client'

import React, { useEffect, useState } from 'react'

const Hero = () => {
    const [mounted, setMounted] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullText = 'FULLSTACK';

    useEffect(() => {
        setMounted(true);
        let i = 0;
        const timer = setInterval(() => {
            if (i <= fullText.length) {
                setTypedText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 120);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className='min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4'>
            {/* Decorative orbital rings */}
            <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-warp-blue/5 animate-[spin_60s_linear_infinite]" aria-hidden="true" />
            <div className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-warp-cyan/5 animate-[spin_45s_linear_infinite_reverse]" aria-hidden="true" />

            <div className={`flex flex-col items-center transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Greeting line */}
                <div className='animate-fade-in-up'>
                    <h1 className='text-xl md:text-5xl font-rajdhani font-semibold ml-1 md:ml-2 text-center'>
                        Hi, I&apos;m <span className='text-gradient-warp font-orbitron'>Sorbopriyo Roy</span>
                    </h1>
                </div>

                {/* Big title with typing effect */}
                <div className='animate-fade-in-up delay-200'>
                    <h2 className="text-[3.25rem] md:text-[10rem] font-orbitron font-bold text-center -mt-2 md:-mt-8 tracking-tight">
                        <span className='text-gradient-lcars'>{typedText}</span>
                        <span className='text-lcars-amber cursor-blink'>_</span>
                    </h2>
                </div>

                <div className='animate-fade-in-up delay-400'>
                    <h2 className='text-[3.25rem] md:text-[10rem] font-orbitron font-bold text-center -mt-6 md:-mt-24 tracking-tight text-text-primary warp-pulse'>
                        DEVELOPER
                    </h2>
                </div>

                {/* Subtitle info bar */}
                <div className="hidden md:flex flex-col md:flex-row justify-between md:-mt-10 md:w-full p-2 animate-fade-in-up delay-600">
                    <div className='flex items-center gap-3'>
                        {/* LCARS decorative pip */}
                        <div className='flex gap-1'>
                            <div className='w-2 h-2 rounded-full bg-status-green animate-warp-pulse' />
                            <div className='w-2 h-2 rounded-full bg-lcars-amber' />
                            <div className='w-2 h-2 rounded-full bg-warp-cyan' />
                        </div>
                        <div>
                            <p className="text-xs md:text-lg font-rajdhani font-medium text-text-secondary tracking-wider uppercase">
                                CURRENTLY STUDYING <span className='inline md:hidden'>AT TECHNO INTERNATIONAL NEW TOWN</span>
                            </p>
                            <p className="text-xs md:text-lg font-rajdhani font-medium text-text-secondary tracking-wider uppercase hidden md:block">
                                AT TECHNO INTERNATIONAL NEW TOWN
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-[2px] bg-lcars-amber/40 rounded-full' />
                        <p className="text-xs md:text-lg font-mono text-warp-cyan tracking-widest">(2022 - PRESENT)</p>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className='mt-16 animate-fade-in-up delay-800 flex flex-col items-center gap-2'>
                    <div className='w-[1px] h-12 bg-gradient-to-b from-transparent via-warp-cyan to-transparent animate-float' />
                    <p className='font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase'>Scroll to explore</p>
                </div>
            </div>
        </section>
    )
}

export default Hero