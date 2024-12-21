"use client"

import Projects from '@/components/Projects/Projects';
import { Project } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const projects: Project[] = (await axios.get(`/api/get-all-projects`)).data.data;
      projects && setProjects(projects);
    })();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-full md:w-[90%] lg:w-[80%] mx-auto mt-10">
      <div className="w-full flex flex-col">
        projects
      </div>
    </main>
  )
}

export default ProjectPage;