'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './use-reduced-motion';

const BorderGlow = dynamic(() => import('@/components/reactbits/BorderGlow'), { ssr: false });

/**
 * The one card used across every section.
 *
 * BorderGlow's props are set in a single place here rather than repeated at
 * each call site, so the whole page shares one surface treatment and retuning
 * it is a one-file change. Under reduced motion it degrades to a plain bordered
 * panel — the effect is entirely pointer-driven, so there is nothing to show.
 */
export function GlowCard({
  children,
  className = '',
  padding = 'p-6',
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={`rounded-xl border border-border bg-surface ${padding} ${className}`.trim()}>
        {children}
      </div>
    );
  }

  return (
    <BorderGlow
      className={`h-full ${className}`.trim()}
      backgroundColor="#2c4636"
      glowColor="34 85 45"
      borderRadius={14}
      glowRadius={26}
      edgeSensitivity={24}
      coneSpread={22}
      glowIntensity={1.1}
      fillOpacity={0.35}
      colors={['#f8d49b', '#b8e6ec', '#f5a524']}
    >
      <div className={`flex h-full flex-col ${padding}`}>{children}</div>
    </BorderGlow>
  );
}
