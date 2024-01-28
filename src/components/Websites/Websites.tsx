import { prisma } from "@/lib/db/prisma";
import Website from "./Website";

export default async function Websites() {
  let projects = await prisma.projects.findMany({
    orderBy: { id: "desc" }
  })
  if (projects.length > 6) {
    projects = projects.slice(0, 6)
  }

  return (
    <section className="websites" id="works">
      <div className="websites-header">
        <h2>My Recent Works</h2>
        <p>Here are some projects that I recently worked on...</p>
      </div>
      {
        projects.map(project => (
          <Website
            key={project.id}
            link={project.link}
            imageURL={project.imageURL}
            title={project.title}
            techStack={project.techStack}
          />
        ))
      }
    </section>
  )
}
