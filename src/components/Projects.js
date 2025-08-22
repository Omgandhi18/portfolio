import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TransloImage from "../assets/Translo.png";
import OinkImage from "../assets/Oink.png";
import OGWeather from "../assets/OG Weather.png";
import ScrollReveal from "../Animations/ScrollReveal";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full glass rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 dark:border-white/10"
        whileHover={{ 
          scale: 1.02,
          rotateX: 5,
          rotateY: 5,
          z: 50
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-coral-500/10 via-salmon-pink-500/10 to-tea-green-500/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image section */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Floating tech tags */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.6, delay: (index * 0.2) + 0.4 }}
          >
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/30"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: (index * 0.2) + (techIndex * 0.1) + 0.6 
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content section */}
        <div className="relative z-20 p-8">
          <motion.h3 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: (index * 0.2) + 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-6 font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: (index * 0.2) + 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: (index * 0.2) + 0.5 }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-coral-600 to-salmon-pink-600 text-white rounded-xl font-semibold font-inter overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-salmon-pink-600 to-coral-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">View Project</span>
              <motion.svg 
                className="w-4 h-4 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.a>
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold font-inter"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(99, 102, 241, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>GitHub</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const projects = [
    {
      title: "Translo",
      description: "A powerful language translation app leveraging Google's MLKit to seamlessly translate text into over 50 languages with real-time accuracy and beautiful UI.",
      imageUrl: TransloImage,
      link: "https://apps.apple.com/gb/app/translo/id6659895212",
      technologies: ["Swift", "MLKit", "SwiftUI", "Core Data"],
      github: null
    },
    {
      title: "Oink!",
      description: "An innovative digital piggy bank app that gamifies savings with beautiful animations, goal tracking, and smart financial insights to help users build better money habits.",
      imageUrl: OinkImage,
      link: "https://apps.apple.com/gb/app/campus-coin/id6705128036",
      technologies: ["SwiftUI", "Core Data", "CloudKit", "WidgetKit"],
      github: null
    },
    {
      title: "OG Weather",
      description: "An immersive weather experience using CoreLocation and SceneKit to display real-time weather conditions through stunning 3D models and interactive environments.",
      imageUrl: OGWeather,
      link: "https://github.com/Omgandhi18/WeatherAppNew",
      technologies: ["Swift", "SceneKit", "CoreLocation", "WeatherKit"],
      github: "https://github.com/Omgandhi18/WeatherAppNew"
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      id="projects"
      className="relative py-20 px-4 sm:px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white dark:from-stone-900 dark:to-stone-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-salmon-pink-50/50 via-transparent to-coral-50/50 dark:from-salmon-pink-950/20 dark:via-transparent dark:to-coral-950/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-coral-500 to-salmon-pink-600 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          style={{ y }}
        >
          <ScrollReveal>
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-inter mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-coral-500 via-coral-600 to-salmon-pink-600 dark:from-white dark:via-coral-200 dark:to-salmon-pink-200 bg-clip-text text-transparent">
                My Projects
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A showcase of my latest work in 
              <span className="text-gradient font-semibold"> mobile development</span> and 
              <span className="text-gradient font-semibold"> creative solutions</span>.
            </motion.p>
          </ScrollReveal>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Call to action */}
        <ScrollReveal delay={0.8}>
          <motion.div 
            className="text-center mt-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-inter"
            >
              Interested in seeing more of my work?
            </motion.p>
            <motion.a
              href="https://github.com/Omgandhi18"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-2xl font-semibold font-inter"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Projects</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </motion.div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default Projects;