import { Project } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <h2 className="p-8 uppercase text-[48px] md:text-[96px] lg:text-[192px]">Projects Showcase</h2>
      {projects && projects.map((project, index) => (
        <div key={project.id} className={`w-fit p-8 flex flex-col justify-center gap-4 ${index % 2 === 0 ? 'self-start' : 'self-start lg:self-end'}`}>
          <Image width={1920} height={1080} src={project.image} alt={project.name} className="object-cover w-auto h-[150px] md:h-[300px] lg:h-[600px] hover:-translate-y-5 duration-300" priority />
          <h2 className="text-2xl md:text-4xl font-semibold">{project.name}</h2>
          <p className="text-sm md:text-base font-semibold text-gray-700">{project.description}</p>
          <a href={project.url} className="text-xs md:text-base w-fit p-2 border-2 border-gray-950 hover:bg-gray-950 hover:text-white duration-300" target="_blank">Visit Project</a>
        </div>
      ))}
    </>
  )
}

export default Projects