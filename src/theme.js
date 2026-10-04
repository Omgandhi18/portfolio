const THEME_COLORS = { light: "#F2F3F1", dark: "#0C111B" };

export function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function prefersReducedMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setDark(dark) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.theme = dark ? "dark" : "light";
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { dark } }));
}

/* Travel between realms. The new world opens as a circle growing out of
   the point the traveller touched (the dial, usually). Browsers without
   view transitions, and anyone who prefers less motion, simply arrive. */
export function travel(dark, origin) {
  if (dark === isDark()) return;
  if (!document.startViewTransition || prefersReducedMotion()) {
    setDark(dark);
    return;
  }
  const x = origin?.x ?? innerWidth - 48;
  const y = origin?.y ?? 32;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const transition = document.startViewTransition(() => setDark(dark));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 1100,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    })
    .catch(() => {});
}

export function toggleTheme(origin) {
  travel(!isDark(), origin);
}
