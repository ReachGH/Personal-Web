"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { themeColours, themeStorageKey, type Theme } from "@/lib/theme";

const themeEvent = "reach-theme-change";
let inMemoryTheme: Theme | null = null;

function savedTheme(): Theme | null {
  if (inMemoryTheme) return inMemoryTheme;
  try {
    const value = window.localStorage.getItem(themeStorageKey);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelectorAll("meta[data-theme-color]")
    .forEach((meta) => meta.setAttribute("content", themeColours[theme]));
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncPreference = () => {
    applyTheme(savedTheme() ?? (media.matches ? "dark" : "light"));
    onChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === themeStorageKey || event.key === null) {
      inMemoryTheme = null;
      syncPreference();
    }
  };
  syncPreference();
  media.addEventListener("change", syncPreference);
  window.addEventListener("storage", onStorage);
  window.addEventListener(themeEvent, onChange);
  return () => {
    media.removeEventListener("change", syncPreference);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(themeEvent, onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = () => {
    if (theme === null) return;
    const next = theme === "dark" ? "light" : "dark";
    inMemoryTheme = next;
    applyTheme(next);
    try {
      window.localStorage.setItem(themeStorageKey, next);
    } catch {
      /* The toggle still works without storage. */
    }
    window.dispatchEvent(new Event(themeEvent));
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      disabled={theme === null}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      <Moon
        className="theme-moon"
        size={18}
        strokeWidth={1.7}
        aria-hidden="true"
      />
      <Sun
        className="theme-sun"
        size={18}
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </button>
  );
}
