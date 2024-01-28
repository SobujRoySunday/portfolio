import React from "react";
import "./Header.css";

function Header() {
  return (
    <header>
      <img src="me.jpeg" className="header-image" alt="" />
      <h1>Hi, I&lsquo;m Sorbopriyo 👋</h1>
      <h4>Full Stack Developer</h4>
      <div className="header-buttons">
        <a className="header-buttons-1" href="mailto:sorbopriyo@gmail.com">
          Hire me
        </a>
        <a
          className="header-buttons-2"
          href="./content/resume.pdf"
          target="_BLANK"
          rel="noreferrer"
        >
          My Resume
        </a>
      </div>
    </header>
  );
}

export default Header;
