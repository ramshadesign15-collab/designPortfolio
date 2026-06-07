import { Mail, Phone } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Reveal } from '@/components/ui/Reveal'
export function Footer() {
  const { profile } = usePortfolio()
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border-subtle py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.15),transparent_70%)] blur-3xl" />
      <div className="relative mx-auto max-w-content px-6 text-center md:px-10">
        <Reveal variant="up"><p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent-1 md:text-[1rem]">Get in touch</p></Reveal>
        <Reveal variant="clip"><h2 className="mx-auto max-w-[16ch] font-display font-semibold text-balance text-primary" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>Let's make something with a story.</h2></Reveal>
        <Reveal variant="up" delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.social.email}`} className="inline-flex items-center gap-2 rounded-full bg-accent-1 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-base transition-transform hover:scale-[1.03]"><Mail className="h-4 w-4" /> {profile.social.email}</a>
            <a href={`tel:${profile.social.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full border border-border-default px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent-1 hover:text-accent-1"><Phone className="h-4 w-4" /> {profile.social.phone}</a>
          </div>
        </Reveal>
        <p className="mt-16 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
      </div>
    </footer>
  )
}
