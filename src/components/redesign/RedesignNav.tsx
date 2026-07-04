import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail, Phone } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useLenis } from '@/components/layout/lenis-context'

const LINKS = [
  { label: 'About', href: '#about' }, { label: 'Work', href: '#work' }, { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' }, { label: 'Path', href: '#experience' }, { label: 'Contact', href: '#contact' },
]
const EASE = [0.19, 1, 0.22, 1] as const
const panel = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35, ease: EASE, staggerChildren: 0.05, delayChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.25, ease: EASE } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }

export function RedesignNav() {
  const { profile } = usePortfolio()
  const { scrollTo, stop, start } = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    stop()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onDesktop = () => { if (desktop.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus())
    return () => {
      start()
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
      cancelAnimationFrame(raf)
    }
  }, [open, stop, start])

  const go = (href: string) => { setOpen(false); scrollTo(href, -20) }

  // No backdrop-filter on <header> while open — it would become the containing
  // block for the fixed panel and collapse the overlay to the bar's height.
  return (
    <header
      className="fixed inset-x-0 top-0 z-[200] transition-colors duration-300"
      style={!open && scrolled ? { backgroundColor: 'rgba(14,17,14,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } : undefined}
    >
      <nav className="relative z-10 mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10" style={{ fontFamily: 'var(--font-body-r)' }}>
        <button type="button" onClick={() => go('#top')} style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-bone)' }} className="text-lg tracking-tight">
          {profile.shortName}<span style={{ color: 'var(--r-malachite)' }}>.</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <button type="button" onClick={() => go(l.href)} className="text-xs uppercase tracking-[0.18em] transition-colors" style={{ color: 'var(--r-bone-soft)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--r-bone)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--r-bone-soft)')}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="hidden border px-4 py-2 text-xs uppercase tracking-[0.12em] md:inline-flex" style={{ borderColor: 'var(--r-hairline)', color: 'var(--r-bone)' }}>CV</a>
          <button ref={menuBtnRef} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="r-mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="grid h-11 w-11 place-items-center md:hidden" style={{ backgroundColor: 'rgba(14,17,14,0.5)', color: 'var(--r-bone)' }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="r-mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" variants={panel} initial="hidden" animate="show" exit="exit" style={{ background: 'radial-gradient(115% 75% at 50% 0%, rgba(79,163,125,0.08), transparent 55%), var(--r-ground)' }} className="fixed inset-0 flex flex-col overflow-y-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 md:hidden">
            <nav className="flex flex-col" style={{ fontFamily: 'var(--font-display-r)' }}>
              {LINKS.map((l, i) => (
                <motion.button key={l.href} ref={i === 0 ? firstLinkRef : undefined} type="button" variants={item} onClick={() => go(l.href)} className="border-b py-4 text-left text-3xl" style={{ borderColor: 'var(--r-hairline)', color: 'var(--r-bone)' }}>{l.label}</motion.button>
              ))}
            </nav>
            <motion.div variants={item} className="mt-auto flex flex-col gap-3 pt-8" style={{ fontFamily: 'var(--font-body-r)' }}>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em]" style={{ background: 'var(--r-malachite)', color: 'var(--r-ground)' }}>Download CV</a>
              <a href={`mailto:${profile.social.email}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--r-bone-soft)' }}><Mail className="h-4 w-4" /> {profile.social.email}</a>
              <a href={`tel:${profile.social.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--r-bone-soft)' }}><Phone className="h-4 w-4" /> {profile.social.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
