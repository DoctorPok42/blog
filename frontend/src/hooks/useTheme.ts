import { useCallback, useEffect, useState } from "react";

export type Mode = "light" | "dark" | "system";
type Theme = "light" | "dark";

function getStoredMode(): Mode {
  const stored = window.localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "system";
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>("system");
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialMode = getStoredMode();
    setMode(initialMode);
    setTheme(initialMode === "system" ? getSystemTheme() : initialMode);
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (getStoredMode() === "system") setTheme(mq.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("light", "dark");
    if (mode !== "system") document.documentElement.classList.add(mode);
  }, [mode, mounted]);

  const setThemeMode = useCallback((next: Mode) => {
    setMode(next);
    if (next === "system") {
      window.localStorage.removeItem("theme");
      setTheme(getSystemTheme());
    } else {
      window.localStorage.setItem("theme", next);
      setTheme(next);
    }
  }, []);

  return { mode, theme, setThemeMode, mounted };
}