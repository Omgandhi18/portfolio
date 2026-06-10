const THEME_COLORS = { light: "#F2EEE3", dark: "#141210" };

export function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function setDark(dark) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.theme = dark ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
  window.dispatchEvent(new CustomEvent("themechange"));
}

/* Travel between realms — the gates animate the crossing.
   RealmGates listens for this event and calls setDark at the
   moment the doors are fully shut. */
export function requestTravel(dark) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setDark(dark);
    return;
  }
  window.dispatchEvent(new CustomEvent("realm:travel", { detail: { dark } }));
}

export function toggleTheme() {
  requestTravel(!isDark());
}
