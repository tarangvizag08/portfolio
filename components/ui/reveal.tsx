'use client';

import { useEffect, type ElementType, type ReactNode } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'blur';

/**
 * Marks an element for scroll reveal. It only renders classes — the actual
 * reveal is done by <RevealEngine />, mounted once for the page.
 */
export function Reveal({
  children,
  index = 0,
  variant = 'up',
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  index?: number;
  variant?: RevealVariant;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={`sr sr-${variant} ${className}`.trim()}
      style={{ transitionDelay: `${Math.min(index * 70, 490)}ms` }}
    >
      {children}
    </Tag>
  );
}

/** A hairline that draws itself left-to-right, revealed by the same engine. */
export function RuleDraw({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`rule-draw h-px bg-border ${className}`.trim()} />;
}

/**
 * One scroll pass for every reveal on the page.
 *
 * This replaced ~40 individual IntersectionObservers. Per-element observers
 * left section headings permanently at opacity 0 whenever one silently failed
 * to report, and a stranded observer is invisible to debug. A single
 * rAF-throttled pass over `.sr` is deterministic, re-checks on every scroll and
 * resize rather than once, and cannot leave an element stuck: if it is on
 * screen, it is shown.
 */
export function RevealEngine() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.sr, .rule-draw').forEach(el => el.classList.add('is-visible'));
      return;
    }

    let last = 0;

    const pass = () => {
      last = performance.now();
      // The reveal line in *document* coordinates, not viewport coordinates.
      //
      // Asking "is this on screen right now" makes the result depend on
      // catching each element mid-flight, so a fast scroll or a jump to an
      // anchor skips whatever flew past between samples and strands it at
      // opacity 0 for good. Comparing against how far the page has been
      // scrolled is monotonic: anything above the line has been passed, so it
      // is shown, regardless of how quickly you got there.
      const line = window.scrollY + window.innerHeight * 0.92;
      document.querySelectorAll<HTMLElement>('.sr:not(.is-visible), .rule-draw:not(.is-visible)').forEach(el => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top < line) el.classList.add('is-visible');
      });
    };

    // Time-throttled rather than rAF-gated: rAF does not run in a background
    // or non-painting tab, which left every reveal stuck at opacity 0 until the
    // tab was focused. A timestamp gate always fires, and 40-odd
    // getBoundingClientRect reads at 12Hz is nothing.
    let trailing = 0;
    const schedule = () => {
      if (performance.now() - last < 80) {
        // Leading-edge throttle alone can drop the final scroll position, which
        // once left the contact form stuck invisible. The trailing pass makes
        // sure wherever you stop is always processed.
        window.clearTimeout(trailing);
        trailing = window.setTimeout(pass, 100);
        return;
      }
      pass();
    };

    pass();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', pass);
    // Sections mounted late (dynamic imports) get picked up here.
    const settle = window.setTimeout(pass, 600);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', pass);
      window.clearTimeout(settle);
      window.clearTimeout(trailing);
    };
  }, []);

  return null;
}
