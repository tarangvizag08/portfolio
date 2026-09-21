'use client';

import dynamic from 'next/dynamic';
import { SectionHeading } from '@/components/ui/section-heading';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';
import { WhenVisible } from '@/components/ui/when-visible';
import { gallery } from '@/lib/content';

const InfiniteSpiral = dynamic(() => import('@/components/reactbits/InfiniteSpiral'), { ssr: false });

export function Gallery() {
  const reduced = usePrefersReducedMotion();

  const items = gallery.map(photo => ({ src: photo.src, alt: photo.alt, label: photo.caption }));

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="section-shell py-24 md:py-32">
      <SectionHeading
        index="07"
        id="gallery-heading"
        title="Beyond the Lab"
        lede="Places I have been when I wasn't in front of a scope."
      />

      {reduced ? (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map(photo => (
            <li key={photo.src} className="overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
              <p className="bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">{photo.caption}</p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <WhenVisible minHeight="32rem" className="relative h-[32rem] overflow-hidden">
            <InfiniteSpiral
              items={items}
              animationMode="all"
              speed={0.45}
              radius={210}
              cardWidth={170}
              cardHeight={215}
              verticalSpacing={78}
              cardsPerTurn={6}
              centerScale={1.28}
              edgeBlur={5}
              pauseOnHover
            />
          </WhenVisible>
          <p className="mt-4 text-center font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            Drag or scroll to travel the spiral
          </p>
        </>
      )}
    </section>
  );
}
