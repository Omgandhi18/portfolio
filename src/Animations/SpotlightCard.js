import { useRef } from "react";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-3xl border border-neutral-300 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 p-8 overflow-hidden group ${className} transition-transform transform hover:scale-105 duration-300`}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--spotlight-color": spotlightColor,
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-60 group-focus-within:opacity-60 pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)",
        }}
      ></div>
      {children}
    </div>
  );
};

export default SpotlightCard;