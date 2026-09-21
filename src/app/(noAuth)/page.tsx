import { About, Hero, Projects } from "@/components";

// Projects are read from MongoDB during render. Without this the page is
// statically generated at build time and new projects never appear until the
// next deploy.
export const revalidate = 60;

export default function HomePage() {

  return (
    <main className="w-full">
      <Hero />
      <About />
      <Projects />
    </main>
  )
}