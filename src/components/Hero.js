import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll"; 
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import HeroImage from "../assets/Hero.png"; // Placeholder for hero image

const FloatingOrb = ({ delay = 0, duration = 4, className = "" }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r from-coral-500/15 to-coral-600/15 blur-xl ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GlowingCard = ({ children, className = "" }) => (
  <motion.div
    className={`bg-white rounded-3xl p-8 backdrop-blur-lg border border-gray-100 shadow-xl ${className}`}
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(255, 127, 81, 0.15)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {children}
  </motion.div>
);

const ParticleField = () => {
  const particlesRef = useRef();
  
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-coral-500 to-coral-600 rounded-full opacity-20';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      if (particlesRef.current) {
        particlesRef.current.appendChild(particle);
        
        setTimeout(() => {
          if (particlesRef.current && particlesRef.current.contains(particle)) {
            particlesRef.current.removeChild(particle);
          }
        }, 7000);
      }
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  return <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
};

const Hero = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 md:px-16 overflow-hidden bg-white"
      style={{ y, opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50" />
      <ParticleField />
      
      {/* Floating Orbs */}
      <FloatingOrb className="w-32 h-32 top-20 right-20" delay={0} />
      <FloatingOrb className="w-24 h-24 top-40 left-16" delay={1} />
      <FloatingOrb className="w-20 h-20 bottom-32 right-32" delay={2} />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <motion.div 
              className="mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <TypeAnimation
                sequence={[
                  "नमस्ते! 🙏🏻",
                  1500,
                  "Hey, I'm Om! 👋",
                  1500,
                  "Frontend Developer 💻",
                  1500,
                  "Mobile App Creator 📱",
                  1500,
                  "UI Enthusiast 🎨",
                  1500,
                ]}
                wrapper="h1"
                speed={50}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-inter leading-tight text-gray-900"
                style={{
                  background: 'linear-gradient(135deg, #ff7f51 0%, #ff6b47 25%, #ff5a3d 50%, #ff4533 75%, #ff3029 100%)',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite'
                }}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mb-8 font-inter leading-relaxed"
              variants={itemVariants}
            >
              Crafting <span className="text-coral-500 font-semibold">digital experiences</span> that 
              blend creativity with functionality. I turn ideas into 
              <span className="text-coral-500 font-semibold"> beautiful interfaces</span> and 
              robust applications.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link
                to="projects"
                smooth={true}
                duration={600}
                offset={-80}
                className="cursor-pointer"
              >
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-coral-500 to-coral-600 text-white font-semibold rounded-2xl overflow-hidden font-inter shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 127, 81, 0.25)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-coral-600 to-coral-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">View My Work</span>
                </motion.button>
              </Link>

              <Link
                to="contact"
                smooth={true}
                duration={600}
                offset={-80}
                className="cursor-pointer"
              >
                <motion.button
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl font-inter backdrop-blur-sm hover:bg-gray-50"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderColor: "rgba(255, 127, 81, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Let's Connect
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Interactive Card */}
          <motion.div 
            className="lg:col-span-5 flex justify-center mt-8 lg:mt-0"
            variants={itemVariants}
          >
            <GlowingCard className="w-full max-w-sm sm:max-w-md">
              <div className="text-center space-y-4 sm:space-y-6">
                {/* Circular Profile Image */}
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-lg border-3 border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Replace with your actual image */}
                  <img 
                    src={HeroImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-inter mb-2">
                    Ready to Build
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-inter">
                    Currently open for exciting projects and collaborations
                  </p>
                </div>
                <br></br>
                <p className="text-xs sm:text-sm text-gray-500 font-inter">
                  Scroll to explore
                </p>
                
                {/* Scroll Indicator - moved inside card */}
                <motion.div
                  className="flex justify-center pt-2 sm:pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <motion.div
                    className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-gradient-to-b from-coral-500 to-coral-600 rounded-full mt-1.5 sm:mt-2"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
                
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;