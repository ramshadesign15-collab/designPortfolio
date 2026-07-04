import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

export function ExperienceEditorial() {
  const { experience } = usePortfolio()
  if (!experience.length) return null
  return (
    <section id="experience" className="py-28 md:py-36" style={{ background: 'var(--r-ground-2)' }}>
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Label>The Path</Label>
        <KerningHeading className="mt-5" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.25rem)', color: 'var(--r-bone)' }}>Training &amp; industry</KerningHeading>
        <div className="mt-14 flex flex-col">
          {experience.map((item, i) => (
            <div key={item.id} className="grid grid-cols-1 gap-5 border-t py-10 md:grid-cols-[auto_1fr_1.25fr] md:gap-12" style={{ borderColor: 'var(--r-hairline)' }}>
              <span style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-malachite)', fontSize: '1.5rem' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-bone)', fontSize: '1.3rem', lineHeight: 1.15 }}>{item.role}</h3>
                <p className="mt-1 text-sm" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{item.company}</p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{item.period} · {item.location}</p>
              </div>
              <div>
                <p className="mb-3" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone)' }}>{item.summary}</p>
                <ul className="flex flex-col gap-1.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--r-malachite)' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
