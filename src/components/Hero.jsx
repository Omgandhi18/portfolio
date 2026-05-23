import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AsciiTorus from "./AsciiTorus";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Only one torus instance is ever mounted at a time — no wasted RAF loops
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const fn = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return isDesktop;
}

export default function Hero() {
  const isDesktop = useIsDesktop();

  return (
    <section className="relative min-h-[88vh] md:min-h-screen flex items-center section-padding pt-20 pb-12 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,95,31,0.09) 0%, rgba(224,64,251,0.07) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Mobile: torus as a low-alpha background ── */}
      {!isDesktop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ opacity: 0.13 }}
        >
          <AsciiTorus cols={46} rows={26} />
        </motion.div>
      )}

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">

        {/* ── Text content ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-3"
        >
          <motion.p
            variants={item}
            className="text-xs font-satoshi tracking-widest uppercase text-text-muted mb-6"
          >
            Available for new opportunities
          </motion.p>

          <motion.h1
            variants={item}
            className="font-clash font-bold leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
          >
            Om
            <br />
            <span className="text-gradient-animated">Gandhi</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-satoshi text-lg md:text-xl text-text-muted max-w-lg mb-4"
          >
            Senior Mobile Engineer · iOS · Android · React Native
          </motion.p>

          <motion.p
            variants={item}
            className="font-satoshi text-sm text-text-muted max-w-md mb-10 leading-relaxed"
          >
            Mobile-first technical leader with 3+ years shipping production iOS,
            macOS, and React Native apps. I architect scalable systems, lead teams,
            and obsess over on-device performance.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="font-satoshi font-medium px-6 py-3 rounded-full text-sm text-white transition-opacity duration-200 hover:opacity-85"
              style={{ background: "linear-gradient(135deg, #FF5F1F, #E040FB)" }}
            >
              View Work
            </a>
            <a
              href="#contact"
              className="font-satoshi font-medium px-6 py-3 rounded-full text-sm border border-white/15 text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* ── Desktop: torus in right column ── */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="lg:col-span-2 flex justify-center items-center relative"
          >
            <div className="absolute top-0 right-0 text-[10px] font-satoshi tracking-widest uppercase text-text-muted opacity-35 select-none pointer-events-none">
              SWIFT · RN · TS
            </div>
            <AsciiTorus cols={60} rows={30} />
          </motion.div>
        )}

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-text-muted font-satoshi tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-accent-orange to-transparent"
        />
      </motion.div>
    </section>
  );
}
