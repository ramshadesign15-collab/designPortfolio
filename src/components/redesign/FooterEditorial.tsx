import { Mail, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

const EASE = [0.16, 1, 0.3, 1] as const

/** The finish: a full closing screen where the thread ties off in a knot — the
 *  cloth complete — with the contact call to action as the last, strongest beat. */
export function FooterEditorial() {
  const { profile } = usePortfolio()
  const reduce = useReducedMotion()
  return (
    <footer id="contact" className="relative flex min-h-svh items-center overflow-hidden py-24 text-center" style={{ background: 'var(--r-ground)' }}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(80% 55% at 50% 100%, rgba(79,163,125,0.14), transparent 60%)' }} />
      <div className="relative mx-auto flex max-w-content flex-col items-center px-6 md:px-10">
        {/* the thread ties off in a knot */}
        <svg width="12" height="76" viewBox="0 0 12 76" fill="none" className="mb-10" aria-hidden>
          <motion.path
            d="M6,0 L6,66"
            stroke="var(--r-malachite)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          />
          <motion.circle
            cx="6"
            cy="70"
            r="3.5"
            fill="var(--r-malachite)"
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: 0.75, duration: 0.4, ease: EASE }}
            style={{ transformOrigin: '6px 70px' }}
          />
        </svg>

        <Label>Get in touch</Label>
        <KerningHeading className="mx-auto mt-6 max-w-[15ch] text-balance" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', color: 'var(--r-bone)' }}>Let&rsquo;s make something with a story.</KerningHeading>
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed md:text-lg" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>
          Open to commissions, collaborations, and collections that turn heritage craft into surfaces people live with.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3" style={{ fontFamily: 'var(--font-body-r)' }}>
          <a href={`mailto:${profile.social.email}`} className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5" style={{ background: 'var(--r-malachite)', color: 'var(--r-ground)' }}>
            <Mail className="h-4 w-4" /> {profile.social.email}
          </a>
          <a href={`tel:${profile.social.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 border px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors" style={{ borderColor: 'var(--r-hairline)', color: 'var(--r-bone)' }}>
            <Phone className="h-4 w-4" /> {profile.social.phone}
          </a>
        </div>

        <p className="mt-20 text-[0.7rem] uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
      </div>
    </footer>
  )
}
