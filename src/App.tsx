import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { Nav } from '@/components/layout/Nav'
import { HeroSection } from '@/components/sections/HeroSection'
import { KeywordMarquee } from '@/components/sections/KeywordMarquee'

const AboutSection = lazy(() => import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSection })))
const GalleryStripSection = lazy(() => import('@/components/sections/GalleryStripSection').then((m) => ({ default: m.GalleryStripSection })))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })))
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection').then((m) => ({ default: m.ServicesSection })))
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection })))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection').then((m) => ({ default: m.SkillsSection })))
const Footer = lazy(() => import('@/components/sections/Footer').then((m) => ({ default: m.Footer })))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-md focus:bg-accent-1 focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-base">Skip to content</a>

        <Nav />
        <main className="relative">
          <HeroSection />
          <KeywordMarquee />
          <Suspense fallback={null}>
            <AboutSection />
            <GalleryStripSection />
            <ProjectsSection />
            <ServicesSection />
            <SkillsSection />
            <ExperienceSection />
          </Suspense>
        </main>
        <Suspense fallback={null}><Footer /></Suspense>
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
