import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll"; 
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 md:px-16 bg-transparent"
    >
      <motion.div
        className="w-full md:max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-4 h-16 sm:h-20 md:h-24 overflow-hidden">
          <TypeAnimation
            sequence={[
              "Hi, I'm Om 👋",
              1000,
              "Hi, I'm a Front End Dev 💻",
              1000,
              "Hi, I'm a Mobile Dev 📱",
              1000,
            ]}
            wrapper="span"
            speed={50}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white"
            repeat={Infinity}
          />
        </div>
      </motion.div>

      <motion.p
        className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-8 font-montserrat"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        I design and build clean, delightful digital experiences. I'm passionate
        about design, development, and making tech feel like magic.
      </motion.p>
      
      <Link
        to="projects"
        smooth={true}
        duration={600}
        offset={-80}
        className="cursor-pointer"
      >
        <motion.button
          className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 sm:px-6 sm:py-3 rounded-full font-montserrat hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>
      </Link>
    </section>
  );
};

export default Hero;