"use client"

import Contact from "@/components/Contact/Contact";
import Projects from "@/components/Projects/Projects";
import { Project } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const projects: Project[] = (await axios.get(`/api/get-top-projects`)).data.data;
      projects && setProjects(projects);
    })();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-full md:w-[90%] lg:w-[80%] mx-auto mt-10">
      {/* Hero Section */}
      <h2 className="text-[3rem] md:text-[6rem] lg:text-[16rem] font-light lg:font-extralight leading-[4rem] md:leading-[8rem] lg:leading-[16rem] text-center">FULL-STACK<br />DEVELOPER</h2>
      <div className="flex flex-row justify-between w-[68%]">
        <p className="text-xs md:text-xl font-semibold">CURRENTLY STUDYING<br />AT TECHNO INTERNATIONAL NEW TOWN</p>
        <p className="text-xs md:text-xl font-semibold">(2022 - PRESENT)</p>
      </div>

      {/* About Section */}
      <div className='w-full mt-1 md:mt-36 p-8 md:p-24 lg:grid lg:grid-cols-2'>
        <div className='p-8 flex flex-col items-center justify-center gap-4'>
          <p className='text-base md:text-2xl uppercase leading-7 md:leading-10'>🚀 Turning code into conversation! For the past <b>6 years</b>, my world has revolved around transforming ideas into digital realities as a dedicated <b>MERN Stack developer</b>. With a deep dive into the realms of <b>T3 and LAMP Stacks</b>, my toolkit is ever-expanding, mirroring my quest for learning.</p>
          <div className='h-[2px] w-32 bg-gray-950'></div>
        </div>
        <div className='flex items-center justify-center'>
          <img src="assets/me.jpeg" alt="Sorbopriyo Roy Image" className='myImage object-cover rounded-full w-80 md:w-96 mx-auto' />
        </div>
      </div>

      {/* Projects Section */}
      <div className="w-full md:mt-36 flex flex-col">
        <Projects projects={projects} />
        <Link href="/projects" className="text-xs md:text-base w-fit p-2 md:p-4 gap-4 self-center border-2 border-gray-950 hover:bg-gray-950 hover:text-white duration-300">View All Projects</Link>
      </div>

      {/* Contact Section */}
      <Contact className="" />
    </main>
  )
}