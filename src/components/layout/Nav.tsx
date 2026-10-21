import { useEffect, useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useLenis } from '@/components/layout/lenis-context'
import { cn } from '@/lib/utils'
const LINKS = [
  { label: 'About', href: '#about' }, { label: 'Work', href: '#projects' }, { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' }, { label: 'Path', href: '#experience' }, { label: 'Contact', href: '#contact' },
]
export function Nav() {
  const { profile } = usePortfolio()
  const { scrollTo } = useLenis()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={cn('fixed inset-x-0 top-0 z-[200] transition-colors duration-300', scrolled ? 'bg-base/80 backdrop-blur-md' : 'bg-transparent')}>
      <nav className="mx-auto flex max-w-content flex-wrap items-center justify-between px-6 py-4 md:flex-nowrap md:px-10">
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('#top', 0) }} className="font-display text-lg font-semibold tracking-tight text-primary transition-colors hover:text-accent-1">{profile.shortName}<span className="text-accent-1">.</span></a>
        {/* Real links (Cmd-click, hash) that still scroll via Lenis; on mobile they wrap to a scrollable second row */}
        <ul className="order-last -mx-6 mt-3 flex w-[calc(100%+3rem)] items-center gap-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:order-none md:mx-0 md:mt-0 md:w-auto md:gap-8 md:overflow-visible md:p-0">
          {LINKS.map((l) => (
            <li key={l.href} className="shrink-0"><a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href, -40) }} className="font-mono text-xs uppercase tracking-[0.18em] text-secondary transition-colors hover:text-primary">{l.label}</a></li>
          ))}
        </ul>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border-default px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent-1 hover:text-accent-1">CV</a>
      </nav>
    </header>
  )
}
