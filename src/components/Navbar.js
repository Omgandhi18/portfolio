import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              className="text-2xl md:text-3xl font-bold font-inter"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent">
                Om Gandhi
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    className="relative px-4 py-2 text-gray-700 font-medium font-inter cursor-pointer group"
                  >
                    <motion.span
                      className="relative z-10 transition-colors duration-200 group-hover:text-gray-900"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-coral-500/10 to-coral-600/10 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle - Removed for white theme
              <motion.div
                className="ml-4 p-3 rounded-xl bg-gray-100 border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-5 h-5 text-coral-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </motion.div> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Hamburger Button */}
              <motion.button
                className="p-2 rounded-xl bg-gray-100 border border-gray-200"
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 }
                    }}
                    className="w-6 h-0.5 bg-gray-700 block mb-1.5 transform origin-center transition-all duration-100"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-6 h-0.5 bg-gray-700 block mb-1.5 transform origin-center transition-all duration-100"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 }
                    }}
                    className="w-6 h-0.5 bg-gray-700 block transform origin-center transition-all duration-100"
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Mobile Menu */}
        <div className={`absolute top-20 right-4 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-12'}`}>
          <div className="p-6 space-y-4 min-w-[200px]">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className={`transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className="block py-3 px-4 text-gray-700 hover:text-gray-900 font-medium font-inter cursor-pointer rounded-xl hover:bg-coral-50 transition-all duration-200"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;