'use client';

import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';
import { experience } from '@/lib/content';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-shell py-20 md:py-28">
      <SectionHeading index="04" id="experience-heading" title="Experience" />

      <ol className="relative border-l border-border pl-6 md:pl-8">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.role} index={i} variant="left" className="relative pb-10 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[1.8rem] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background md:-left-[2.3rem]"
            />
            <GlowCard>
            <p className="font-mono text-xs text-accent">{job.period}</p>
            <h3 className="mt-2 text-lg font-semibold md:text-xl">{job.role}</h3>
            <p className="mt-0.5 font-mono text-sm text-accent-secondary">{job.org}</p>
            <div className="mt-3 max-w-3xl space-y-2">
              {job.description.map(line => (
                <p key={line} className="leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
            </GlowCard>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
