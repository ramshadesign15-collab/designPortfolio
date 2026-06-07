import { motion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import type { Experience } from '@/types/portfolio'
const EASE = [0.19, 1, 0.22, 1] as const
const viewport = { once: false, amount: 0.3 }
function initialsOf(c: string): string { return c.replace(/[^a-zA-Z\s]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') }
function ExperienceRow({ item, index }: { item: Experience; index: number }) {
  return (
    <div className="relative grid grid-cols-1 gap-6 py-10 md:grid-cols-[auto_1fr_1.2fr] md:gap-10">
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ duration: 0.7, ease: EASE }} className="flex items-center gap-4">
        <span className="font-display text-4xl font-semibold text-primary/[0.12] md:text-6xl">{String(index + 1).padStart(2, '0')}</span>
        <span className="hidden h-2 w-2 rounded-full bg-accent-1 md:block" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ duration: 0.7, ease: EASE }}>
        <div className="mb-3 flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-default font-mono text-xs text-accent-1">{initialsOf(item.company)}</span>
          <div><h3 className="font-display text-xl font-medium text-primary">{item.role}</h3><p className="text-sm text-secondary">{item.company}</p></div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-surface px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-secondary">{item.period}</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">{item.location}</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ duration: 0.7, ease: EASE }}>
        <p className="mb-3 text-sm text-primary/90">{item.summary}</p>
        <ul className="flex flex-col gap-1.5">{item.highlights.map((h) => (<li key={h} className="flex gap-2 text-sm text-secondary"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-1" />{h}</li>))}</ul>
      </motion.div>
    </div>
  )
}
export function ExperienceSection() {
  const { experience } = usePortfolio()
  if (experience.length === 0) return null
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-accent-1 md:text-[1rem]">The Path</p>
            <h2 className="font-display font-semibold text-primary" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}>Training & Industry</h2>
          </div>
          <span aria-hidden className="hidden select-none font-display text-[7rem] font-semibold leading-none text-primary/[0.04] md:block">03</span>
        </header>
        <div className="divide-y divide-border-subtle">{experience.map((item, i) => <ExperienceRow key={item.id} item={item} index={i} />)}</div>
      </div>
    </section>
  )
}
