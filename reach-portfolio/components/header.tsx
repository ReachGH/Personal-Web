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

let headerScrolled = false;

function subscribeToScroll(onChange: () => void) {
  const update = () => {
    // Separate thresholds prevent flickering when scrolling around the trigger.
    const next = headerScrolled ? window.scrollY > 32 : window.scrollY > 96;
    if (next !== headerScrolled) {
      headerScrolled = next;
      onChange();
    }
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
  return () => window.removeEventListener("scroll", update);
}

const getScrolled = () => headerScrolled;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );
  const compact = pathname === "/" && !scrolled;
  const BrandLink = pathname === "/" ? "a" : Link;
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
          <BrandLink
            href={pathname === "/" ? "#top" : "/"}
            className="brand-link"
            aria-hidden={compact}
            tabIndex={compact ? -1 : undefined}
            onClick={() => setOpen(false)}
          >
            <Brand />
          </BrandLink>
          <div className="header-actions">
            <button
              ref={toggle}
              type="button"
              className="menu-toggle"
              aria-controls="primary-navigation"
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
              <span className="menu-label" aria-hidden="true">
                {open ? "Close" : "Menu"}
              </span>
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
            </nav>
            <div className="header-utilities">
              <a
                className="nav-resume"
                href={profile.resume}
                download
                onClick={() => setOpen(false)}
              >
                Résumé <ArrowUpRight size={15} />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
