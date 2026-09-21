'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { identity } from '@/lib/content';

/**
 * Two layers cut from the SAME 3024x4032 frame:
 *   HERO_BG     - the photograph exactly as shot, background and all
 *   HERO_PERSON - that identical frame with the background removed
 *
 * Because the sources share dimensions and both render with `fill` +
 * object-cover, next/image gives them identical geometry at every viewport, so
 * the overlay lands pixel-perfect on top of itself. The marquee sits between
 * them, which is what puts the letters behind him at full photo resolution.
 */
const HERO_BG = '/photos/photo-02-disneyland-starwars.jpg';
const HERO_PERSON = '/photos/hero-person-v3.webp';

/** Sky tone from the photo, shown while it decodes. */
const SKY = '#7ba9c9';

const NAV = [
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: identity.linkedin },
  { label: 'GitHub', href: identity.github },
  { label: 'Email', href: `mailto:${identity.email}` },
];

const EASE_DRAWER = 'cubic-bezier(0.76, 0, 0.24, 1)';
const isExternal = (href: string) => !href.startsWith('#') && !href.startsWith('mailto:');

export function LandingHero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section
      id="top"
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ backgroundColor: SKY }}
    >
      {/* ---------- background: the full photograph ---------- */}
      <Image
        src={HERO_BG}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={92}
        className="anim-fade-in object-cover [object-position:50%_50%]"
      />

      {/* ---------- legibility scrim (z-[5]) ---------- */}
      {/* The reference composition sat on a near-empty wall; this photo is
          bright and busy, so cream chrome on it fails contrast. A gentle
          top/bottom gradient buys the header and footer their legibility
          without flattening the picture into a dark rectangle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/55 via-black/25 to-black/60"
      />

      {/* A soft band behind the name, so it reads over foliage and sky alike. */}
      <div
        aria-hidden="true"
        className="hero-name-band pointer-events-none absolute inset-x-0 z-[6]"
        style={{ top: 'var(--hero-band-top)', height: 'var(--hero-band-height)' }}
      />

      {/* ---------- marquee (z-10) ---------- */}
      <div
        className="anim-fade-up absolute inset-x-0 z-10 overflow-hidden"
        style={{ top: 'var(--hero-name-top)', animationDelay: '500ms' }}
        aria-hidden="true"
      >
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_3px_14px_rgba(0,0,0,0.5),0_0_46px_rgba(0,0,0,0.4)] sm:text-[26vh]">
          <span className="pr-[6vw]">Tarang&nbsp;Gupta&nbsp;</span>
          <span className="pr-[6vw]">Tarang&nbsp;Gupta&nbsp;</span>
        </div>
      </div>
      {/* The marquee is decorative and duplicated; the name belongs in the tree once. */}
      <h1 className="sr-only">Tarang Gupta</h1>

      {/* ---------- cream rule (z-10) ---------- */}
      <div
        className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream sm:inset-x-10 sm:bottom-28"
        style={{ animationDelay: '1200ms' }}
        aria-hidden="true"
      />

      {/* ---------- footer ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-hn text-xs leading-relaxed text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:px-10 sm:pb-8 sm:text-sm">
        <p className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
          Engineering
          <br />
          Problem Solver
          <br />
          Always Exploring
        </p>
        <p className="anim-fade-up text-right" style={{ animationDelay: '1550ms' }}>
          Ideas to
          <br />
          Impact
        </p>
      </div>

      {/* ---------- him again, background removed (z-20) ---------- */}
      {/* Same source frame, same fill + object-cover, so it registers exactly
          over the background copy of himself and the marquee reads behind. */}
      <Image
        src={HERO_PERSON}
        alt="Tarang Gupta"
        fill
        priority
        sizes="100vw"
        quality={92}
        className="anim-rise-in pointer-events-none z-20 object-cover [object-position:50%_50%]"
        style={{ animationDelay: '300ms' }}
      />

      {/* ---------- dissolve into the page (z-25) ---------- */}
      {/* The photo's bottom edge measures ~#202520 after the scrim while the
          section ground below is ~#426449 — a 2.5x jump in lightness, which
          reads as a hard seam. Fading the frame into the page colour removes it
          without picking a compromise colour, and keeps working if the green
          changes. Sits above the portrait (z-20) so his legs dissolve too, and
          below the chrome (z-30) so nothing washes out the footer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[18vh]"
        style={{ background: 'linear-gradient(to bottom, rgba(81,122,96,0) 0%, rgba(81,122,96,0.55) 55%, rgba(81,122,96,1) 100%)' }}
      />

      {/* ---------- header (z-30) ---------- */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:px-10 sm:pt-8">
        <a href="#top" className="anim-fade-up font-hn text-lg tracking-wide [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]" style={{ animationDelay: '800ms' }}>
          Tarang
        </a>

        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span className="anim-fade-up font-hn text-sm" style={{ animationDelay: '900ms' }}>
            2025
          </span>

          <nav aria-label="Sections" className="flex flex-col gap-0.5 font-hn text-sm">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="anim-fade-up transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${1000 + i * 80}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <nav aria-label="Elsewhere" className="flex flex-col gap-0.5 font-hn text-sm">
            {SOCIAL.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={isExternal(item.href) ? '_blank' : undefined}
                rel={isExternal(item.href) ? 'noreferrer' : undefined}
                className="anim-fade-up transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${1150 + i * 80}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ---------- hamburger / close (z-50) ---------- */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="landing-drawer"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="anim-fade-up absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center sm:hidden"
        style={{ animationDelay: '900ms' }}
      >
        <span className="relative flex h-4 w-6 flex-col justify-between">
          <span
            className="block h-px w-full bg-cream"
            style={{
              transition: `transform 500ms ${EASE_DRAWER}`,
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block h-px w-full bg-cream transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-px w-full bg-cream"
            style={{
              transition: `transform 500ms ${EASE_DRAWER}`,
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </span>
      </button>

      {/* ---------- mobile drawer (z-40) ---------- */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="landing-drawer"
        inert={!open}
        className="fixed right-0 top-0 z-40 h-full w-[80%] max-w-sm bg-[#141414] px-8 py-10 text-cream sm:hidden"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform 600ms ${EASE_DRAWER}`,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-6 top-6 z-50"
          style={{
            transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
            opacity: open ? 1 : 0,
            transition: `transform 500ms ${EASE_DRAWER} ${open ? '300ms' : '0ms'}, opacity 500ms ease ${
              open ? '300ms' : '0ms'
            }`,
          }}
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        <p
          className="font-hn text-xs uppercase tracking-[0.2em] text-cream/50"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(1rem)',
            opacity: open ? 1 : 0,
            transition: `transform 600ms ${EASE_DRAWER} ${open ? '250ms' : '0ms'}, opacity 600ms ease ${
              open ? '250ms' : '0ms'
            }`,
          }}
        >
          Site Index
        </p>
        <nav aria-label="Sections" className="mt-4 flex flex-col gap-1">
          {NAV.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-hn text-4xl"
              style={{
                transform: open ? 'translateY(0)' : 'translateY(1.5rem)',
                opacity: open ? 1 : 0,
                transition: `transform 600ms ${EASE_DRAWER} ${open ? `${300 + i * 80}ms` : '0ms'}, opacity 600ms ease ${
                  open ? `${300 + i * 80}ms` : '0ms'
                }`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p
          className="mt-12 font-hn text-xs uppercase tracking-[0.2em] text-cream/50"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(1rem)',
            opacity: open ? 1 : 0,
            transition: `transform 600ms ${EASE_DRAWER} ${open ? '500ms' : '0ms'}, opacity 600ms ease ${
              open ? '500ms' : '0ms'
            }`,
          }}
        >
          Find Me
        </p>
        <nav aria-label="Elsewhere" className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {SOCIAL.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={isExternal(item.href) ? '_blank' : undefined}
              rel={isExternal(item.href) ? 'noreferrer' : undefined}
              className="font-hn text-sm"
              style={{
                transform: open ? 'translateY(0)' : 'translateY(1rem)',
                opacity: open ? 1 : 0,
                transition: `transform 600ms ${EASE_DRAWER} ${open ? `${550 + i * 60}ms` : '0ms'}, opacity 600ms ease ${
                  open ? `${550 + i * 60}ms` : '0ms'
                }`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
