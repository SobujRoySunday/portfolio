import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"

async function addProject(formData: FormData) {
  "use server"

  const title = formData.get("title")?.toString() as string
  const imageURL = formData.get("imageURL")?.toString() as string
  const link = formData.get("link")?.toString() as string
  const techStackString = formData.get("techStack")?.toString()
  const techStack = techStackString?.split(' ')

  await prisma.projects.create({
    data: { title, imageURL, link, techStack }
  })

  redirect('/')
}

export default function AddProjectPage() {
  return (
    <form action={addProject}>
      <input type="text" name="title" placeholder="title" required />
      <input type="text" name="imageURL" placeholder="Image URL" required />
      <input type="text" name="link" placeholder="Website link" required />
      <input type="text" name="techStack" placeholder="Tech stack used" required />
      <input type="submit" value="ADD" />
    </form>
  )
}
