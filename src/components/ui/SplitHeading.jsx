import { motion } from "framer-motion";
import { EASE } from "../../lib/motion";

/* Words rise out of a slot, one after another, like letters being
   cut into stone in sequence. The text stays real text. */
export default function SplitHeading({ text, as = "h2", className = "", delay = 0, stagger = 0.07, id }) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%", rotate: 4 }, shown: { y: "0%", rotate: 0 } }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
