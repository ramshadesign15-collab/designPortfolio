import { useEffect, useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useLenis } from '@/components/layout/lenis-context'
import { cn } from '@/lib/utils'
const LINKS = [
  { label: 'Work', href: '#projects' }, { label: 'Services', href: '#services' }, { label: 'About', href: '#about' },
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
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <button type="button" onClick={() => scrollTo('#top', 0)} className="font-display text-lg font-semibold tracking-tight text-primary">{profile.shortName}<span className="text-accent-1">.</span></button>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}><button type="button" onClick={() => scrollTo(l.href, -40)} className="font-mono text-xs uppercase tracking-[0.18em] text-secondary transition-colors hover:text-primary">{l.label}</button></li>
          ))}
        </ul>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border-default px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent-1 hover:text-accent-1">CV</a>
      </nav>
    </header>
  )
}
