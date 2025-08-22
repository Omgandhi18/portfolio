import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import experience from "../data/experience";
import ScrollReveal from "../Animations/ScrollReveal";

const ExperienceCard = ({ item, index, isLast }) => {
  const cardRef = useRef();
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative flex items-start group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center mr-6 relative">
        {/* Timeline dot */}
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-coral-500 to-tea-green-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg relative z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: (index * 0.2) + 0.3 }}
          whileHover={{ scale: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-coral-500 to-tea-green-600 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Timeline line */}
        {!isLast && (
          <motion.div
            className="w-0.5 h-32 bg-gradient-to-b from-coral-500 to-tea-green-600 mt-2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: (index * 0.2) + 0.5 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        className="flex-1 glass rounded-2xl p-6 backdrop-blur-xl border border-white/20 dark:border-white/10 group-hover:border-coral-500/30 transition-all duration-300"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: (index * 0.2) + 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
              {item.role}
            </h3>
            <p className="text-lg text-gradient font-semibold font-inter">
              @ {item.company}
            </p>
          </motion.div>
          
          <motion.div
            className="mt-2 sm:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: (index * 0.2) + 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-coral-500/10 to-tea-green-500/10 text-coral-600 dark:text-coral-400 border border-coral-500/20">
              {item.duration}
            </span>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="text-gray-600 dark:text-gray-300 leading-relaxed font-inter"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: (index * 0.2) + 0.6 }}
        >
          {item.description}
        </motion.p>

        {/* Skills/Technologies (if available) */}
        {item.technologies && (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: (index * 0.2) + 0.7 }}
          >
            {item.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg font-medium"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: (index * 0.2) + 0.8 + (techIndex * 0.05) 
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Hover effect shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 rounded-2xl"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.section
      ref={containerRef}
      id="experience"
      className="relative py-20 px-4 sm:px-6 md:px-16 bg-gradient-to-b from-white to-gray-50 dark:from-stone-950 dark:to-stone-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-50/30 via-transparent to-tea-green-50/30 dark:from-coral-950/20 dark:via-transparent dark:to-tea-green-950/20" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-coral-500 to-tea-green-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
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
                        <span className="bg-gradient-to-r from-gray-900 via-tea-green-600 to-sandy-brown-600 dark:from-white dark:via-tea-green-200 dark:to-sandy-brown-200 bg-clip-text text-transparent">
            Experience
          </span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              My professional journey through
              <span className="text-gradient font-semibold"> innovative technologies</span> and 
              <span className="text-gradient font-semibold"> collaborative teams</span>.
            </motion.p>
          </ScrollReveal>
        </motion.div>
        
        {/* Timeline */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {experience.map((item, index) => (
            <ExperienceCard
              key={index}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <ScrollReveal delay={0.8}>
          <motion.div 
            className="mt-20 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { number: "3+", label: "Years of Development" },
                { number: "10+", label: "Technologies Mastered" },
                { number: "50+", label: "Projects Contributed" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-2xl p-6 backdrop-blur-xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-gradient font-inter mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-400 font-inter">
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

export default Experience;