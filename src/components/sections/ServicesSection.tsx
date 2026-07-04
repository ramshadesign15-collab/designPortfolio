import { usePortfolio } from '@/hooks/usePortfolio'
import { Reveal } from '@/components/ui/Reveal'

export function ServicesSection() {
  const { services } = usePortfolio()
  if (!services?.length) return null

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-display font-semibold text-primary" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}>Services</h2>
          </div>
          <span aria-hidden className="hidden select-none font-display text-[7rem] font-semibold leading-none text-primary/[0.04] md:block">+</span>
        </header>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} variant="up" delay={(i % 2) * 0.08}>
              <div className="group h-full bg-surface p-8 transition-colors hover:bg-elevated md:p-10">
                <div className="mb-5 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent-1">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl font-medium text-primary md:text-3xl">{s.title}</h3>
                </div>
                {/* NOTE: avoid `text-base` here  this project defines a custom
                    color token `base` (#07090f), so `text-base` resolves to the
                    near-black COLOR (not just 1rem size) and makes the text
                    invisible on the dark card. Use an arbitrary size instead. */}
                <p className="mb-6 max-w-[46ch] text-sm leading-relaxed text-secondary md:text-[1rem]">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-full border border-border-default px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-secondary transition-colors group-hover:border-accent-1/50 group-hover:text-primary">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
