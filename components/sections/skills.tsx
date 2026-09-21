'use client';

import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';
import { certifications, skills } from '@/lib/content';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-shell py-20 md:py-28">
      <SectionHeading index="06" id="skills-heading" title="Skills" />

      <div className="space-y-8">
        {skills.map((group, i) => (
          <Reveal key={group.group} index={i} variant="blur">
            <GlowCard>
            <h3 className="font-mono text-sm tracking-[0.15em] text-accent uppercase">{group.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map(item => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-[13px] text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            </GlowCard>
          </Reveal>
        ))}

        <Reveal index={skills.length} variant="up">
          <h3 className="font-mono text-sm tracking-[0.15em] text-accent uppercase">Certifications</h3>
          <ul className="mt-3 space-y-2">
            {certifications.map(cert => (
              <li key={cert} className="flex gap-2.5 text-muted-foreground">
                <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
