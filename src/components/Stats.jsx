import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { raw: "3+",   prefix: "",  num: 3,   suffix: "+", label: "Years shipping production apps" },
  { raw: "500+", prefix: "",  num: 500, suffix: "+", label: "Business customers served" },
  { raw: "5",    prefix: "",  num: 5,   suffix: "",  label: "Engineers led across 2 tracks" },
  { raw: "~80%", prefix: "~", num: 80,  suffix: "%", label: "Bug reduction in first quarter" },
];

function AnimatedStat({ stat, index }) {
  const ref     = useRef(null);
  const numRef  = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const ctrl = animate(0, stat.num, {
      duration: 1.6,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (numRef.current) {
          numRef.current.textContent =
            stat.prefix + Math.round(v) + stat.suffix;
        }
      },
    });
    return ctrl.stop;
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className="flex flex-col gap-2 md:px-10 first:pl-0 last:pr-0"
    >
      {/* Thin gradient line above number */}
      <div
        className="w-8 h-[2px] mb-1"
        style={{ background: "linear-gradient(90deg, #FF5F1F, #E040FB)" }}
      />
      <span
        ref={numRef}
        className="font-clash font-bold leading-none text-gradient-animated"
        style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
      >
        {stat.prefix}0{stat.suffix}
      </span>
      <span className="font-satoshi text-xs text-text-muted leading-snug max-w-[140px]">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="section-padding py-14 border-y border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-white/5">
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
