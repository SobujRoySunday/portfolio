"use client"

const Footer = () => {
  return (
    <div className="border-t-2 flex flex-row justify-between items-center p-8 mt-24">
      {/* Social Links */}
      <div>
        <ul className="flex flex-row gap-2 w-[120px]">
          <li><a href="https://github.com/SobujRoySunday" target="_blank"><img src="assets/github.png" /></a></li>
          <li><a href="https://www.linkedin.com/in/sorbopriyo/" target="_blank"><img src="assets/linkedin.png" /></a></li>
          <li><a href="https://twitter.com/SobujRoySunday" target="_blank"><img src="assets/twitter.png" /></a></li>
          <li><a href="https://www.instagram.com/i.am.sobuj/" target="_blank"><img src="assets/instagram.png" /></a></li>
        </ul>
      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-500">© 2024. Sorbopriyo Roy. All rights reserved.</p>

      {/* Back to top */}
      <div className="w-[120px] text-sm">
        <button className="flex items-center justify-around w-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <img src="assets/up-arrow.png" /></button>
      </div>
    </div>
  )
}

export default Footer