"use client"

import Image from "next/image"
import Link from "next/link"
import { SOCIAL_LINKS, UP_ARROW_IMAGE } from "@/constants"
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaSquareXTwitter } from "@/constants"

const Footer = () => {
  return (
    <footer className="border-t-2 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center p-8 mt-12">
      {/* Social Links */}
      <div>
        <ul className="flex flex-row gap-2 text-gray-800">
          {
            SOCIAL_LINKS.map((link, index) => (
              <li key={index}>
                <Link href={link.href} target="_blank">
                  {link.name === "Github" && <FaGithub className="text-2xl" />}
                  {link.name === "Linkedin" && <FaLinkedin className="text-2xl" />}
                  {link.name === "Twitter" && <FaSquareXTwitter className="text-2xl" />}
                  {link.name === "Instagram" && <FaInstagram className="text-2xl" />}
                  {link.name === "Email" && <FaEnvelope className="text-2xl" />}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <p className="text-sm text-gray-500 text-center my-2 sm:my-0">Developed with ❤️ by <span className="font-semibold">Sorbopriyo Roy</span></p>

      <div className="text-sm">
        <button className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <Image src={UP_ARROW_IMAGE} alt="up-arrow" width={16} height={16} />
        </button>
      </div>
    </footer>
  )
}

export default Footer