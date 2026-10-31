"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Brand } from "./brand";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 80;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );
  const compact = pathname === "/" && !scrolled;
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (
        !nav.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-header" data-compact={compact}>
      <div className="header-surface">
        <div className="container header-inner">
          <Link
            href="/"
            className="brand-link"
            aria-hidden={compact}
            tabIndex={compact ? -1 : undefined}
            onClick={() => setOpen(false)}
          >
            <Brand />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-controls="primary-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
          <nav
            ref={nav}
            id="primary-navigation"
            aria-label="Primary navigation"
            className={`primary-nav ${open ? "is-open" : ""}`}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget as Node) &&
                event.relatedTarget !== toggle.current
              )
                setOpen(false);
            }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              className="nav-resume"
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
            >
              Résumé <ArrowUpRight size={15} />
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
