"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./brand";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";
import styles from "./header.module.css";
import { cn } from "@/lib/classnames";

const links = [
  {
    href: "/#work",
    label: "Work",
  },
  {
    href: "/#experience",
    label: "Experience",
  },
  {
    href: "/#contact",
    label: "Contact",
  },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const HeaderLink = isHome ? "a" : Link;
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
    <header className={styles["site-header"]} data-ui="site-header">
      <div className={styles["header-surface"]} data-ui="header-surface">
        <div className={cn("container", styles["header-inner"])}>
          <HeaderLink
            href={isHome ? "#top" : "/"}
            className={styles["brand-link"]}
            onClick={() => setOpen(false)}
            data-ui="brand-link"
          >
            <Brand />
          </HeaderLink>
          <div className={styles["header-actions"]} data-ui="header-actions">
            <button
              ref={toggle}
              type="button"
              className={styles["menu-toggle"]}
              aria-controls="primary-navigation"
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen(!open)}
              data-ui="menu-toggle"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav
              ref={nav}
              id="primary-navigation"
              aria-label="Primary navigation"
              className={cn(
                styles["primary-nav"],
                open ? styles["is-open"] : "",
              )}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget as Node) &&
                  event.relatedTarget !== toggle.current
                )
                  setOpen(false);
              }}
            >
              {links.map((link) => (
                <HeaderLink
                  key={link.href}
                  href={isHome ? link.href.slice(1) : link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </HeaderLink>
              ))}
            </nav>
            <div
              className={styles["header-utilities"]}
              data-ui="header-utilities"
            >
              <a
                className={styles["nav-resume"]}
                href={profile.resume}
                download
                onClick={() => setOpen(false)}
                data-ui="nav-resume"
              >
                Résumé <ArrowUpRight size={15} />
              </a>
              <ThemeToggle className={styles["header-theme-toggle"]} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
