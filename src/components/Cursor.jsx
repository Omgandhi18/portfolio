import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  // Don't render on touch / coarse-pointer devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    let rafId;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onOver = (e) => {
      setHovering(!!e.target.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    // lerp ring follows dot
    function animate() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      {/* Dot — tracks instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: hovering ? "10px" : "6px",
          height: hovering ? "10px" : "6px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FF5F1F, #E040FB)",
          marginLeft: hovering ? "-5px" : "-3px",
          marginTop: hovering ? "-5px" : "-3px",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, margin 0.2s, opacity 0.3s",
        }}
      />
      {/* Ring — lerp follows */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: hovering ? "44px" : "28px",
          height: hovering ? "44px" : "28px",
          borderRadius: "50%",
          border: hovering
            ? "1.5px solid rgba(255,95,31,0.5)"
            : "1.5px solid rgba(255,255,255,0.2)",
          marginLeft: hovering ? "-22px" : "-14px",
          marginTop: hovering ? "-22px" : "-14px",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s, height 0.25s, margin 0.25s, border-color 0.25s, opacity 0.3s",
        }}
      />
    </>
  );
}
