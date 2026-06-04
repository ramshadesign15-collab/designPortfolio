import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CaseSection, Project } from '@/types/portfolio'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectImage } from '@/components/ui/ProjectImage'
import { cn } from '@/lib/utils'

interface Props { project: Project }

function SectionIndex({ children }: { children: string }) {
  // Sits as a faint watermark numeral, lifted fully above the section content so
  // it never overlaps the images. Colour is set inline (not via the `/opacity`
  // shorthand) because the theme colours are full hex strings, which makes
  // Tailwind's `text-primary/[x]` compile to invalid CSS and render opaque.
  return <span aria-hidden style={{ color: 'rgba(240,237,232,0.06)' }} className="pointer-events-none absolute -top-[5rem] right-0 -z-10 select-none font-display text-[4.5rem] font-semibold leading-none md:-top-[8.5rem] md:text-[8rem]">{children}</span>
}
function SectionHeading({ section }: { section: CaseSection }) {
  return (
    <div className="mb-8 md:mb-12">
      {section.eyebrow && <Reveal variant="up"><p className="mb-4 font-display text-2xl font-semibold uppercase tracking-[0.16em] text-accent-1 md:text-[2rem]">{section.eyebrow}</p></Reveal>}
      {section.title && <Reveal variant="clip"><h3 className="font-display font-semibold leading-tight text-primary" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.5rem)' }}>{section.title}</h3></Reveal>}
    </div>
  )
}
function Body({ paragraphs }: { paragraphs?: string[] }) {
  if (!paragraphs?.length) return null
  return <div className="flex flex-col gap-5">{paragraphs.map((p, i) => (<Reveal key={i} variant="up" delay={i * 0.06}><p className="max-w-[60ch] text-base leading-relaxed text-secondary md:text-lg">{p}</p></Reveal>))}</div>
}

function OverviewSection({ section }: { section: CaseSection }) {
  const images = section.images ?? []
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
      <div className="md:sticky md:top-28 md:self-start"><SectionHeading section={section} /><Body paragraphs={section.body} /></div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {images.map((src, i) => (<Reveal key={src} variant={i % 2 === 0 ? 'right' : 'up'} delay={i * 0.08} className={cn(images.length === 1 && 'sm:col-span-2')}><ProjectImage src={src} alt={`${section.title ?? 'Project'}  ${i + 1}`} fit="contain" /></Reveal>))}
      </div>
    </div>
  )
}
function MoodboardSection({ section }: { section: CaseSection }) {
  const images = section.images ?? []
  return (
    <div>
      <SectionHeading section={section} /><Body paragraphs={section.body} />
      <div className="mt-10 grid grid-cols-2 items-start gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (<Reveal key={src} variant="scale" delay={(i % 4) * 0.05}><motion.div whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 0.8 : -0.8 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}><ProjectImage src={src} alt={`Moodboard reference ${i + 1}`} fit="contain" tilt={3} /></motion.div></Reveal>))}
      </div>
    </div>
  )
}
function StatementSection({ section, color }: { section: CaseSection; color: string }) {
  const statements = section.statements ?? []
  const images = section.images ?? []
  return (
    <div>
      <SectionHeading section={section} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {statements.map((s, i) => (
          <Reveal key={s.label} variant={i === 0 ? 'left' : 'right'} delay={i * 0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface">
              {images[i] && (
                <div className="bg-elevated/50 p-2"><img src={images[i]!} alt={s.label} loading="lazy" decoding="async" className="max-h-[20rem] w-full rounded-md object-contain" /></div>
              )}
              <div className="flex flex-1 flex-col justify-end p-8 md:p-10">
                <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.25em]" style={{ color }}>{s.label}</span>
                <p className="font-display text-xl font-medium leading-snug text-primary md:text-2xl">{s.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
function SpecSection({ section, color }: { section: CaseSection; color: string }) {
  const specs = section.specs ?? []
  return (
    <div>
      <SectionHeading section={section} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map((group, i) => (
          <Reveal key={group.label} variant="up" delay={(i % 3) * 0.07}>
            <div className="h-full rounded-lg border border-border-subtle bg-surface p-6 transition-colors hover:border-accent-1/50">
              <div className="mb-4 flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} /><h4 className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{group.label}</h4></div>
              <ul className="flex flex-col gap-2.5">{group.items.map((item) => (<li key={item} className="flex gap-2 text-sm leading-relaxed text-secondary"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />{item}</li>))}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
function GallerySection({ section }: { section: CaseSection }) {
  const images = section.images ?? []
  const wide = section.layout === 'wide'
  // Uniform tile size: process/"making" galleries are landscape, the rest
  // (shoot swatches, surfaces) are portrait. A fixed aspect ratio per section
  // keeps every tile identical; object-contain inside avoids cropping labels.
  const aspect = section.id.includes('making') ? 'aspect-[4/3]' : 'aspect-[3/4]'
  return (
    <div>
      <SectionHeading section={section} /><Body paragraphs={section.body} />
      {/* Ordered grid: lays images out left-to-right, top-to-bottom in source
          order so numbered sequences (REPEAT 1…N) read in order. CSS columns
          fill column-first and scramble the visual sequence. */}
      <div className={cn('mt-10 grid items-start gap-5', wide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3')}>
        {images.map((src, i) => (
          <Reveal key={src} variant={i % 2 === 0 ? 'up' : 'scale'} delay={(i % 3) * 0.06}>
            <ProjectImage src={src} alt={`${section.title ?? 'Gallery'}  ${i + 1}`} fit="contain" aspect={aspect} tilt={4} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function renderSection(section: CaseSection, color: string) {
  switch (section.kind) {
    case 'overview': return <OverviewSection section={section} />
    case 'moodboard': return <MoodboardSection section={section} />
    case 'statement': return <StatementSection section={section} color={color} />
    case 'spec': return <SpecSection section={section} color={color} />
    case 'gallery': return <GallerySection section={section} />
    default: return null
  }
}

export function ProjectCaseStudy({ project }: Props) {
  const cs = project.caseStudy
  return (
    <article id={project.id} className="relative scroll-mt-20">
      <div className="mx-auto max-w-content px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.7fr]">
          <Reveal variant="up"><p className="font-display text-2xl font-medium leading-snug text-balance text-primary md:text-[2.1rem]">{cs.intro}</p></Reveal>
          <div className="flex flex-col gap-8">
            <Reveal variant="up" delay={0.1}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5">{cs.meta.map((m) => (<div key={m.label}><dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">{m.label}</dt><dd className="mt-1 text-sm text-primary">{m.value}</dd></div>))}</dl>
            </Reveal>
            <Reveal variant="up" delay={0.18}>
              <div><p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Palette</p><div className="flex flex-wrap gap-2">{cs.palette.map((sw) => <span key={sw.hex} className="h-7 w-7 rounded-full border border-white/10" style={{ backgroundColor: sw.hex }} title={`${sw.name} ${sw.hex}`} />)}</div></div>
            </Reveal>
            <Reveal variant="up" delay={0.24}>
              <div className="flex flex-wrap gap-2">{project.stack.map((t) => <span key={t} className="rounded-full border border-border-subtle px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-secondary">{t}</span>)}</div>
            </Reveal>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-24 pb-28 md:gap-36 md:pb-40">
        {cs.sections.map((section, i) => (
          <section key={section.id} className="relative pt-10 md:pt-16"><div className="relative mx-auto max-w-content px-6 md:px-10"><SectionIndex>{String(i + 1).padStart(2, '0')}</SectionIndex>{renderSection(section, project.color)}</div></section>
        ))}
      </div>
      {project.link && (
        <div className="mx-auto max-w-content px-6 pb-28 md:px-10"><a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-1 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-base transition-transform hover:scale-[1.03]">View Live Project <ArrowUpRight className="h-4 w-4" /></a></div>
      )}
    </article>
  )
}