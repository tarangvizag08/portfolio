import { RevealEngine } from '@/components/ui/reveal';
import { SiteHeader } from '@/components/site-header';
import { SiteMenu } from '@/components/site-menu';
import { SiteDock } from '@/components/site-dock';
import { PageBlur } from '@/components/page-blur';
import { SiteBackdrop } from '@/components/site-backdrop';
import { SiteFooter } from '@/components/site-footer';
import { LandingHero } from '@/components/sections/landing-hero';
import { About } from '@/components/sections/about';
import { Research } from '@/components/sections/research';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Leadership } from '@/components/sections/leadership';
import { Skills } from '@/components/sections/skills';
import { Gallery } from '@/components/sections/gallery';
import { Achievements } from '@/components/sections/achievements';
import { Contact } from '@/components/sections/contact';

export default function Page() {
  return (
    <>
      <RevealEngine />
      <SiteBackdrop />
      <div aria-hidden="true" className="page-veil" />
      <SiteHeader />
      <SiteMenu />
      <main id="main">
        <LandingHero />
        <About />
        <Research />
        <Projects />
        <Experience />
        <Leadership />
        <Skills />
        <Gallery />
        <Achievements />
        <Contact />
      </main>
      <PageBlur />
      <SiteDock />
      <SiteFooter />
    </>
  );
}
