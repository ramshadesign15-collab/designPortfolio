import { GrainOverlay } from './GrainOverlay'
import { RedesignNav } from './RedesignNav'
import { HeroManifesto } from './HeroManifesto'
import { AboutEditorial } from './AboutEditorial'
import { ArchiveStrip } from './ArchiveStrip'
import { ProjectsEditorial } from './ProjectsEditorial'
import { ServicesEditorial } from './ServicesEditorial'
import { SkillsEditorial } from './SkillsEditorial'
import { ExperienceEditorial } from './ExperienceEditorial'
import { FooterEditorial } from './FooterEditorial'

/** The portfolio in the "Iron, rag & malachite" editorial system. */
export function RedesignSite() {
  return (
    <div className="min-h-svh" style={{ background: 'var(--r-ground)', color: 'var(--r-bone)', fontFamily: 'var(--font-body-r)' }}>
      <GrainOverlay />
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
        <ArchiveStrip />
        <ProjectsEditorial />
        <ServicesEditorial />
        <SkillsEditorial />
        <ExperienceEditorial />
      </main>
      <FooterEditorial />
    </div>
  )
}
