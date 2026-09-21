'use client';

import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/components/ui/use-reduced-motion';

const AeroShards = dynamic(() => import('@/components/reactbits/AeroShards'), { ssr: false });

/**
 * The page backdrop, behind everything below the landing photo.
 *
 * AeroShards paints its own `backgroundColor`, so this *is* the page ground
 * rather than a layer floating on one — which is why it runs at full opacity
 * and why `--color-background` is set to the same #517A60: if WebGPU is
 * unavailable, or under reduced motion, the flat colour behind it is identical
 * and nothing looks broken. The .page-veil above it deepens the green just
 * enough for text to clear contrast.
 */
export function SiteBackdrop() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <AeroShards
        backgroundColor="#517A60"
        shardColor="#FADF8E"
        accentColor="#50C4F2"
        placement="right"
        material="chrome"
        detail="balanced"
        effect="none"
        flow="ribbon"
        rippleIntensity={1.45}
        holdToGather
        scale={1}
        spread={1}
        depth={1}
        speed={1}
        spin={1}
        interaction="repel"
        density={1.5}
        shardSize={1.1}
        stretch={1}
        turbulence={1}
        glow={1}
        edgeSoftness={2}
        bloom={0.5}
        grain={0.05}
        chromaticAberration={0.0075}
        transitionDuration={1}
        interactionRadius={1.5}
        interactionStrength={0.5}
        paused={false}
      />
    </div>
  );
}
