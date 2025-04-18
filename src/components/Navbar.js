import React, { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-semibold text-black">Om Gandhi</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-lg text-gray-700">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="hover:text-black transition cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="hover:text-black transition cursor-pointer"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="hover:text-black transition cursor-pointer"
          >
            Projects
          </Link>
          <Link
            to="experience"
            smooth={true}
            duration={500}
            className="hover:text-black transition cursor-pointer"
          >
            Experience
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="hover:text-black transition cursor-pointer"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 mt-2 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="hover:text-black transition py-2 cursor-pointer"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-black transition py-2 cursor-pointer"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="hover:text-black transition py-2 cursor-pointer"
              onClick={closeMenu}
            >
              Projects
            </Link>
            <Link
              to="experience"
              smooth={true}
              duration={500}
              className="hover:text-black transition py-2 cursor-pointer"
              onClick={closeMenu}
            >
              Experience
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="hover:text-black transition py-2 cursor-pointer"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;