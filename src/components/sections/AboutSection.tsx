import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Reveal } from '@/components/ui/Reveal'
import { AnimatedText } from '@/components/ui/AnimatedText'

const AVATAR_SRC = '/assets/img/avatar.png'

export function AboutSection() {
  const { profile, stats, education } = usePortfolio()
  const portraitRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: portraitRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const rotate = useTransform(scrollYProgress, [0, 1], [3, -3])

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div className="noise-overlay" aria-hidden />
      <span aria-hidden className="pointer-events-none absolute left-4 top-12 select-none font-display text-[8rem] font-semibold leading-none text-primary/[0.04] md:text-[14rem]">01</span>

      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10">
        {/* Portrait (her avatar) */}
        <div ref={portraitRef} className="relative mx-auto w-full max-w-[360px] [perspective:1200px] md:sticky md:top-28 md:self-start">
          <motion.div style={{ y, rotateY: rotate, transformStyle: 'preserve-3d' }} className="relative overflow-hidden rounded-2xl border border-border-default bg-elevated shadow-2xl shadow-black/50">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(200,169,110,0.25),transparent_70%)]" />
            <img src={AVATAR_SRC} alt={profile.name} loading="lazy" decoding="async" className="w-full object-contain" />
          </motion.div>
          <div className="mt-4 text-center">
            <p className="font-display text-lg text-primary">{profile.name}</p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">{profile.role}</p>
          </div>
        </div>

        {/* Bio + stats + education */}
        <div>
          <Reveal variant="up"><p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent-1">About</p></Reveal>
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

          <Reveal variant="up" delay={0.15}>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1 border-b border-border-default pb-1 font-mono text-sm text-secondary transition-colors hover:border-accent-1 hover:text-accent-1">Full résumé ↗</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
