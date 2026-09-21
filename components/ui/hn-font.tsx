'use client';

import { useEffect } from 'react';

const HREF = 'https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME';

/**
 * Loads Helvetica Neue ME without blocking first paint.
 *
 * The stylesheet is injected from the client rather than server-rendered,
 * because any server-rendered <link> whose `media` we later flip (the
 * print->all trick) leaves React hydrating against DOM it did not produce —
 * which reports a mismatch on every load. Creating the element outside React
 * entirely means there is nothing to reconcile, and the font still stays off
 * the critical path. The `font-hn` stack falls back to Helvetica/Arial until
 * it arrives.
 */
export function HnFont() {
  useEffect(() => {
    if (document.getElementById('hn-font')) return;

    const link = document.createElement('link');
    link.id = 'hn-font';
    link.rel = 'stylesheet';
    link.href = HREF;
    document.head.appendChild(link);
  }, []);

  return null;
}
