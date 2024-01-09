import Project from "./Project";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillSets from "./components/SkillSets";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between overflow-hidden">
      <Navbar />
      <Hero />
      <SkillSets />
      <section className="flex flex-col gap-16 p-10 w-screen justify-center items-center">
        <h1>My Projects</h1>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          <Project params={{
            image: 'https://sobujroysunday.github.io/writings/',
            name: "Writings",
            description: `This is a blog website for developer. This is only the frontend design and it doesn't have a backend. Designed this while learning frontend development.`,
            timeline: "28th December - 28th December"
          }} />
        </div>
      </section>
      <footer className="bg-gray-900 w-screen flex justify-center py-10">
        <span className="text-gray-500">Made by</span>&nbsp;Sorbopriyo Roy
      </footer>
    </main>
  )
}
