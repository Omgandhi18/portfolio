function HermesWings() {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className="h-auto w-full"
      aria-hidden="true"
    >
      {/* Orb of the messenger */}
      <circle cx="120" cy="58" r="6" />
      {/* Right wing — fan of feathers */}
      <g>
        <path d="M132 54 C158 22 196 13 224 19" />
        <path d="M133 57 C156 31 184 24 207 28" />
        <path d="M134 60 C153 40 174 35 190 38" />
        <path d="M135 63 C150 49 164 46 175 48" />
        <path d="M135 66 C147 58 155 56 162 57" />
      </g>
      {/* Left wing — mirrored */}
      <g transform="translate(240,0) scale(-1,1)">
        <path d="M132 54 C158 22 196 13 224 19" />
        <path d="M133 57 C156 31 184 24 207 28" />
        <path d="M134 60 C153 40 174 35 190 38" />
        <path d="M135 63 C150 49 164 46 175 48" />
        <path d="M135 66 C147 58 155 56 162 57" />
      </g>
    </svg>
  );
}

function DaemonWings() {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-auto w-full"
      aria-hidden="true"
    >
      {/* Obsidian shard */}
      <path d="M120 50 L126 58 L120 66 L114 58 Z" />
      {/* Right wing — membrane and talon tip */}
      <g>
        <path d="M132 54 C150 32 176 20 222 22 L214 30 C218 33 222 35 226 36 L213 41" />
        <path d="M213 41 C206 50 197 52 190 51 C186 60 175 62 167 60 C160 66 148 66 138 61 L132 62" />
        <path d="M190 51 C184 42 172 36 160 36" />
        <path d="M167 60 C163 50 152 44 142 44" />
      </g>
      {/* Left wing — mirrored */}
      <g transform="translate(240,0) scale(-1,1)">
        <path d="M132 54 C150 32 176 20 222 22 L214 30 C218 33 222 35 226 36 L213 41" />
        <path d="M213 41 C206 50 197 52 190 51 C186 60 175 62 167 60 C160 66 148 66 138 61 L132 62" />
        <path d="M190 51 C184 42 172 36 160 36" />
        <path d="M167 60 C163 50 152 44 142 44" />
      </g>
    </svg>
  );
}

export default function Wings({ className = "" }) {
  return (
    <span className={`block text-bronze ${className}`}>
      <span className="block dark:hidden">
        <HermesWings />
      </span>
      <span className="hidden dark:block">
        <DaemonWings />
      </span>
    </span>
  );
}
