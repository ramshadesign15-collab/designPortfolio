import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

export function ServicesEditorial() {
  const { services } = usePortfolio()
  if (!services?.length) return null
  return (
    <section id="services" className="py-28 md:py-36" style={{ background: 'var(--r-ground-2)' }}>
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Label>What I Offer</Label>
        <KerningHeading className="mt-5" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.25rem)', color: 'var(--r-bone)' }}>Services</KerningHeading>
        <div className="mt-14 flex flex-col">
          {services.map((s, i) => (
            <div key={s.title} className="grid grid-cols-1 gap-5 border-t py-10 md:grid-cols-[auto_1fr_1.25fr] md:gap-12" style={{ borderColor: 'var(--r-hairline)' }}>
              <span style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-malachite)', fontSize: '1.5rem' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-bone)', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', lineHeight: 1.1 }}>{s.title}</h3>
              <div>
                <p className="max-w-[48ch] leading-relaxed" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="border px-3 py-1 text-[0.65rem] uppercase tracking-[0.1em]" style={{ borderColor: 'var(--r-hairline)', color: 'var(--r-bone-soft)', fontFamily: 'var(--font-body-r)' }}>{it}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
