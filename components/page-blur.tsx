'use client';

import dynamic from 'next/dynamic';

const GradualBlur = dynamic(() => import('@/components/reactbits/GradualBlur'), { ssr: false });

/**
 * Softens the very bottom edge of the page, so content dissolves under the
 * dock instead of being cut off by the viewport.
 *
 * zIndex is deliberately low: GradualBlur adds +100 internally when
 * target="page", so 20 becomes 120. The dock and side rail sit at 130 and the
 * header at 140, which keeps all of the chrome sharp above the blur.
 */
export function PageBlur() {
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="5rem"
      strength={1.5}
      divCount={5}
      curve="bezier"
      exponential
      opacity={1}
      zIndex={20}
    />
  );
}
