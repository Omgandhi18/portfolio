import React from "react";

export default function Footer() {
  return (
    <footer className="section-padding py-8 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="font-clash font-semibold text-sm text-gradient">
          Om Gandhi
        </span>
        <span className="font-satoshi text-xs text-text-muted">
          omgandhi.dev · © {new Date().getFullYear()}
        </span>
        <span className="font-satoshi text-xs text-text-muted">
          Built with React & Framer Motion
        </span>
      </div>
    </footer>
  );
}
