'use client';

import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';
import { leadership } from '@/lib/content';

export function Leadership() {
  return (
    <section id="leadership" aria-labelledby="leadership-heading" className="section-shell py-20 md:py-28">
      <SectionHeading
        index="05"
        id="leadership-heading"
        title="Leadership & Positions of Responsibility"
        lede="Three years of running things that had to work on the day."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {leadership.map((role, i) => (
          <Reveal key={`${role.role}-${role.org}`} index={i} variant={i % 2 === 0 ? 'up' : 'scale'}>
            <GlowCard>
              <p className="font-mono text-xs text-accent">{role.period}</p>
              <h3 className="mt-2 text-base font-semibold md:text-lg">{role.role}</h3>
              <p className="mt-0.5 font-mono text-sm text-accent-secondary">{role.org}</p>
              {role.description ? (
                <p className="mt-3 leading-relaxed text-muted-foreground">{role.description}</p>
              ) : null}
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
