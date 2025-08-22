import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "../Animations/ScrollReveal";

const SkillCard = ({ skill, delay = 0 }) => {
  const cardRef = useRef();
  const isInView = useInView(cardRef, { once: true });
  
  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 overflow-hidden shadow-lg"
        whileHover={{ 
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-coral-500/10 via-salmon-pink-500/10 to-tea-green-500/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating icon container */}
        <motion.div
          className="relative z-10 mb-6"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 0.5
          }}
        >
          <div className={`inline-block p-4 rounded-2xl text-white text-3xl shadow-xl ${
            skill.title === "Frontend Development" ? "bg-gradient-to-r from-coral-500 to-coral-600" :
            skill.title === "Mobile Development" ? "bg-gradient-to-r from-salmon-pink-500 to-salmon-pink-600" :
            skill.title === "Backend & Data" ? "bg-gradient-to-r from-tea-green-500 to-tea-green-600" :
            skill.title === "Design & Tools" ? "bg-gradient-to-r from-sandy-brown-500 to-sandy-brown-600" :
            skill.title === "Creative Pursuits" ? "bg-gradient-to-r from-blush-500 to-blush-600" :
            "bg-gradient-to-r from-coral-500 to-salmon-pink-500"
          }`}>
            {skill.icon}
          </div>
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10 font-inter">
          {skill.title}
        </h3>
        
        <div className="space-y-2 relative z-10">
          {skill.items.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center text-gray-700 dark:text-gray-200 font-inter"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: delay + (index * 0.1) }}
            >
              <motion.div
                className="w-2 h-2 bg-gradient-to-r from-coral-500 to-salmon-pink-600 rounded-full mr-3"
                whileHover={{ scale: 1.5 }}
              />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute bg-gradient-to-r from-coral-500/20 to-salmon-pink-500/20 rounded-full blur-xl ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const About = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const skills = [
    {
      title: "Frontend Development",
      icon: "💻",
      items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Mobile Development", 
      icon: "📱",
      items: ["React Native", "SwiftUI", "Swift", "Cross-platform"]
    },
    {
      title: "Backend & Data",
      icon: "⚡",
      items: ["Python", "R", "Firebase", "API Integration"]
    },
    {
      title: "Design & Tools",
      icon: "🎨", 
      items: ["Figma", "UI/UX Design", "Prototyping", "Design Systems"]
    },
    {
      title: "Creative Pursuits",
      icon: "🌟",
      items: ["Gaming", "Movies", "Travel", "Reading"]
    },
    {
      title: "Innovation",
      icon: "🚀",
      items: ["3D Graphics", "WebGL", "Creative Coding", "Emerging Tech"]
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative py-20 px-4 sm:px-6 md:px-16 bg-gradient-to-b from-white to-gray-50 dark:from-stone-950 dark:to-stone-900 overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-50/50 via-transparent to-salmon-pink-50/50 dark:from-coral-950/20 dark:via-transparent dark:to-salmon-pink-950/20" />
      
      {/* Floating Shapes */}
      <FloatingShape className="w-24 h-24 top-20 right-10" delay={0} />
      <FloatingShape className="w-32 h-32 bottom-32 left-10" delay={2} />
      <FloatingShape className="w-20 h-20 top-1/2 right-1/4" delay={4} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <motion.div 
            className="text-center mb-16"
            style={{ y }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-inter mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-coral-600 to-salmon-pink-600 dark:from-white dark:via-coral-200 dark:to-salmon-pink-200 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Passionate developer crafting digital experiences with a blend of 
              <span className="text-gradient font-semibold"> creativity</span> and 
              <span className="text-gradient font-semibold"> technical expertise</span>.
            </motion.p>
          </motion.div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Stats Section */}
        <ScrollReveal delay={0.6}>
          <motion.div 
            className="mt-20 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "5+", label: "Years Experience", gradient: "from-coral-400 to-coral-600" },
                { number: "15+", label: "Projects Completed", gradient: "from-salmon-pink-400 to-salmon-pink-600" },
                { number: "10+", label: "Technologies", gradient: "from-tea-green-400 to-tea-green-600" },
                { number: "100%", label: "Commitment", gradient: "from-sandy-brown-400 to-sandy-brown-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 3 : -3 }}
                >
                  <motion.div
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent font-inter mb-2`}
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-700 dark:text-gray-200 font-inter">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default About;