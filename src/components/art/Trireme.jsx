import { OmegaGlyph } from "../ui/OmegaMark";

/* A trireme under sail, the painted eye on her bow, Ω on the canvas.
   Drawn facing right. */
export default function Trireme({ className = "" }) {
  return (
    <svg viewBox="0 0 140 92" className={className} aria-hidden="true">
      <g className="bob">
        {/* sail and rigging */}
        <path d="M68 8 V62" stroke="rgb(var(--c-ink))" strokeWidth="1.6" />
        <path d="M44 14 H92" stroke="rgb(var(--c-ink))" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M45 15 C41 26 41 38 46 50 C60 55 76 55 90 50 C95 38 95 26 91 15 Z"
          fill="rgb(var(--c-surface))"
          stroke="rgb(var(--c-ink))"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M45 15 C41 26 41 38 46 50 C60 55 76 55 90 50 C95 38 95 26 91 15 Z" fill="rgb(var(--c-accent) / 0.16)" />
        {/* a 22-unit Ω centred on the mast, sitting on y=42 */}
        <OmegaGlyph x="59.75" y="26.4" width="16.5" height="15.6" fill="rgb(var(--c-accent))" />
        <path d="M68 8 L78 10 L68 12" fill="rgb(var(--c-accent))" />
        <path d="M46 50 L30 60 M90 50 L110 60" stroke="rgb(var(--c-ink) / 0.5)" strokeWidth="0.8" />
        {/* hull: curling stern on the left, ram on the right */}
        <path
          d="M14 58 C30 64 92 66 118 58 L132 62 L116 70 C92 76 40 76 22 68 C14 64 8 56 10 48 C11 44 16 44 16 48 C15 52 15 55 14 58 Z"
          fill="rgb(var(--c-surface))"
          stroke="rgb(var(--c-ink))"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M22 64 C46 69 90 69 114 63" fill="none" stroke="rgb(var(--c-accent))" strokeWidth="1.6" />
        {/* the eye */}
        <path d="M108 62 C110 60 114 60 116 62 C114 64 110 64 108 62 Z" fill="rgb(var(--c-ink))" />
        {/* oars */}
        <g stroke="rgb(var(--c-ink) / 0.7)" strokeWidth="1" strokeLinecap="round">
          <path d="M34 70 L28 84 M48 72 L43 86 M62 72 L58 87 M76 72 L72 87 M90 71 L87 85 M102 69 L100 82" />
        </g>
      </g>
      {/* water */}
      <g fill="none" stroke="rgb(var(--c-accent) / 0.55)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M6 82 Q12 78 18 82 T30 82" />
        <path d="M108 86 Q114 82 120 86 T132 86" />
      </g>
    </svg>
  );
}
