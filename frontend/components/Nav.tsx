"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#try", label: "Try a session" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Logo />

        <ul className="hidden items-center gap-9 text-[15px] text-link md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-clay">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href="/login"
            className="hidden min-h-11 items-center px-3 text-[15px] font-medium text-ink hover:text-clay sm:inline-flex"
          >
            Sign in
          </a>
          <a
            href="#try"
            className="inline-flex min-h-11 items-center rounded-full bg-soft px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-line"
          >
            Get started
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-line bg-cream px-4 pb-4 pt-2 md:hidden"
        >
          {[...LINKS, { href: "/login", label: "Sign in" }].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-base text-link hover:text-clay"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
