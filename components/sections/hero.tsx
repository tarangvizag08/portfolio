'use client';

import dynamic from 'next/dynamic';
import { ArrowDown, FileText } from 'lucide-react';
import CountUp from '@/components/reactbits/CountUp';
import SplitText from '@/components/reactbits/SplitText';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';
import { WhenVisible } from '@/components/ui/when-visible';
import { heroStats, identity } from '@/lib/content';

// WebGL background: client-only, and never in the server bundle.
const Aurora = dynamic(() => import('@/components/reactbits/Aurora'), { ssr: false });

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Background accent. Disabled outright under reduced motion. */}
      {!reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-[0.18]"
        >
          <WhenVisible minHeight="100%" className="h-full">
            <Aurora colorStops={['#F5A524', '#22D3EE', '#F5A524']} amplitude={0.9} blend={0.6} />
          </WhenVisible>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_35%,var(--color-background)_78%)]"
      />

      <div className="section-shell relative py-20 md:py-28">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase md:text-sm">
          {identity.role}
        </p>

        <h1 className="mt-5 text-[clamp(2.5rem,9vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
          {reduced ? (
            identity.name
          ) : (
            <SplitText
              text={identity.name}
              tag="span"
              className="inline-block"
              splitType="chars"
              delay={35}
              duration={0.9}
              ease="power3.out"
              textAlign="left"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
          )}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {identity.positioning}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={identity.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-6 font-mono text-sm font-medium text-accent-foreground transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            <FileText size={16} strokeWidth={2} aria-hidden="true" />
            View résumé
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-6 font-mono text-sm text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Get in touch
            <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        {/* Stat rail */}
        <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {heroStats.map(stat => (
            <div key={stat.label} className="bg-surface px-5 py-5">
              <dt className="font-mono text-2xl font-semibold text-accent md:text-3xl">
                {reduced ? (
                  `${stat.value}${stat.suffix ?? ''}`
                ) : (
                  <>
                    <CountUp to={stat.value} duration={1.6} separator="," className="tabular-nums" />
                    {stat.suffix}
                  </>
                )}
              </dt>
              <dd className="mt-1.5 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
