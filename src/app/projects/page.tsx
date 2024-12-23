import { connectToMongoDB } from '@/lib/db';
import { projectModel } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProjectPage = async () => {
  await connectToMongoDB();
  const projects = await projectModel.find({});

  return (
    <main className="w-full">
      <div className="flex justify-center items-center">
        <div className='w-full md:w-4/5 flex flex-col justify-center px-2 md:px-0'>
          <h2 className="uppercase text-[3.25rem] md:text-[10rem] font-bold">My projects</h2>
          <ul className='flex flex-col gap-4'>
            {projects.length > 0 ? projects.map((project) => (
              <li key={project.id} className='w-full flex flex-col sm:flex-row border-2 border-foreground'>
                <div className='w-full sm:w-1/4'>
                  <Image width={1280} height={720} src={project.image} alt={project.name} className="object-cover h-full" />
                </div>
                <div className='w-full sm:w-3/4 p-4 flex flex-col gap-4'>
                  <h2 className="text-3xl font-semibold">{project.name}</h2>
                  <p className="text-md font-medium text-gray-700">{project.description}</p>
                  <Link href={project.url} className="w-fit px-8 py-4 border-2 border-foreground hover:bg-foreground hover:text-white transition" target='_blank'>View Project</Link>
                </div>
              </li>
            )) : (
              <p className='text-red-500 text-center'>No projects found</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default ProjectPage;