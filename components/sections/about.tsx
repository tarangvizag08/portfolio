'use client';

import Image from 'next/image';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';
import { about } from '@/lib/content';


export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-shell py-20 md:py-28">
      <SectionHeading index="01" id="about-heading" title="About" />

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-14">
        <div>
          {about.bio.map((paragraph, i) => (
            <Reveal key={i} index={i} variant="up">
              <p className="mb-5 max-w-2xl leading-relaxed text-muted-foreground">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal index={about.bio.length} variant="left">
            <GlowCard className="mt-10">
            <h3 className="font-mono text-sm tracking-[0.15em] text-accent uppercase">
              Education
            </h3>
            <ul className="mt-4 space-y-4">
              {about.education.map(entry => (
                <li key={entry.school} className="border-l-2 border-border pl-4">
                  <p className="font-mono text-sm font-medium text-foreground">{entry.school}</p>
                  <p className="text-sm text-muted-foreground">{entry.qualification}</p>
                  <p className="mt-0.5 font-mono text-xs text-accent-secondary">
                    {entry.detail} <span className="text-muted-foreground">- {entry.period}</span>
                  </p>
                </li>
              ))}
            </ul>
            </GlowCard>
          </Reveal>
        </div>

        <Reveal index={1} variant="scale">
          <figure className="overflow-hidden rounded-xl border border-border bg-surface">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={640}
              height={800}
              sizes="(min-width: 768px) 20rem, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>

        </Reveal>
      </div>
    </section>
  );
}
