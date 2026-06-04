import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/components/layout/lenis-context'
import { Magnet } from '@/components/ui/Magnet'

const CinematicLayer = lazy(() => import('@/components/three/CinematicLayer').then((m) => ({ default: m.CinematicLayer })))

const EASE = [0.19, 1, 0.22, 1] as const
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } }
const PORTRAIT = '/assets/img/profile.jpg'

export function HeroSection() {
  const { profile } = usePortfolio()
  const reducedMotion = useReducedMotion()
  const { scrollTo } = useLenis()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-20" style={{ background: 'radial-gradient(120% 90% at 70% 30%, rgba(62,92,154,0.35), transparent 55%), linear-gradient(to bottom, rgba(7,9,15,0.55) 0%, rgba(7,9,15,0.35) 40%, var(--bg-base) 96%)' }} />

      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}><CinematicLayer reducedMotion={reducedMotion} /></Suspense>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-content grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1fr_0.9fr] md:px-10">
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 py-10 md:order-1 md:py-32">
          <motion.p variants={fadeUp} className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.3em] text-secondary"><span className="mr-2 inline-block h-px w-8 translate-y-[-3px] bg-accent-1 align-middle" />{profile.role}</motion.p>
          <motion.h1 variants={fadeUp} className="font-display font-semibold leading-[0.92] text-balance" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
            <span className="block text-primary">{profile.name.split(' ')[0]}</span>
            <span className="text-gradient block">{profile.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-[42ch] text-lg leading-relaxed text-primary/90 md:text-xl">{profile.tagline}<span className="caret" aria-hidden /></motion.p>
          <motion.p variants={fadeUp} className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{profile.specialization} · {profile.location}</motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnet>
              <button type="button" onClick={() => scrollTo('#projects', -40)} className="group inline-flex items-center gap-2 rounded-full bg-accent-1 px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-base transition-transform hover:scale-[1.03]">View Work <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" /></button>
            </Magnet>
            <Magnet>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border-default px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent-1 hover:text-accent-1">Download CV</a>
            </Magnet>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }} className="relative order-1 mx-auto w-full max-w-[440px] md:order-2 md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-default bg-elevated shadow-2xl shadow-black/50">
            <img src={PORTRAIT} alt={profile.name} className="h-full w-full object-cover" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base/70 to-transparent" />
          </div>
        </motion.div>
      </div>

      <motion.div aria-hidden animate={{ opacity: scrolled ? 0 : 1 }} transition={{ duration: 0.4 }} className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">Scroll</span>
        <motion.span animate={reducedMotion ? {} : { scaleY: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="block h-10 w-px origin-top bg-gradient-to-b from-accent-1 to-transparent" />
      </motion.div>
    </section>
  )
}
