import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import ScrollReveal from "../Animations/ScrollReveal";

const ContactCard = ({ icon, label, value, href, delay = 0, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={href.startsWith('mailto:') ? '_self' : '_blank'}
      rel={href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
      className="group block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="relative glass rounded-3xl p-8 backdrop-blur-xl border border-white/20 dark:border-white/10 overflow-hidden h-full"
        whileHover={{ 
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating icon */}
        <motion.div
          className="text-5xl mb-6 relative z-10"
          animate={{ 
            y: isHovered ? -10 : 0,
            rotate: isHovered ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${color} shadow-xl`}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 0.5
            }}
          >
            <span className="text-white text-3xl">
              {icon}
            </span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-inter"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 font-inter"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.p>
        </div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ x: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.a>
  );
};

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute bg-gradient-to-r from-coral-500/20 to-salmon-pink-500/20 rounded-full blur-xl ${className}`}
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      scale: [1, 1.3, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Contact = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "omkgandhi@outlook.com",
      href: "mailto:omkgandhi@outlook.com",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "@Omgandhi18",
      href: "https://github.com/Omgandhi18",
      color: "from-gray-700 to-gray-900"
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "gandhiom",
      href: "https://www.linkedin.com/in/gandhiom/",
      color: "from-coral-600 to-coral-800"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="contact"
      className="relative py-20 px-4 sm:px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white dark:from-stone-900 dark:to-stone-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sandy-brown-50/50 via-transparent to-coral-50/50 dark:from-sandy-brown-950/20 dark:via-transparent dark:to-coral-950/20" />
      
      {/* Floating Shapes */}
      <FloatingShape className="w-32 h-32 top-20 right-10" delay={0} />
      <FloatingShape className="w-24 h-24 bottom-32 left-10" delay={3} />
      <FloatingShape className="w-28 h-28 top-1/2 right-1/4" delay={6} />

      <div className="relative z-10 max-w-6xl mx-auto">
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
              <span className="bg-gradient-to-r from-gray-900 via-sandy-brown-600 to-coral-600 dark:from-white dark:via-sandy-brown-200 dark:to-coral-200 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to collaborate on your next 
              <span className="text-gradient font-semibold"> innovative project</span>? 
              Let's create something amazing together.
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="glass rounded-2xl p-4 backdrop-blur-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-inter">
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span>Available for new opportunities</span>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <ContactCard
              key={method.label}
              {...method}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.8}>
          <motion.div 
            className="text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="glass rounded-3xl p-8 backdrop-blur-xl border border-white/20 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-inter"
                whileHover={{ scale: 1.05 }}
              >
                Start a Conversation
              </motion.h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-inter">
                Whether you have a project in mind, want to discuss opportunities, or just say hello, 
                I'd love to hear from you!
              </p>
              
              <motion.a
                href="mailto:omkgandhi@outlook.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-coral-600 to-sandy-brown-600 text-white rounded-2xl font-semibold font-inter"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
                <span>Send a Message</span>
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default Contact;