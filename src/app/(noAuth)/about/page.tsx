import { FaArrowAltCircleRight, PERSON_JUMPING_IMAGE, LOVES, FaHtml5, FaCss3, IoLogoJavascript, FaReact, FaNode, SiExpress, SiNextdotjs, RiTailwindCssFill, SiMongodb, FaGitAlt, FaPython, FaJava, SiPrisma, VscVscode, FaWindows, SiPostman, SiVercel, SiNetlify, SiNotion, FaGithub } from '@/constants'
import Image from 'next/image'
import React from 'react'

const SKILLS = [
  { icon: null, label: 'C' },
  { icon: null, label: 'C++' },
  { icon: FaHtml5, label: null },
  { icon: FaCss3, label: null },
  { icon: IoLogoJavascript, label: null },
  { icon: FaReact, label: null },
  { icon: FaNode, label: null },
  { icon: SiExpress, label: null },
  { icon: SiNextdotjs, label: null },
  { icon: RiTailwindCssFill, label: null },
  { icon: SiMongodb, label: null },
  { icon: FaGitAlt, label: null },
  { icon: FaPython, label: null },
  { icon: FaJava, label: null },
  { icon: SiPrisma, label: null },
];

const TOOLS = [
  { icon: VscVscode, label: null },
  { icon: FaWindows, label: null },
  { icon: SiPostman, label: null },
  { icon: SiVercel, label: null },
  { icon: SiNetlify, label: null },
  { icon: SiNotion, label: null },
  { icon: FaGithub, label: null },
];

const page = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center gap-24 pb-20'>
      {/* ═══ Know who I am ═══ */}
      <div className='w-full sm:w-4/5 p-4 sm:p-0 flex flex-col sm:flex-row justify-between items-center min-h-[calc(100vh-60px)] gap-8'>
        <div className='flex flex-col gap-8 sm:w-1/2'>
          {/* Section label */}
          <div className='flex items-center gap-3 animate-fade-in-up'>
            <div className='w-12 h-1 rounded-full bg-lcars-amber' />
            <span className='font-mono text-xs text-lcars-amber tracking-[0.3em] uppercase'>Personnel File</span>
          </div>

          <h1 className='text-3xl sm:text-6xl font-orbitron font-semibold text-center sm:text-left animate-fade-in-up delay-100'>
            Know who <span className='text-gradient-warp'>I&apos;M</span>
          </h1>

          <div className='glass-panel p-6 animate-fade-in-up delay-200'>
            <p className='text-lg sm:text-xl leading-[1.75rem] sm:leading-[2.25rem] font-rajdhani text-text-secondary'>
              Hello, I&apos;m <span className='text-warp-cyan font-semibold'>Sorbopriyo Roy</span>, from <span className='text-lcars-amber'>Kolkata, India.</span><br />
              I am currently a B.TECH(IT) student at Techno International New Town.<br />
              I am a passionate <span className='text-warp-cyan font-semibold'>MERN Stack Developer</span> with ability to continuously learn and adapt to new technologies.
            </p>
          </div>

          <div className='animate-fade-in-up delay-300'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-1 rounded-full bg-shield-violet' />
              <h2 className='text-xl font-orbitron font-medium text-shield-purple tracking-wider'>Loves!</h2>
            </div>
            <ul className='pl-4 space-y-2'>
              {LOVES.map((love, index) => (
                <li key={index} className='flex items-center gap-3 text-lg font-rajdhani text-text-secondary hover:text-warp-cyan transition-colors duration-300 group'>
                  <FaArrowAltCircleRight className='text-warp-cyan group-hover:translate-x-1 transition-transform duration-300' />
                  {love}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='w-full sm:w-1/2 animate-fade-in-up delay-400'>
          <div className='relative group'>
            <div className='absolute -inset-4 bg-gradient-to-r from-warp-cyan/10 via-shield-violet/10 to-lcars-amber/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700' />
            <Image src={PERSON_JUMPING_IMAGE} width={929} height={1280} alt='person jumping' className='relative object-cover w-full animate-float' />
          </div>
        </div>
      </div>

      {/* ═══ Know what I know ═══ */}
      <div className='w-full sm:w-4/5 p-4 sm:p-0 flex flex-col justify-center items-center gap-10'>
        {/* Section label */}
        <div className='flex items-center gap-3 self-start'>
          <div className='w-12 h-1 rounded-full bg-warp-cyan' />
          <span className='font-mono text-xs text-warp-cyan tracking-[0.3em] uppercase'>Technical Arsenal</span>
        </div>

        <h1 className='text-3xl sm:text-6xl font-orbitron font-semibold text-center sm:text-left w-full'>
          Know what <span className='text-gradient-warp'>I&apos;M</span> good at
        </h1>

        <div className='flex flex-wrap gap-4 justify-center items-center w-full'>
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className='w-full sm:w-[180px] glass-panel flex justify-center items-center py-6 card-hover group cursor-default'
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className='text-4xl font-orbitron font-medium text-text-secondary group-hover:text-warp-cyan transition-colors duration-300'>
                {skill.icon ? <skill.icon /> : skill.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Know what tools I use ═══ */}
      <div className='w-full sm:w-4/5 p-4 sm:p-0 flex flex-col justify-center items-center gap-10'>
        {/* Section label */}
        <div className='flex items-center gap-3 self-start'>
          <div className='w-12 h-1 rounded-full bg-lcars-amber' />
          <span className='font-mono text-xs text-lcars-amber tracking-[0.3em] uppercase'>Toolkit</span>
        </div>

        <h1 className='text-3xl sm:text-6xl font-orbitron font-semibold text-center sm:text-left w-full'>
          Know what tools <span className='text-gradient-lcars'>I&apos;M</span> using
        </h1>

        <div className='flex flex-wrap gap-4 justify-center items-center w-full'>
          {TOOLS.map((tool, index) => (
            <div
              key={index}
              className='w-full sm:w-[180px] glass-panel flex justify-center items-center py-6 card-hover group cursor-default'
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className='text-4xl font-medium text-text-secondary group-hover:text-lcars-amber transition-colors duration-300'>
                {tool.icon ? <tool.icon /> : tool.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default page