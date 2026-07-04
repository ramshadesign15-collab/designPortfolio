import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/types/portfolio'
import { KerningHeading, Plate } from './primitives'

/**
 * The Vellum. A sticky, slowly parallaxing photograph with a rag-paper panel
 * that scrolls up over it  the panel's backdrop-blur samples the pinned photo
 * behind it, so the two sit on genuinely different planes. Below the panel, a
 * grid of the collection's real plates on the dark ground. Data-driven: one per
 * collection.
 */
export function VellumCaseStudy({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0px', '0px'] : ['0px', '-56px'])
  const cs = project.caseStudy
  const num = String(index + 1).padStart(2, '0')
  const plates = cs.sections.flatMap((s) => s.images ?? []).slice(0, 6)

  return (
    <div ref={ref} className="relative" style={{ background: 'var(--r-ground)' }}>
      {/* pinned photograph */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <motion.img
          src={cs.hero}
          alt={`${project.title}  ${project.subtitle}`}
          className="h-full w-full object-cover"
          style={{ y, scale: 1.08, filter: 'saturate(0.95) contrast(1.04)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(14,17,14,0.55) 0%, rgba(14,17,14,0.12) 32%, rgba(14,17,14,0.55) 100%)' }}
        />
        <p className="absolute left-6 top-24 text-xs uppercase tracking-[0.28em] md:left-10 md:top-28" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone)' }}>
          <span style={{ color: 'var(--r-malachite)' }}>Work {num}</span> · {project.title}
        </p>
      </div>

      {/* rag-paper panel, pulled up over the pinned photo */}
      <div className="relative z-[2] mx-auto max-w-[720px] px-6" style={{ marginTop: '-64vh' }}>
        <article
          className="border p-9 md:p-14"
          style={{
            background: 'rgba(233,232,226,0.9)',
            backdropFilter: 'blur(22px) saturate(1.05)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.05)',
            borderColor: 'var(--r-hairline-paper)',
            boxShadow: '0 40px 90px -24px rgba(0,0,0,0.5), 0 6px 16px -6px rgba(0,0,0,0.3)',
            color: 'var(--r-ink)',
          }}
        >
          <p className="mb-8 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-malachite-deep)' }}>{project.subtitle}</p>
          <KerningHeading className="mb-10" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)', color: 'var(--r-ink)' }}>{project.title}</KerningHeading>
          <p className="max-w-[62ch] text-lg leading-relaxed md:text-xl" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-ink)' }}>{cs.intro}</p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-10 sm:grid-cols-4" style={{ borderColor: 'var(--r-hairline-paper)', fontFamily: 'var(--font-body-r)' }}>
            {cs.meta.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em]" style={{ color: 'var(--r-malachite-deep)' }}>{m.label}</dt>
                <dd className="mt-1.5 text-sm" style={{ color: 'var(--r-ink)' }}>{m.value}</dd>
              </div>
            ))}
          </div>

          <div className="mt-8" style={{ fontFamily: 'var(--font-body-r)' }}>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.16em]" style={{ color: 'var(--r-malachite-deep)' }}>Palette</p>
            <div className="flex flex-wrap gap-2">
              {cs.palette.map((sw) => (
                <span key={sw.hex} title={`${sw.name} · ${sw.hex}`} className="h-8 w-8 border" style={{ background: sw.hex, borderColor: 'rgba(20,20,15,0.15)' }} />
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* the collection's real plates, on the ground */}
      {plates.length > 0 && (
        <div className="relative z-[2] mx-auto max-w-content px-6 pb-28 pt-16 md:px-10 md:pb-36 md:pt-24">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {plates.map((src, i) => (
              <Plate key={src} src={src} alt={`${project.title}  plate ${i + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
