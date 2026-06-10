import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/profile";
import { isDark, toggleTheme } from "../theme";

function buildCommands(close) {
  const go = (id) => () => {
    close();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const openUrl = (url) => () => {
    close();
    window.open(url, "_blank", "noopener");
  };
  return [
    { label: "Go to Ethos", hint: "About", keywords: "about ethos summary skills", run: go("ethos") },
    { label: "Go to Erga", hint: "Work", keywords: "work projects apps erga nova oink translo", run: go("erga") },
    { label: "Go to Odyssey", hint: "Journey", keywords: "experience journey odyssey magenta napier", run: go("odyssey") },
    { label: "Go to Logos", hint: "Contact", keywords: "contact logos email reach", run: go("logos") },
    {
      label: isDark() ? "Travel to Olympus" : "Travel to Othrys",
      hint: isDark() ? "Light mode" : "Dark mode",
      keywords: "theme dark light mode toggle olympus othrys",
      run: () => {
        toggleTheme();
        close();
      },
    },
    {
      label: "Download Vita",
      hint: "Resume PDF",
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
      keywords: "email copy mail contact",
      run: () => {
        navigator.clipboard?.writeText(profile.email);
        close();
      },
    },
    { label: "Open Github", hint: "↗", keywords: "github code repos", run: openUrl(profile.links.github) },
    { label: "Open Linkedin", hint: "↗", keywords: "linkedin profile", run: openUrl(profile.links.linkedin) },
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
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpenEvent);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      document.documentElement.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setSelected(0);
    listRef.current?.scrollTo({ top: 0 });
  }, [query]);

  const scrollToItem = (index) => {
    listRef.current
      ?.querySelectorAll('[role="option"]')
      [index]?.scrollIntoView({ block: "nearest" });
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(selected + 1, results.length - 1);
      setSelected(next);
      scrollToItem(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.max(selected - 1, 0);
      setSelected(next);
      scrollToItem(next);
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
          className="fixed inset-0 z-[80] bg-marble/70 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-[16vh] w-[min(580px,92vw)] border border-hairline bg-marble"
          >
            <div className="flex items-center gap-4 border-b border-hairline px-6 py-4">
              <span className="font-display text-lg leading-none text-bronze" aria-hidden="true">
                Ω
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Speak a command…"
                aria-label="Search commands"
                className="w-full bg-transparent font-body text-lg text-ink placeholder:italic placeholder:text-faded/70 focus:outline-none"
              />
              <span className="meta-caps shrink-0 text-faded/70">esc</span>
            </div>
            <ul ref={listRef} role="listbox" aria-label="Commands" className="max-h-[46vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-6 py-5 font-body italic text-faded">
                  The oracle has no answer for that.
                </li>
              )}
              {results.map((cmd, i) => (
                <li key={cmd.label} role="option" aria-selected={i === selected}>
                  <button
                    type="button"
                    onClick={cmd.run}
                    onMouseEnter={() => setSelected(i)}
                    className={`flex w-full items-center justify-between gap-4 px-6 py-3 text-left transition-colors ${
                      i === selected
                        ? "border-l-2 border-bronze bg-panel text-ink"
                        : "border-l-2 border-transparent text-faded"
                    }`}
                  >
                    <span className="font-body text-base">{cmd.label}</span>
                    <span className="meta-caps shrink-0 text-faded/80">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-hairline px-6 py-3">
              <span className="meta-caps text-faded/70">↑↓ navigate · ↵ select</span>
              <span className="meta-caps text-faded/70">After Nova Key</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
