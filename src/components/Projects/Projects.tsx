import { connectToMongoDB } from '@/lib/db/'
import { isSafeHttpUrl } from '@/lib/validate'
import { projectModel } from '@/models/'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getStarredProjects = async () => {
  try {
    await connectToMongoDB();
    const projects = await projectModel.find({ isStarred: true }).lean();
    // Defensive: older rows were stored without URL validation.
    return projects.filter((project) => isSafeHttpUrl(project.url));
  } catch (error) {
    // A database outage should degrade this section, not take down the page.
    console.error('Error loading starred projects:', error);
    return [];
  }
}

const Projects = async () => {
  const safeProjects = await getStarredProjects();

  return (
    <section id='projects' className='flex justify-center items-center py-20'>
      <div className='w-full md:w-4/5 flex flex-col justify-center px-4 md:px-0'>
        {/* Section label */}
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-12 h-1 rounded-full bg-warp-cyan' />
          <span className='font-mono text-xs text-warp-cyan tracking-[0.3em] uppercase'>Featured Work</span>
        </div>

        <h2 className="section-title text-[3.25rem] md:text-[8rem] text-gradient-warp leading-none">
          Projects
        </h2>

        <div className='flex flex-wrap gap-6 md:gap-8 justify-center mt-12'>
          {safeProjects.length > 0 && safeProjects.map((project, index) => (
            <Link 
              href={project.url} 
              key={String(project._id)} 
              className='group w-full sm:w-96 glass-panel overflow-hidden card-hover relative holo-shimmer'
              target='_blank'
              rel='noopener noreferrer'
            >
              {/* Image container */}
              <div className='relative overflow-hidden'>
                <Image 
                  width={1280} 
                  height={720} 
                  src={project.image} 
                  alt={project.name} 
                  className="object-cover w-full h-52 transition-transform duration-700 group-hover:scale-110" 
                  priority 
                />
                {/* Overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-60' />
                {/* Starred badge */}
                <div className='absolute top-3 right-3 flex items-center gap-1 bg-lcars-amber/20 backdrop-blur-sm px-2 py-1 rounded-full border border-lcars-amber/30'>
                  <div className='w-1.5 h-1.5 rounded-full bg-lcars-amber' />
                  <span className='font-mono text-[10px] text-lcars-amber tracking-wider'>STARRED</span>
                </div>
              </div>
              {/* Content */}
              <div className='p-5 flex flex-col gap-2'>
                <h2 className="text-xl font-orbitron font-semibold text-text-primary group-hover:text-warp-cyan transition-colors duration-300">
                  {project.name}
                </h2>
                <p className="text-sm font-rajdhani text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                {/* Hover reveal arrow */}
                <div className='flex items-center gap-2 mt-2 text-warp-cyan opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0'>
                  <div className='w-6 h-[1px] bg-warp-cyan' />
                  <span className='font-mono text-xs tracking-widest'>VIEW</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link 
          href="/projects" 
          className="btn-warp mt-16 self-center"
        >
          <span className='w-2 h-2 rounded-full bg-warp-cyan animate-warp-pulse' />
          View All Projects
        </Link>
      </div>
    </section>
  )
}

export default Projects