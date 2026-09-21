import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Next 16 rejects any `quality` not listed here and silently falls back to
    // 75 — which is why the hero looked soft despite quality={82} on the
    // component. The hero is the one image on the site that has to hold up
    // full-bleed, so it gets 92.
    qualities: [75, 92],
  },
};

export default nextConfig;
