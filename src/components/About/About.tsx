import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PERSON_IMAGE } from '@/constants'

const About = () => {
    return (
        <section id='about' className='flex flex-col justify-center items-center px-2'>
            <div className='flex flex-col sm:flex-row w-full sm:w-4/5 gap-8'>
                <div className='w-full sm:w-2/3 flex flex-col gap-4'>
                    <p className='text-3xl sm:text-5xl'>🤵🏻</p>
                    <p className='text-sm sm:text-xl uppercase leading-6 sm:leading-9 ml-2'>Turning code into conversation! For the past <b>6 years</b>, my world has revolved around transforming ideas into digital realities as a dedicated <b>MERN Stack developer</b>. With a deep dive into the realms of <b>T3 and LAMP Stacks</b>, my toolkit is ever-expanding, mirroring my quest for learning.</p>
                    <Link href="/about" className='self-center sm:self-start w-fit ml-2 border-2 border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition'>Learn more</Link>
                </div>
                <div className='w-full sm:w-1/3'>
                    <Image src={PERSON_IMAGE} width={1000} height={1000} alt="Sorbopriyo Roy Image" className='w-full myImage object-cover rounded-full' />
                </div>
            </div>
        </section>
    )
}

export default About