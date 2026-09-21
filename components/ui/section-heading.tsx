'use client';

import dynamic from 'next/dynamic';
import { Reveal, RuleDraw } from './reveal';
import { usePrefersReducedMotion } from './use-reduced-motion';

// GSAP ScrollTrigger: client-only.
const ScrollFloat = dynamic(() => import('@/components/reactbits/ScrollFloat'), { ssr: false });

type Props = {
  /** Two-digit section marker, e.g. "02". */
  index: string;
  title: string;
  lede?: string;
  id?: string;
};

export function SectionHeading({ index, title, lede, id }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <Reveal variant="up" className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-3 md:gap-4">
        <span aria-hidden="true" className="font-mono text-sm text-accent">
          {index}
        </span>
        <RuleDraw className="flex-1" />
      </div>

      {/* ScrollFloat renders the <h2> itself and scrubs each character up as the
          section arrives. It takes the id so `aria-labelledby` still resolves —
          the upstream component had no id passthrough, so that is patched in.
          Under reduced motion it is skipped entirely for a plain heading. */}
      {reduced ? (
        <h2 id={id} className="mt-4 text-2xl font-semibold md:text-4xl">
          {title}
        </h2>
      ) : (
        <ScrollFloat
          id={id}
          containerClassName="mt-4"
          textClassName="section-float-text"
          animationDuration={0.9}
          ease="back.inOut(1.6)"
          scrollStart="center bottom+=40%"
          scrollEnd="bottom bottom-=32%"
          stagger={0.022}
        >
          {title}
        </ScrollFloat>
      )}

      {lede ? <p className="mt-3 max-w-2xl text-muted-foreground">{lede}</p> : null}
    </Reveal>
  );
}
