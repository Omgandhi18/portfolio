import { motion } from "framer-motion";
import { EASE } from "../../lib/motion";

export default function Reveal({ children, delay = 0, y = 32, className, as = "div", amount = 0.25 }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
