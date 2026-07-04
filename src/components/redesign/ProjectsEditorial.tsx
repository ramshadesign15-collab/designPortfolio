import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'
import { MotifAssembly } from './MotifAssembly'
import { VellumCaseStudy } from './VellumCaseStudy'

export function ProjectsEditorial() {
  const { projects } = usePortfolio()
  const ordered = [...projects].sort((a, b) => Number(b.highlight) - Number(a.highlight))
  return (
    <section id="work" style={{ background: 'var(--r-ground)' }}>
      <div className="mx-auto max-w-content px-6 pt-28 md:px-10 md:pt-36">
        <Label>Selected Work</Label>
        <KerningHeading className="mt-4" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.25rem)', color: 'var(--r-bone)' }}>Three collections</KerningHeading>
        <p className="mt-5 max-w-[54ch] text-lg" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>
          Each a full design story  from first concept and moodboard through craft, market positioning, and the final shoot.
        </p>
        <div className="mt-10">
          <MotifAssembly />
        </div>
      </div>
      <div className="mt-16 flex flex-col md:mt-24">
        {ordered.map((p, i) => (
          <VellumCaseStudy key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
