import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Copy,
  DownloadSimple,
  GithubLogo,
  Lightning,
  LinkedinLogo,
  MagnifyingGlass,
  MoonStars,
  Sun,
} from "@phosphor-icons/react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { isDark, toggleTheme } from "../theme";
import { lockScroll, scrollToId } from "../lib/lenis";
import { EASE } from "../lib/motion";

function buildCommands(close) {
  const go = (id) => () => {
    close();
    setTimeout(() => scrollToId(id), 120);
  };
  const open = (url) => () => {
    close();
    window.open(url, "_blank", "noopener");
  };
  const dark = isDark();
  return [
    { label: "About", hint: "Section", Icon: Compass, keywords: "about ethos skills pantheon", run: go("ethos") },
    { label: "Selected work", hint: "Section", Icon: Compass, keywords: "work projects apps erga", run: go("erga") },
    { label: "The voyage", hint: "Section", Icon: Compass, keywords: "experience journey poreia career", run: go("poreia") },
    { label: "Contact", hint: "Section", Icon: Compass, keywords: "contact email epaphe", run: go("epaphe") },
    ...projects.map((p) => ({
      label: p.name,
      hint: "App Store",
      Icon: ArrowUpRight,
      keywords: `${p.kind} ${p.patron.name} app`.toLowerCase(),
      run: open(p.links.appStore),
    })),
    {
      label: dark ? "Travel to Olympus" : "Travel to Othrys",
      hint: dark ? "Light mode" : "Dark mode",
      Icon: dark ? Sun : MoonStars,
      keywords: "theme dark light mode olympus othrys night day",
      run: () => {
        close();
        setTimeout(() => toggleTheme(), 150);
      },
    },
    {
      label: "Summon Zeus",
      hint: "Weather",
      Icon: Lightning,
      keywords: "zeus lightning storm thunder",
      run: () => {
        close();
        setTimeout(() => window.dispatchEvent(new CustomEvent("zeus")), 200);
      },
    },
    {
      label: "Download résumé",
      hint: "PDF",
      Icon: DownloadSimple,
      keywords: "resume cv vita download pdf",
      run: () => {
        close();
        const a = document.createElement("a");
        a.href = profile.resume;
        a.download = "";
        a.click();
      },
    },
    {
      label: "Copy email",
      hint: profile.email,
      Icon: Copy,
      keywords: "email copy mail contact",
      run: () => {
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        close();
      },
    },
    { label: "GitHub", hint: "Profile", Icon: GithubLogo, keywords: "github code", run: open(profile.links.github) },
    { label: "LinkedIn", hint: "Profile", Icon: LinkedinLogo, keywords: "linkedin", run: open(profile.links.linkedin) },
  ];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  const commands = useMemo(() => (open ? buildCommands(close) : []), [open, close]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelected(0);
    lockScroll(true);
    const f = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(f);
      lockScroll(false);
    };
  }, [open]);

  useEffect(() => {
    setSelected(0);
    listRef.current?.scrollTo({ top: 0 });
  }, [query]);

  const move = (to) => {
    setSelected(to);
    listRef.current?.querySelectorAll('[role="option"]')[to]?.scrollIntoView({ block: "nearest" });
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(Math.min(selected + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(Math.max(selected - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      e.preventDefault();
      results[selected].run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-palette bg-ink/30 backdrop-blur-[2px]"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto mt-[14vh] w-[min(600px,92vw)] border border-line bg-bg shadow-[0_30px_80px_-20px_rgb(var(--c-ink)/0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <MagnifyingGlass size={18} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Ask the oracle…"
                aria-label="Search commands"
                className="w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
              />
              <kbd className="shrink-0 border border-line px-1.5 py-0.5 text-[0.7rem] font-semibold text-muted">esc</kbd>
            </div>
            <ul ref={listRef} role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto py-2" data-lenis-prevent>
              {results.length === 0 && (
                <li className="px-5 py-6 text-sm text-muted">No answer for that. Try “work”, “zeus” or “email”.</li>
              )}
              {results.map((cmd, i) => (
                <li key={cmd.label} role="option" aria-selected={i === selected}>
                  <button
                    type="button"
                    onClick={cmd.run}
                    onMouseEnter={() => setSelected(i)}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                      i === selected ? "bg-surface text-ink" : "text-ink/75"
                    }`}
                  >
                    <cmd.Icon size={17} className={i === selected ? "text-accent" : "text-muted"} />
                    <span className="flex-1 text-[0.95rem] font-medium">{cmd.label}</span>
                    <span className="shrink-0 text-xs text-muted">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-5 py-3 text-xs text-muted">
              <span>↑ ↓ to move, ↵ to choose</span>
              <span>Built like Nova Key</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
