import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center py-16 lg:py-44 gap-5">
      <Image src='/dp.png' alt="profile picture" width={300} height={300} className="rounded-full border-2 border-teal-500 w-52 lg:w-72" />
      <h1>Hi, I&apos;m Sorbopriyo 👋</h1>
      <h2 className="font-medium tracking-widest">Full stack developer</h2>
      <div className="flex justify-center items-center gap-5">
        <Link href='mailto:sorbopriyo@gmail.com' className="py-2 px-5 border-2 rounded-full hover:bg-white hover:text-gray-950 transition-all">Contact me</Link>
        <Link href='/resume.pdf' className="py-2 px-5 border-2 rounded-full border-teal-500 hover:bg-teal-500 hover:text-gray-950 transition-all" target="_blank">My Resume</Link>
      </div>
    </section>
  )
}

export default Hero