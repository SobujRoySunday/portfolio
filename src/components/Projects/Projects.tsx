import { connectToMongoDB } from '@/lib/db/'
import { projectModel } from '@/models/'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Projects = async () => {
  await connectToMongoDB();
  const projects = await projectModel.find({ isStarred: true });

  return (
    <section id='projects' className='flex justify-center items-center'>
      <div className='w-full md:w-4/5 flex flex-col justify-center mt-12 px-2 md:px-0'>
        <h2 className="uppercase text-[3.25rem] md:text-[10rem] font-bold">Projects</h2>
        <div className='flex flex-wrap gap-4 md:gap-8 justify-center'>
          {projects.length > 0 && projects.map((project, index) => (
            <Link href={project.url} key={project.id} className={`w-96 flex flex-col shadow-xl hover:scale-105 transition rounded-xl bg-background gap-4 pb-4`} target='_blank'>
              <Image width={1280} height={720} src={project.image} alt={project.name} className="object-cover" priority />
              <h2 className="px-4 text-3xl font-semibold">{project.name}</h2>
              <p className="px-4 text-md font-medium text-gray-700">{project.description}</p>
            </Link>
          ))}
        </div>
        <Link href="/projects" className="mt-12 self-center text-base w-fit px-8 py-4 border-2 border-foreground hover:bg-foreground hover:text-white transition">View All Projects</Link>
      </div>
    </section>
  )
}

export default Projects