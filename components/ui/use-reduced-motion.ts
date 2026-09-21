'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// On the server there is no media query to read. Returning `true` means the
// first paint is always the static one — animation is only ever added after
// the client confirms the user is happy with it, never removed after the fact.
const getServerSnapshot = () => true;

/**
 * Single source of truth for the reduced-motion decision.
 *
 * `useSyncExternalStore` rather than useEffect + setState: matchMedia is an
 * external store, and subscribing to it this way avoids the cascading render
 * that a setState-in-effect causes on every mount.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
