'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GlowCard } from '@/components/ui/glow-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { projects } from '@/lib/content';

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-shell py-20 md:py-28">
      <SectionHeading
        index="03"
        id="projects-heading"
        title="Projects"
        lede="Silicon, radar, and things that move."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => {
          const isOpen = openIndex === i;
          const panelId = `project-detail-${i}`;

          return (
            <Reveal key={project.title} index={i} variant={i % 2 === 0 ? 'left' : 'right'}>
              <GlowCard>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs text-accent">{project.period}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{project.node}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold leading-snug md:text-xl">{project.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{project.org}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{project.result}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <li
                      key={tag}
                      className="rounded border border-border bg-surface-muted px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start font-mono text-sm text-accent transition-opacity duration-200 hover:opacity-70"
                >
                  {isOpen ? 'Hide detail' : 'What I did'}
                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div id={panelId} hidden={!isOpen}>
                  <ul className="mt-1 space-y-2 border-t border-border pt-4">
                    {project.bullets.map(bullet => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
