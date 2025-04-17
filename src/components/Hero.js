import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll"; 
import { TypeAnimation } from 'react-type-animation';


const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 bg-white"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-black mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
          <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Hi, I'm Om 👋",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Hi, I'm a FrontEnd Dev 💻",
            1000,
            "Hi, I'm a Mobile Dev 📱",
            1000,
        ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
          />
        
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-600 max-w-xl mb-8"
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
        offset={-80} // adjust for navbar height
      >
      <motion.button
        className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        View My Work
      </motion.button>
</Link>
    </section>
  );
};

export default Hero;
