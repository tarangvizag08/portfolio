'use client';

import { Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';
import { achievements } from '@/lib/content';

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="section-shell py-20 md:py-28">
      <SectionHeading index="08" id="achievements-heading" title="Achievements" />

      <ul className="space-y-2.5">
        {achievements.map((item, i) => (
          <Reveal as="li" key={item} index={i} variant="right">
            <GlowCard padding="px-4 py-3">
              <div className="flex items-start gap-3">
              <Award size={16} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-muted-foreground md:text-base">{item}</span>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
