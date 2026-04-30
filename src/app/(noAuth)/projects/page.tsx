import { connectToMongoDB } from '@/lib/db';
import { projectModel } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProjectPage = async () => {
  await connectToMongoDB();
  const projects = await projectModel.find({});

  return (
    <main className="w-full pb-20">
      <div className="flex justify-center items-center">
        <div className='w-full md:w-4/5 flex flex-col justify-center px-4 md:px-0 pt-8'>
          {/* Section label */}
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-1 rounded-full bg-shield-violet' />
            <span className='font-mono text-xs text-shield-purple tracking-[0.3em] uppercase'>Mission Log</span>
          </div>

          <h2 className="section-title text-[3.25rem] md:text-[8rem] text-gradient-shield leading-none mb-12">
            My projects
          </h2>

          <ul className='flex flex-col gap-6'>
            {projects.length > 0 ? projects.map((project) => (
              <li key={project.id} className='group w-full glass-panel overflow-hidden card-hover relative holo-shimmer'>
                <div className='flex flex-col sm:flex-row'>
                  {/* Image */}
                  <div className='w-full sm:w-1/4 relative overflow-hidden'>
                    <Image 
                      width={1280} 
                      height={720} 
                      src={project.image} 
                      alt={project.name} 
                      className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent to-panel/50 hidden sm:block' />
                  </div>

                  {/* Content */}
                  <div className='w-full sm:w-3/4 p-6 flex flex-col gap-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-2 h-2 rounded-full bg-warp-cyan animate-warp-pulse' />
                      <h2 className="text-2xl font-orbitron font-semibold text-text-primary group-hover:text-warp-cyan transition-colors duration-300">
                        {project.name}
                      </h2>
                    </div>

                    <p className="text-base font-rajdhani text-text-secondary leading-relaxed">
                      {project.description}
                    </p>

                    <Link 
                      href={project.url} 
                      className="btn-warp w-fit" 
                      target='_blank'
                    >
                      <span className='w-2 h-2 rounded-full bg-warp-cyan' />
                      View Project
                    </Link>
                  </div>
                </div>
              </li>
            )) : (
              <div className='glass-panel p-12 text-center'>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-16 h-16 rounded-full border border-dim flex items-center justify-center'>
                    <span className='text-2xl'>🚀</span>
                  </div>
                  <p className='font-rajdhani text-lg text-text-secondary'>No projects found in the database</p>
                  <p className='font-mono text-xs text-text-muted tracking-wider'>AWAITING MISSION ASSIGNMENTS</p>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default ProjectPage;