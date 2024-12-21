import { FaArrowAltCircleRight, PERSON_JUMPING_IMAGE, LOVES } from '@/constants'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center'>
      <div className='w-4/5 flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-8'>
          <h1 className='text-6xl font-semibold'>Know who <span className='text-blue-500'>I&apos;M</span></h1>
          <p className='text-2xl leading-[2.25rem]'>
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
        <div className='w-1/2'>
          <Image src={PERSON_JUMPING_IMAGE} width={929} height={1280} alt='person jumping' className='object-cover w-full' />
        </div>
      </div>
    </main>
  )
}

export default page