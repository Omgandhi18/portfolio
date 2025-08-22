import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaCode, FaCoffee } from "react-icons/fa";
import ScrollReveal from "../Animations/ScrollReveal";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-gray-900 to-gray-800 dark:from-stone-950 dark:to-stone-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-12">
        <ScrollReveal direction="up" delay={0.1} threshold={0.1}>
          <div className="text-center space-y-6">
            {/* Logo/Name */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold font-inter">
                <span className="bg-gradient-to-r from-coral-400 to-tea-green-500 bg-clip-text text-transparent">
                  Om Gandhi
                </span>
              </h3>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-gray-300 text-lg font-inter max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Crafting digital experiences with passion and precision
            </motion.p>

            {/* Made with love section */}
            <motion.div
              className="flex items-center justify-center gap-2 text-gray-400 font-inter"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span>using</span>
              <motion.div
                animate={{ 
                  y: [0, -3, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaCode className="text-coral-400" />
              </motion.div>
              <span>and</span>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaCoffee className="text-yellow-600" />
              </motion.div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {['React', 'Tailwind', 'Framer Motion', 'Three.js'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm font-inter">
                © {currentYear} Om Gandhi. All rights reserved.
              </p>
              <motion.p
                className="text-gray-500 text-xs mt-2 font-inter"
                whileHover={{ color: "#9CA3AF" }}
              >
                Designed & Developed in India 🇮🇳
              </motion.p>
            </motion.div>

            {/* Floating particles for footer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-coral-400 to-tea-green-500 rounded-full opacity-30"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${30 + (i * 10)}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + (i * 0.5),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;