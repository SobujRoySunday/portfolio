import Image from "next/image";
import Link from "next/link";
import Project from "./Project";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between overflow-hidden">
      <nav className="flex flex-row items-center justify-between w-screen p-8 border-b-[1px] border-gray-800">
        <h2>Sorbopriyo <span className="text-teal-500">Roy</span></h2>
        <div className="flex flex-row items-center justify-center gap-5 text-sm text-gray-500">
          <Link className="hover:text-gray-300 transition-colors" href='https://github.com/SobujRoySunday'>Github</Link>
          <Link className="hover:text-gray-300 transition-colors" href='https://www.instagram.com/i.am.sobuj/'>Instagram</Link>
          <Link className="hover:text-gray-300 transition-colors" href='https://www.linkedin.com/in/sorbopriyo/'>LinkedIn</Link>
        </div>
      </nav>
      <section className="flex flex-col justify-center items-center py-44 gap-7">
        <Image src='/dp.png' alt="profile picture" width={300} height={300} className="rounded-full border-2 border-teal-500" />
        <h1>Hi, I&apos;m Sorbopriyo 👋</h1>
        <h2 className="font-medium tracking-widest">Full stack developer</h2>
        <div className="flex justify-center items-center gap-5">
          <Link href='mailto:sorbopriyo@gmail.com' className="py-5 px-10 border-2 rounded-full hover:bg-white hover:text-gray-950 transition-all">Contact me</Link>
          <Link href='/resume.pdf' className="py-5 px-10 border-2 rounded-full border-teal-500 hover:bg-teal-500 hover:text-gray-950 transition-all" target="_blank">My Resume</Link>
        </div>
      </section>
      <section className="flex text-3xl font-extralight justify-evenly w-screen tracking-widest py-20 bg-gray-900">
        <p>DEVELOPER</p>
        <p>FITNESS</p>
        <p>SINGING</p>
        <p>SWIMMING</p>
      </section>
      <section className="flex flex-col gap-16 p-20 w-screen justify-center items-center">
        <h1>My Projects</h1>
        <div className="flex flex-wrap gap-10 justify-center items-center">
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
