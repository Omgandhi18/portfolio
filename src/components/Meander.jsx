export default function Meander({ className = "" }) {
  return (
    <svg
      className={`block h-6 w-full text-bronze/60 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <pattern id="meander" width="16" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M2 19 V5 H14 V19 H6 V9 H10 V15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#meander)" />
    </svg>
  );
}
