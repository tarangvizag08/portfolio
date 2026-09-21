'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { navSections } from '@/lib/content';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';

const LineSidebar = dynamic(() => import('@/components/reactbits/LineSidebar'), { ssr: false });

/**
 * The section menu the animations brief asks for ("for the menu"), as a fixed
 * rail on large screens. It replaces the header's inline nav rather than
 * sitting alongside it — two copies of the same list is clutter, not richness.
 * Below `lg` the header's drawer is still the menu.
 */
export function SiteMenu() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is on screen so the rail marks your place.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const top = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const i = navSections.findIndex(s => s.href.slice(1) === top.target.id);
        if (i >= 0) setActive(i);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    navSections.forEach(s => {
      const el = document.getElementById(s.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <nav
      aria-label="Sections"
      className={`fixed right-6 top-1/2 z-[130] hidden -translate-y-1/2 transition-opacity duration-500 lg:block ${
        shown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <LineSidebar
        items={navSections.map(s => s.label)}
        accentColor="#f8d49b"
        textColor="#cfdad3"
        markerColor="#6e8f79"
        defaultActive={active}
        fontSize={0.95}
        itemGap={16}
        proximityRadius={110}
        maxShift={22}
        onItemClick={(index: number) => {
          const target = navSections[index];
          if (target) document.querySelector(target.href)?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </nav>
  );
}
