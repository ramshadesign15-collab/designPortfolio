import { usePortfolio } from '@/hooks/usePortfolio'
import { Reveal } from '@/components/ui/Reveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function AboutSection() {
  const { profile, stats, education } = usePortfolio()

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div className="noise-overlay" aria-hidden />
      <span aria-hidden className="pointer-events-none absolute left-4 top-12 select-none font-display text-[8rem] font-semibold leading-none text-primary/[0.04] md:text-[14rem]">01</span>

      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10">
        {/* Identity column */}
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal variant="up"><p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent-1">About</p></Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] text-primary md:text-6xl">{profile.name}</h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-secondary">{profile.role}</p>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">{profile.specialization}</p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">{profile.location}</p>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1 border-b border-border-default pb-1 font-mono text-sm text-secondary transition-colors hover:border-accent-1 hover:text-accent-1">Full résumé ↗</a>
          </Reveal>
        </div>

        {/* Bio + stats + education */}
        <div>
          <AnimatedText text={profile.bio} className="font-display text-2xl font-medium leading-snug text-balance text-primary md:text-[2.1rem]" />

          <div className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} variant="scale" delay={i * 0.08}>
                <div className="rounded-lg border border-border-subtle bg-elevated p-4 md:p-5">
                  <p className="font-display text-2xl font-semibold text-accent-1 md:text-4xl">{stat.value}</p>
                  <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-secondary md:text-[0.65rem]">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={0.1}>
            <div className="mt-6 rounded-lg border border-border-subtle bg-surface p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-secondary">Education</p>
              <ul className="flex flex-col gap-4">
                {education.map((item) => (
                  <li key={item.id} className="border-l border-border-default pl-4">
                    <p className="text-sm font-medium text-primary">{item.qualification}</p>
                    <p className="text-xs text-secondary">{item.institution}</p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">{item.period} · {item.result}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
