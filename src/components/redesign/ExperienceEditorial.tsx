import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

/** The path, woven: a warp thread runs through the timeline, tying a knot at
 *  each step — the same Loom metaphor as the page spine, at section scale. */
export function ExperienceEditorial() {
  const { experience } = usePortfolio()
  if (!experience.length) return null
  return (
    <section id="experience" className="py-28 md:py-36" style={{ background: 'var(--r-ground-2)' }}>
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Label>The Path</Label>
        <KerningHeading className="mt-5" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.25rem)', color: 'var(--r-bone)' }}>Training &amp; industry</KerningHeading>

        <div className="relative mt-14">
          {/* the warp thread running the length of the path */}
          <div aria-hidden className="absolute bottom-12 left-[7px] top-12 w-px md:left-[9px]" style={{ background: 'var(--r-malachite)', opacity: 0.35 }} />
          <div className="flex flex-col">
            {experience.map((item, i) => (
              <div key={item.id} className="relative grid grid-cols-1 gap-4 py-10 pl-10 md:grid-cols-[1fr_1.25fr] md:gap-12 md:pl-16">
                {/* knot tied at this step */}
                <span aria-hidden className="absolute left-[2px] top-12 h-2.5 w-2.5 rotate-45 md:left-[4px]" style={{ background: 'var(--r-malachite)' }} />
                <div>
                  <span className="text-xs tracking-[0.1em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-malachite)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2" style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-bone)', fontSize: '1.35rem', lineHeight: 1.15 }}>{item.role}</h3>
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
      </div>
    </section>
  )
}
