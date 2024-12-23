import React from 'react'

const Hero = () => {
    return (
        <section className='min-h-screen flex flex-col justify-center items-center'>
            <div>
                <h1 className='text-xl md:text-6xl font-semibold ml-1 md:ml-2'>Hi, I&apos;m <span className='text-blue-500'>Sorbopriyo Roy</span></h1>
                <h2 className="text-[3.25rem] md:text-[10rem] font-bold text-center -mt-2 md:-mt-8" >FULLSTACK</h2>
                <h2 className='text-[3.25rem] md:text-[10rem] font-bold text-center -mt-6 md:-mt-24'>DEVELOPER</h2>
                <div className="hidden md:flex flex-col md:flex-row justify-between md:-mt-10 md:w-full p-2">
                    <div>
                        <p className="text-xs md:text-xl md:font-semibold">CURRENTLY STUDYING <span className='inline md:hidden'>AT TECHNO INTERNATIONAL NEW TOWN</span></p>
                        <p className="text-xs md:text-xl md:font-semibold hidden md:block">AT TECHNO INTERNATIONAL NEW TOWN</p>
                    </div>
                    <p className="text-xs md:text-xl md:font-semibold">(2022 - PRESENT)</p>
                </div>
            </div>
        </section>
    )
}

export default Hero