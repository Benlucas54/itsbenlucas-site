"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-white border-b border-brand-divider">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold text-brand-black">
          Promptpreneur
        </a>

        {/* Desktop links */}
        <div className="hidden gap-8 md:flex">
          <a
            href="#work-with-me"
            className="text-sm font-medium text-brand-black-secondary hover:text-brand-black transition-colors"
          >
            Work With Me
          </a>
          <a
            href="#free-prompt-pack"
            className="text-sm font-medium text-brand-black-secondary hover:text-brand-black transition-colors"
          >
            Free Prompt Pack
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-brand-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-black transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-brand-divider px-6 pb-4 md:hidden">
          <a
            href="#work-with-me"
            onClick={() => setOpen(false)}
            className="block py-3 text-sm font-medium text-brand-black-secondary"
          >
            Work With Me
          </a>
          <a
            href="#free-prompt-pack"
            onClick={() => setOpen(false)}
            className="block py-3 text-sm font-medium text-brand-black-secondary"
          >
            Free Prompt Pack
          </a>
        </div>
      )}
    </nav>
  );
}
