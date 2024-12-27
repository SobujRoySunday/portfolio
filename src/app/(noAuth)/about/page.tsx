import { FaArrowAltCircleRight, PERSON_JUMPING_IMAGE, LOVES, FaHtml5, FaCss3, IoLogoJavascript, FaReact, FaNode, SiExpress, SiNextdotjs, RiTailwindCssFill, SiMongodb, FaGitAlt, FaPython, FaJava, SiPrisma, VscVscode, FaWindows, SiPostman, SiVercel, SiNetlify, SiNotion, FaGithub } from '@/constants'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center gap-24'>
      {/* Know who I'm */}
      <div className='w-full sm:w-4/5 p-2 sm:p-0 flex flex-col sm:flex-row justify-between items-center min-h-[calc(100vh-44px)]'>
        <div className='flex flex-col gap-8'>
          <h1 className='text-3xl sm:text-6xl font-semibold text-center sm:text-left'>Know who <span className='text-blue-500'>I&apos;M</span></h1>
          <p className='text-lg sm:text-2xl leading-[1.75rem] sm:leading-[2.25rem]'>
            Hello, I&apos;m <span className='text-blue-500'>Sorbopriyo Roy</span>, from <span className='text-blue-500'>Kolkata, India.</span><br />
            I am currently a B.TECH(IT) student at Techno International New Town.<br />
            I am a passionate <span className='text-blue-500'>MERN Stack Developer</span> with ability to continuously learn and adapt to new technologies.
          </p>
          <div>
            <h2 className='text-2xl font-medium'>Loves!</h2>
            <ul className='mt-4 pl-4'>
              {LOVES.map((love, index) => (<li key={index} className='flex items-center gap-2 text-lg'><FaArrowAltCircleRight />{love}</li>))}
            </ul>
          </div>
        </div>
        <div className='w-full sm:w-1/2'>
          <Image src={PERSON_JUMPING_IMAGE} width={929} height={1280} alt='person jumping' className='object-cover w-full' />
        </div>
      </div>

      {/* Know what I know */}
      <div className='w-full sm:w-4/5 p-2 sm:p-0 flex flex-col justify-center items-center gap-8'>
        <h1 className='text-3xl sm:text-6xl font-semibold text-center sm:text-left'>Know what <span className='text-blue-500'>I&apos;M</span> good at</h1>
        <div className='flex flex-wrap gap-4 justify-center items-center'>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'>C</h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'>C++</h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaHtml5 /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaCss3 /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><IoLogoJavascript /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaReact /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaNode /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiExpress /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiNextdotjs /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><RiTailwindCssFill /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiMongodb /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaGitAlt /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaPython /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaJava /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiPrisma /></h2>
          </div>
        </div>
      </div>

      {/* Know what tools I use */}
      <div className='w-4/5 flex flex-col justify-center items-center gap-8'>
        <h1 className='text-3xl sm:text-6xl font-semibold text-center sm:text-left'>Know what tools <span className='text-blue-500'>I&apos;M</span> using</h1>
        <div className='flex flex-wrap gap-4 justify-center items-center'>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><VscVscode /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaWindows /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiPostman /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiVercel /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiNetlify /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><SiNotion /></h2>
          </div>
          <div className='w-full sm:w-[200px] border-2 border-foreground flex justify-center items-center py-6 hover:scale-105 transition'>
            <h2 className='text-4xl font-medium'><FaGithub /></h2>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page