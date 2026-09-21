'use client';

import dynamic from 'next/dynamic';
import CountUp from '@/components/reactbits/CountUp';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';
import { research } from '@/lib/content';

// Canvas particles + GSAP: client only, and only once scrolled to.
const MagicBento = dynamic(() => import('@/components/reactbits/MagicBento'), { ssr: false });

export function Research() {
  const reduced = usePrefersReducedMotion();

  const cards = research.map(paper => ({
    color: '#2c4636',
    title: paper.title,
    description: paper.description,
    label: paper.status,
  }));

  return (
    <section id="research" aria-labelledby="research-heading" className="section-shell py-24 md:py-32">
      <SectionHeading
        index="02"
        id="research-heading"
        title="Research & Publications"
        lede="Two papers in review, both on wireless links under real constraints."
      />

      {/* The bento grid carries the headline detail; the citation list under it
          keeps the venue, dates and metrics readable and copyable. */}
      {!reduced && (
        <Reveal variant="scale" className="mb-12">
          <MagicBento
            cards={cards}
            glowColor="248, 212, 155"
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            clickEffect
            enableMagnetism
            spotlightRadius={320}
          />
        </Reveal>
      )}

      <ol className="space-y-6">
        {research.map((paper, i) => (
          <Reveal as="li" key={paper.title} index={i} variant={i % 2 === 0 ? 'left' : 'right'}>
            <GlowCard padding="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[11px] tracking-wide text-accent uppercase">
                  {paper.status}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{paper.period}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold leading-snug md:text-xl">{paper.title}</h3>
              <p className="mt-1.5 font-mono text-sm text-accent-secondary">{paper.venue}</p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">{paper.role}</p>

              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{paper.description}</p>

              {'stat' in paper ? (
                <p className="mt-6 border-t border-border pt-5">
                  <span className="block font-mono text-2xl font-semibold text-accent md:text-3xl">
                    {reduced ? (
                      `${paper.stat.value}${paper.stat.suffix ?? ''}`
                    ) : (
                      <>
                        <CountUp to={paper.stat.value} duration={1.6} separator="," className="tabular-nums" />
                        {paper.stat.suffix}
                      </>
                    )}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{paper.stat.label}</span>
                </p>
              ) : (
                <p className="mt-6 border-t border-border pt-5 font-mono text-sm text-accent-secondary">
                  {paper.highlight}
                </p>
              )}
            </GlowCard>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
