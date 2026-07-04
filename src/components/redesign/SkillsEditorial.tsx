import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

export function SkillsEditorial() {
  const { skills } = usePortfolio()
  return (
    <section id="skills" className="py-28 md:py-36" style={{ background: 'var(--r-ground)' }}>
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Label>Capabilities</Label>
        <KerningHeading className="mt-5" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.25rem)', color: 'var(--r-bone)' }}>What I work with</KerningHeading>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.categories.map((cat) => (
            <div key={cat.name} className="border-t pt-5" style={{ borderColor: 'var(--r-hairline)' }}>
              <h3 className="mb-4 text-xs uppercase tracking-[0.16em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-malachite)' }}>{cat.name}</h3>
              <ul className="flex flex-col gap-2.5">
                {cat.items.map((s) => (
                  <li key={s} className="text-sm" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone)' }}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
