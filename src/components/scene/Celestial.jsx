/* Sun by day, moon by night, hung in the same place: over the summit. */
function Glow({ size, background }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      <div className="glow-breathe h-full w-full rounded-full" style={{ background }} />
    </div>
  );
}

export function Sun({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute dark:hidden ${className}`}>
      <Glow
        size="52vmin"
        background="radial-gradient(closest-side, var(--sun-glow), rgba(255,238,205,0.28) 42%, rgba(255,238,205,0) 100%)"
      />
      <div
        className="relative h-[7.5vmin] w-[7.5vmin] rounded-full"
        style={{
          background: "radial-gradient(circle at 42% 40%, #fffcf4, #fcefd6 62%, #f7e1bd)",
          boxShadow: "0 0 50px 16px rgba(255, 238, 205, 0.6)",
        }}
      />
    </div>
  );
}

export function Moon({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute hidden dark:block ${className}`}>
      <Glow
        size="40vmin"
        background="radial-gradient(closest-side, rgba(190, 206, 236, 0.2), rgba(190,206,236,0.05) 55%, rgba(190,206,236,0) 100%)"
      />
      <div className="relative h-[6.5vmin] w-[6.5vmin]">
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "inset -1.5vmin 0.6vmin 0 0 #e6eaf1", filter: "drop-shadow(0 0 14px rgba(200,214,240,0.45))" }}
        />
      </div>
    </div>
  );
}
