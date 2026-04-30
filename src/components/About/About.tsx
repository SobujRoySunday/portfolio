import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PERSON_IMAGE } from '@/constants'

const About = () => {
    return (
        <section id='about' className='flex flex-col justify-center items-center px-4 py-20'>
            <div className='flex flex-col md:flex-row w-full md:w-4/5 gap-12 items-center'>
                {/* Mobile image */}
                <div className='w-full md:w-1/3 block md:hidden'>
                    <div className='relative group'>
                        <div className='absolute -inset-1 bg-gradient-to-r from-warp-cyan/20 via-shield-violet/20 to-lcars-amber/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500' />
                        <Image src={PERSON_IMAGE} width={1000} height={1000} alt="Sorbopriyo Roy Image" className='relative w-full myImage object-cover rounded-full' />
                    </div>
                </div>

                {/* Text content */}
                <div className='w-full md:w-2/3 flex flex-col gap-6'>
                    {/* Section label */}
                    <div className='flex items-center gap-3 animate-fade-in-up'>
                        <div className='w-12 h-1 rounded-full bg-lcars-amber' />
                        <span className='font-mono text-xs text-lcars-amber tracking-[0.3em] uppercase'>About Me</span>
                    </div>

                    <p className='text-3xl md:text-5xl'>🤵🏻</p>

                    <div className='glass-panel p-6 md:p-8 animate-fade-in-up delay-200'>
                        <p className='text-base md:text-xl font-rajdhani uppercase leading-7 md:leading-9 text-text-secondary'>
                            Software engineer working with AI and backend systems! At NRIFT India, I&apos;ve spent the past year designing and shipping AI-driven apps and <b className='text-warp-cyan'>MCP integrations</b>. With a deep dive into the realms of <b className='text-lcars-amber'>Agentic AI Workflows</b> and <b className='text-shield-purple'>Microservices</b>, I write clean, maintainable code built to last.
                        </p>
                    </div>

                    <Link 
                        href="/about" 
                        className='btn-warp self-center md:self-start animate-fade-in-up delay-400'
                    >
                        <span className='w-2 h-2 rounded-full bg-warp-cyan animate-warp-pulse' />
                        Learn more
                    </Link>
                </div>

                {/* Desktop image */}
                <div className='w-full md:w-1/3 hidden md:block'>
                    <div className='relative group'>
                        <div className='absolute -inset-2 bg-gradient-to-r from-warp-cyan/20 via-shield-violet/20 to-lcars-amber/20 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500' />
                        <Image src={PERSON_IMAGE} width={1000} height={1000} alt="Sorbopriyo Roy Image" className='relative w-full myImage object-cover rounded-full' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About