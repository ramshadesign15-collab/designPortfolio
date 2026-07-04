import { Mail, Phone } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

export function FooterEditorial() {
  const { profile } = usePortfolio()
  return (
    <footer id="contact" className="relative overflow-hidden py-28 text-center md:py-40" style={{ background: 'var(--r-ground)' }}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(90% 60% at 50% 100%, rgba(79,163,125,0.12), transparent 62%)' }} />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <Label>Get in touch</Label>
        <KerningHeading className="mx-auto mt-6 max-w-[18ch]" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.75rem)', color: 'var(--r-bone)' }}>Let&rsquo;s make something with a story.</KerningHeading>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3" style={{ fontFamily: 'var(--font-body-r)' }}>
          <a href={`mailto:${profile.social.email}`} className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5" style={{ background: 'var(--r-malachite)', color: 'var(--r-ground)' }}>
            <Mail className="h-4 w-4" /> {profile.social.email}
          </a>
          <a href={`tel:${profile.social.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 border px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em]" style={{ borderColor: 'var(--r-hairline)', color: 'var(--r-bone)' }}>
            <Phone className="h-4 w-4" /> {profile.social.phone}
          </a>
        </div>
        <p className="mt-16 text-[0.7rem] uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
      </div>
    </footer>
  )
}
