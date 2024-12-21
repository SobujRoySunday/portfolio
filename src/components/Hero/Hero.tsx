import React from 'react'

const Hero = () => {
    return (
        <section className='min-h-screen flex flex-col justify-center items-center'>
            <div>
                <h1 className='text-xl sm:text-6xl font-semibold ml-1 sm:ml-2'>Hi, I&apos;m <span className='text-blue-500'>Sorbopriyo Roy</span></h1>
                <h2 className="text-[3.25rem] sm:text-[10rem] font-bold text-center -mt-2 sm:-mt-8" >FULLSTACK</h2>
                <h2 className='text-[3.25rem] sm:text-[10rem] font-bold text-center -mt-6 sm:-mt-24'>DEVELOPER</h2>
                <div className="hidden sm:flex flex-col sm:flex-row justify-between sm:-mt-10 sm:w-full p-2">
                    <div>
                        <p className="text-xs sm:text-xl sm:font-semibold">CURRENTLY STUDYING <span className='inline sm:hidden'>AT TECHNO INTERNATIONAL NEW TOWN</span></p>
                        <p className="text-xs sm:text-xl sm:font-semibold hidden sm:block">AT TECHNO INTERNATIONAL NEW TOWN</p>
                    </div>
                    <p className="text-xs sm:text-xl sm:font-semibold">(2022 - PRESENT)</p>
                </div>
            </div>
        </section>
    )
}

export default Hero