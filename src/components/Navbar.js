import React from "react";
import { Link } from "react-scroll";  // for smooth scroll

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold text-black">Om Gandhi</div>

        <div className="space-x-8 text-lg text-gray-700">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="hover:text-black transition"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="hover:text-black transition"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="hover:text-black transition"
          >
            Projects
          </Link>
          <Link
            to="experience"
            smooth={true}
            duration={500}
            className="hover:text-black transition"
          >
            Experience
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="hover:text-black transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
