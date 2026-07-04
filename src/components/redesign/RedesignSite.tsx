import { GrainOverlay } from './GrainOverlay'
import { PigmentPreloader } from './PigmentPreloader'
import { ThreadSpine } from './ThreadSpine'
import { RedesignNav } from './RedesignNav'
import { HeroManifesto } from './HeroManifesto'
import { AboutEditorial } from './AboutEditorial'
import { PigmentReveal } from './PigmentReveal'
import { ProjectsEditorial } from './ProjectsEditorial'
import { ServicesEditorial } from './ServicesEditorial'
import { SkillsEditorial } from './SkillsEditorial'
import { ExperienceEditorial } from './ExperienceEditorial'
import { FooterEditorial } from './FooterEditorial'

/** The portfolio in the "Iron, rag & malachite" editorial system. */
export function RedesignSite() {
  return (
    <div className="relative min-h-svh" style={{ background: 'var(--r-ground)', color: 'var(--r-bone)', fontFamily: 'var(--font-body-r)' }}>
      <PigmentPreloader />
      <GrainOverlay />
      <ThreadSpine />
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:px-4 focus:py-2 focus:text-sm"
        style={{ background: 'var(--r-malachite)', color: 'var(--r-ground)', fontFamily: 'var(--font-body-r)' }}
      >
        Skip to content
      </a>
      <RedesignNav />
      <main>
        <HeroManifesto />
        <AboutEditorial />
        <PigmentReveal
          src="/assets/img/projects/mah-e-noor/artwork-1.webp"
          eyebrow="Pigment to surface"
          heading="From pigment, a story assembles."
          alt="Mah-e-Noor artwork — a hand-painted night sky in the Bani Thani idiom"
        />
        <ProjectsEditorial />
        <PigmentReveal
          still
          src="/assets/img/projects/porcelaina/shoot-1.webp"
          eyebrow="Colour, gathering"
          heading="And settles, at last, into cloth."
          alt="Porcelaina — the finished blue-pottery textile, styled in an interior"
        />
        <ServicesEditorial />
        <SkillsEditorial />
        <ExperienceEditorial />
      </main>
      <FooterEditorial />
    </div>
  )
}
