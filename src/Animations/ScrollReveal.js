import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const ScrollReveal = ({ 
  children, 
  direction = "up", // "up", "down", "left", "right"
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
  threshold = 0.2
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold });
  const controls = useAnimation();
  
  // Set initial animation values based on direction
  const getDirectionValues = () => {
    switch (direction) {
      case "up": return { y: 50, opacity: 0 };
      case "down": return { y: -50, opacity: 0 };
      case "left": return { x: 50, opacity: 0 };
      case "right": return { x: -50, opacity: 0 };
      default: return { y: 50, opacity: 0 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start({ 
        x: 0, 
        y: 0, 
        opacity: 1, 
        transition: { duration, delay, ease: "easeOut" } 
      });
    }
  }, [isInView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={getDirectionValues()}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;