import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-center lg:justify-between w-screen p-8 border-b-[1px] border-gray-800">
      <h1>Sorbopriyo <span className="text-teal-500">Roy</span></h1>
      <div className="flex flex-row items-center justify-center gap-5 text-sm text-gray-500">
        <Link className="hover:text-gray-300 transition-colors lg:block hidden" href='https://github.com/SobujRoySunday'>Github</Link>
        <Link className="hover:text-gray-300 transition-colors lg:block hidden" href='https://www.instagram.com/i.am.sobuj/'>Instagram</Link>
        <Link className="hover:text-gray-300 transition-colors lg:block hidden" href='https://www.linkedin.com/in/sorbopriyo/'>LinkedIn</Link>
      </div>
    </nav>
  )
}

export default Navbar