'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Mounts `children` only while the wrapper is near the viewport.
 *
 * Every heavy visual on this site owns a WebGL context (Aurora and the gallery
 * views via ogl, Lanyard via three.js) and browsers only allow a handful of
 * live contexts per page. Mounting them all at load costs the oldest one its
 * context — "THREE.WebGLRenderer: Context Lost" — and the component renders
 * black. Gating on visibility keeps one or two alive at a time, which is also
 * the motion budget the design system asks for.
 */
export function WhenVisible({
  children,
  minHeight,
  rootMargin = '200px',
  className,
}: {
  children: ReactNode;
  /** Reserved space so nothing jumps when the child mounts. */
  minHeight: number | string;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {visible ? children : null}
    </div>
  );
}
