'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { identity, navSections } from '@/lib/content';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Past the 100dvh landing hero, which draws its own header.
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      inert={!scrolled}
      className={`fixed inset-x-0 top-0 z-[140] border-b transition-all duration-300 ${
        scrolled
          ? 'translate-y-0 border-border bg-background/85 opacity-100 backdrop-blur-md'
          : 'pointer-events-none -translate-y-full border-transparent opacity-0'
      }`}
    >
      <nav aria-label="Primary" className="section-shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-mono text-sm font-semibold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-70"
        >
          {identity.name}
          <span className="text-accent">.</span>
        </a>

        {/* The section list lives in <SiteMenu /> (the fixed rail) on lg+ and in
            the drawer below that. Repeating it here was the same list twice. */}

        <div className="flex items-center gap-2">
          <a
            href={identity.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center rounded border border-border px-4 font-mono text-[13px] text-foreground transition-colors duration-200 hover:border-accent hover:text-accent sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded text-foreground lg:hidden"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="section-shell flex flex-col py-2">
          {navSections.map(section => (
            <li key={section.href}>
              <a
                href={section.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                {section.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={identity.resume}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center font-mono text-sm text-accent"
            >
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
