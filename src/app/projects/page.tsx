"use client"

import Projects from '@/components/Projects/Projects';
import { Project } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const projects: Project[] = (await axios.get(`/api/get-all-projects`)).data.data;
      projects && setProjects(projects);
    })();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-[80%] mx-auto mt-10">
      <div className="w-full flex flex-col">
        <Projects projects={projects} />
      </div>
    </main>
  )
}

export default page