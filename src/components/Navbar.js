import React, { useState } from "react";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-stone-950 py-4 px-4 md:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-condiment text-black dark:text-white">Om Gandhi</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-lg text-gray-700 dark:text-gray-300 items-center font-montserrat">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            Projects
          </Link>
          <Link
            to="experience"
            smooth={true}
            duration={500}
            className="hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            Experience
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            Contact
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-950 py-4 px-4 mt-2 rounded-lg shadow-lg transition-colors duration-300 font-montserrat">
          <div className="flex flex-col space-y-4">
            
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-black dark:hover:text-white transition py-2 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="hover:text-black dark:hover:text-white transition py-2 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={closeMenu}
            >
              Projects
            </Link>
            <Link
              to="experience"
              smooth={true}
              duration={500}
              className="hover:text-black dark:hover:text-white transition py-2 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={closeMenu}
            >
              Experience
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="hover:text-black dark:hover:text-white transition py-2 cursor-pointer text-gray-700 dark:text-gray-300"
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