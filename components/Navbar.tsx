"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 pb-1">
      <nav
        className={`mx-auto max-w-5xl rounded-full border border-brand-glass-border transition-all duration-300 ${
          scrolled
            ? "bg-brand-white/80 backdrop-blur-lg shadow-md"
            : "bg-brand-white shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2.5">
          <a href="#" className="text-xl font-bold text-brand-black">
            Promptpreneur<span className="text-brand-accent">.</span>
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
      </nav>

      {/* Mobile menu — outside the pill, inside the sticky wrapper */}
      {open && (
        <div className="mx-auto max-w-5xl rounded-2xl mt-2 bg-brand-white border border-brand-divider shadow-lg p-4 md:hidden">
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
    </div>
  );
}
