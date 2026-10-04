import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { voyage } from "../../data/experience";
import { EASE } from "../../lib/motion";
import Island from "../art/Islands";
import Trireme from "../art/Trireme";
import Decrypt from "../ui/Decrypt";
import SplitHeading from "../ui/SplitHeading";

/* The career as a sea route. The route is drawn through the islands
   actually on the page (measured, not guessed), inked in as you scroll,
   and the ship sails it. */

/* Each point carries the side of its island it moors on (-1 left, 1 right);
   the curve leaves and arrives on that side, so it swings wide of the
   islands and changes sides in open water between them. */
function routeThrough(points, bulge) {
  if (!points.length) return "";
  const [first, ...rest] = points;
  let d = `M${first.x} ${first.y}`;
  let prev = first;
  rest.forEach((p) => {
    const dy = p.y - prev.y;
    d += ` C${prev.x + prev.side * bulge} ${prev.y + dy * 0.4} ${p.x + p.side * bulge} ${p.y - dy * 0.4} ${p.x} ${p.y}`;
    prev = p;
  });
  return d;
}

function Stop({ stop, index, active }) {
  const right = index % 2 === 1;
  return (
    <li className="relative grid grid-cols-[76px_minmax(0,1fr)] gap-x-4 lg:grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)] lg:gap-x-10">
      <div
        data-island
        className={`relative row-start-1 self-start pt-1 lg:col-start-2 lg:pt-0 ${
          active ? "text-accent" : ""
        }`}
      >
        <motion.div
          animate={{ scale: active ? 1.06 : 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className={`absolute inset-[-12%] rounded-full transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}
            style={{ background: "radial-gradient(closest-side, rgb(var(--c-accent) / 0.16), transparent)" }}
          />
          <Island kind={stop.island} className="relative w-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE }}
        className={`row-start-1 col-start-2 ${stop.present ? "pb-8" : "pb-24 sm:pb-32 lg:pb-40"} ${
          right ? "lg:col-start-3" : "lg:col-start-1 lg:text-right"
        }`}
      >
        <Decrypt
          greek={stop.place.greek}
          english={stop.place.english}
          delay={250}
          className="text-xs font-bold uppercase tracking-inscription text-accent"
        />
        <p className="mt-2 text-sm text-muted">
          {stop.when}
          <span className="mx-2 text-accent/70" aria-hidden="true">
            /
          </span>
          {stop.where}
        </p>
        <div className="mt-6 space-y-8">
          {stop.roles.map((role) => (
            <div key={role.title}>
              <h3 className="font-display text-[1.9rem] font-normal leading-[1.08] text-ink sm:text-[2.3rem]">{role.title}</h3>
              <p className="mt-1.5 text-sm font-semibold text-ink/80">{role.org}</p>
              {role.notes.length > 0 && (
                <ul className={`mt-4 space-y-2 text-[0.97rem] leading-relaxed text-muted ${right ? "" : "lg:ml-auto"} max-w-[46ch]`}>
                  {role.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </li>
  );
}

export default function Voyage() {
  const reduced = useReducedMotion();
  const mapRef = useRef(null);
  const pathRef = useRef(null);
  const [route, setRoute] = useState({ d: "", w: 0, h: 0 });
  const [active, setActive] = useState(0);

  const shipX = useMotionValue(0);
  const shipY = useMotionValue(0);
  const shipFace = useMotionValue(1);

  const { scrollYProgress } = useScroll({ target: mapRef, offset: ["start 62%", "end 70%"] });
  const inked = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  const measure = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const box = map.getBoundingClientRect();
    const wide = innerWidth >= 1024;
    // Moor beside each island, on the side facing its story; on narrow
    // screens the route runs straight down the island column instead.
    const pts = [...map.querySelectorAll("[data-island]")].map((el, i) => {
      const r = el.getBoundingClientRect();
      const cx = r.left - box.left + r.width / 2;
      const side = i % 2 === 0 ? -1 : 1;
      if (!wide) return { x: cx, y: r.top - box.top + r.height * 1.25, side: side * 0.6 };
      return { x: cx + side * r.width * 0.5, y: r.top - box.top + r.height * 0.86, side };
    });
    if (!pts.length) return;
    const start = { x: wide ? box.width / 2 : pts[0].x, y: Math.max(0, pts[0].y - (wide ? 260 : 150)), side: 0 };
    setRoute({ d: routeThrough([start, ...pts], wide ? 70 : 26), w: box.width, h: box.height });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    ro.observe(mapRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const place = useCallback(
    (p) => {
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      if (!len) return;
      const at = Math.min(len, Math.max(0, p * len));
      const pt = path.getPointAtLength(at);
      const ahead = path.getPointAtLength(Math.min(len, at + 6));
      shipX.set(pt.x);
      shipY.set(pt.y);
      if (Math.abs(ahead.x - pt.x) > 0.6) shipFace.set(ahead.x < pt.x ? -1 : 1);
      const islands = mapRef.current?.querySelectorAll("[data-island]") ?? [];
      const box = mapRef.current.getBoundingClientRect();
      let nearest = 0;
      let best = Infinity;
      islands.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top - box.top + r.height * 0.86 - pt.y);
        if (dist < best) {
          best = dist;
          nearest = i;
        }
      });
      setActive((a) => (a === nearest ? a : nearest));
    },
    [shipX, shipY, shipFace]
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => place(reduced ? 1 : p));
  useEffect(() => {
    place(reduced ? 1 : scrollYProgress.get());
  }, [route, place, reduced, scrollYProgress]);

  return (
    <section id="poreia" aria-labelledby="poreia-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-40">
      <span aria-hidden="true" className="ghost-word absolute right-[-2%] top-6 text-[clamp(6rem,18vw,17rem)]">
        ΠΟΡΕΙΑ
      </span>
      <div className="relative mx-auto max-w-site px-5 sm:px-10">
        <div className="max-w-[40rem]">
          <SplitHeading
            id="poreia-title"
            text="The voyage so far."
            className="font-display text-[clamp(2.8rem,6vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.015em] text-ink"
          />
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">
            From a harbour in Gujarat, to the far north of the map, and home again with a crew of my own.
          </p>
        </div>

        <div ref={mapRef} className="relative mt-24 sm:mt-32">
          {/* the sea, faintly ruled */}
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <pattern id="sea" width="64" height="40" patternUnits="userSpaceOnUse">
                <path d="M4 20 Q12 15 20 20 T36 20" fill="none" stroke="var(--sea-line)" strokeWidth="1.1" />
                <path d="M36 36 Q44 31 52 36" fill="none" stroke="var(--sea-line)" strokeWidth="1.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sea)" />
          </svg>

          {route.d && (
            <svg
              aria-hidden="true"
              width={route.w}
              height={route.h}
              viewBox={`0 0 ${route.w} ${route.h}`}
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
            >
              <path ref={pathRef} d={route.d} fill="none" stroke="rgb(var(--c-ink) / 0.18)" strokeWidth="1.4" strokeDasharray="2 7" strokeLinecap="round" />
              <motion.path
                d={route.d}
                fill="none"
                stroke="rgb(var(--c-accent))"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: reduced ? 1 : inked }}
              />
            </svg>
          )}

          <ol className="relative">
            {voyage.map((stop, i) => (
              <Stop key={stop.id} stop={stop} index={i} active={i === active} />
            ))}
          </ol>

          {route.d && (
            <motion.div
              aria-hidden="true"
              style={{ x: shipX, y: shipY }}
              className="pointer-events-none absolute left-0 top-0 z-[1]"
            >
              <div className="-translate-x-1/2 -translate-y-[78%]">
                <motion.div style={{ scaleX: shipFace }}>
                  <Trireme className="w-16 drop-shadow-sm sm:w-20 lg:w-28" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
