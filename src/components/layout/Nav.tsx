import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail, Phone } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useLenis } from '@/components/layout/lenis-context'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'About', href: '#about' }, { label: 'Work', href: '#projects' }, { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' }, { label: 'Path', href: '#experience' }, { label: 'Contact', href: '#contact' },
]

const EASE = [0.19, 1, 0.22, 1] as const
const panel = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35, ease: EASE, staggerChildren: 0.05, delayChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.25, ease: EASE } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }

export function Nav() {
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

  // While the menu is open: pause Lenis + lock body scroll, close on Escape,
  // close if the viewport grows to desktop, and move focus into the panel.
  useEffect(() => {
    if (!open) return
    stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onDesktop = () => { if (desktop.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus())
    return () => {
      start()
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
      cancelAnimationFrame(raf)
    }
  }, [open, stop, start])

  const go = (href: string) => { setOpen(false); scrollTo(href, -40) }
  const closeToButton = () => { setOpen(false); menuBtnRef.current?.focus() }

  // NOTE: no backdrop-filter/transform on <header> while the menu is open — either
  // would make it the containing block for the `position: fixed` panel below,
  // collapsing the full-screen overlay to the header bar's own height.
  return (
    <header
      style={!open && scrolled ? { backgroundColor: 'rgba(7,9,15,0.82)' } : undefined}
      className={cn('fixed inset-x-0 top-0 z-[200] transition-colors duration-300', !open && scrolled ? 'backdrop-blur-md' : 'bg-transparent')}
    >
      <nav className="relative z-10 mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <button type="button" onClick={() => go('#top')} className="font-display text-lg font-semibold tracking-tight text-primary">{profile.shortName}<span className="text-accent-1">.</span></button>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}><button type="button" onClick={() => go(l.href)} className="font-mono text-xs uppercase tracking-[0.18em] text-secondary transition-colors hover:text-primary">{l.label}</button></li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-border-default px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent-1 hover:text-accent-1 md:inline-flex">CV</a>
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{ backgroundColor: 'rgba(7,9,15,0.5)' }}
            className="grid h-11 w-11 place-items-center rounded-full text-primary backdrop-blur-sm transition-colors hover:text-accent-1 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{ background: 'radial-gradient(115% 75% at 50% 0%, rgba(200,169,110,0.07), transparent 55%), var(--bg-base)' }}
            className="fixed inset-0 flex flex-col overflow-y-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 md:hidden"
          >
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  type="button"
                  variants={item}
                  onClick={() => go(l.href)}
                  className="border-b border-border-subtle py-4 text-left font-display text-3xl font-medium text-primary transition-colors hover:text-accent-1"
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>

            <motion.div variants={item} className="mt-auto flex flex-col gap-3 pt-8">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={closeToButton} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-1 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-base transition-transform hover:scale-[1.02]">Download CV</a>
              <a href={`mailto:${profile.social.email}`} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-secondary transition-colors hover:text-accent-1"><Mail className="h-4 w-4" /> {profile.social.email}</a>
              <a href={`tel:${profile.social.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-secondary transition-colors hover:text-accent-1"><Phone className="h-4 w-4" /> {profile.social.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
