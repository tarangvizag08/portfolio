'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ArrowUp, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { identity } from '@/lib/content';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';

const Dock = dynamic(() => import('@/components/reactbits/Dock'), { ssr: false });

/**
 * The quick-action dock the animations brief asks for ("for the home button or
 * components"). It stays out of the landing composition and slides up once you
 * have scrolled past it, so the first viewport stays the single image the hero
 * is meant to be.
 */
export function SiteDock() {
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The dock is a pointer-proximity effect; without a pointer it is just a row
  // of links, and the header and sidebar already cover navigation.
  if (reduced) return null;

  const open = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer');

  const items = [
    {
      icon: <ArrowUp size={18} aria-hidden="true" />,
      label: 'Back to top',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      icon: <FileText size={18} aria-hidden="true" />,
      label: 'Résumé',
      onClick: open(identity.resume),
    },
    {
      icon: <Github size={18} aria-hidden="true" />,
      label: 'GitHub',
      onClick: open(identity.github),
    },
    {
      icon: <Linkedin size={18} aria-hidden="true" />,
      label: 'LinkedIn',
      onClick: open(identity.linkedin),
    },
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: 'Email',
      onClick: () => {
        window.location.href = `mailto:${identity.email}`;
      },
    },
  ];

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-[130] flex justify-center transition-all duration-500 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <Dock items={items} panelHeight={64} baseItemSize={46} magnification={68} distance={180} />
    </div>
  );
}
