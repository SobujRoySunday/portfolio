"use client"

// Import necessary modules
import { usePathname } from 'next/navigation';
import Link from "next/link";

// Header component
function Header() {
  // Get the current path using usePathname hook
  const currentPath = usePathname();

  // Return the header navigation
  return (
    <nav className="flex flex-row justify-between text-lg font-semibold p-8 leading-6">
      <h1>SORBOPRIYO ROY</h1>
      <table>
        <tbody>

          {/* Home link */}
          <tr>
            <td>{currentPath === "/" ? <img src="assets/play-button.png" className="mr-2" /> : ''}</td>
            <td>
              <Link href="/">HOME</Link>
            </td>
          </tr>
          {/* Projects link */}
          <tr>
            <td>{currentPath === "/projects" ? <img src="assets/play-button.png" className="mr-2" /> : ''}</td>
            <td>
              <Link href="/projects">PROJECTS</Link>
            </td>
          </tr>
          {/* About link */}
          <tr>
            <td>{currentPath === "/about" ? <img src="assets/play-button.png" className="mr-2" /> : ''}</td>
            <td>
              <Link href="/about">ABOUT</Link>
            </td>
          </tr>
          {/* Contact link */}
          <tr>
            <td>{currentPath === "/contact" ? <img src="assets/play-button.png" className="mr-2" /> : ''}</td>
            <td>
              <Link href="/contact">CONTACT</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </nav>
  );
}

// Export the Header component
export default Header;