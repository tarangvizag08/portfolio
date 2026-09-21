import type { Metadata, Viewport } from 'next';
import { HnFont } from '@/components/ui/hn-font';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Tarang Gupta — Portfolio',
  description:
    'Radar and SAR signal processing, Wi-Fi 7 wireless systems, VLSI/RTL chip design, and embedded systems. Final-year ECE student at VIT Chennai.',
  metadataBase: new URL('https://tarang-gupta.vercel.app'),
  openGraph: {
    title: 'Tarang Gupta — Electronics & Communication Engineer',
    description:
      'Radar and SAR signal processing, Wi-Fi 7 wireless systems, VLSI/RTL chip design, and embedded systems.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#517a60',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        {/* The stylesheet itself is injected client-side by <HnFont /> — see
            that file for why. Preconnecting here still saves the round trip. */}
        <link rel="preconnect" href="https://db.onlinewebfonts.com" crossOrigin="" />
        {/* Scroll reveals start at opacity 0 and are switched on by
            IntersectionObserver. Without JS nothing would ever switch them on,
            so the whole page below the hero would render blank. */}
        <noscript>
          <style>{`.sr{opacity:1!important;transform:none!important;filter:none!important}.rule-draw{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <HnFont />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
