import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

export function AboutEditorial() {
  const { profile, stats, education } = usePortfolio()
  return (
    <section id="about" className="relative py-28 md:py-40" style={{ background: 'var(--r-ground)' }}>
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-10">
        <div className="md:sticky md:top-28 md:self-start">
          <Label>About</Label>
          <KerningHeading className="mt-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: 'var(--r-bone)' }}>{profile.name}</KerningHeading>
          <p className="mt-5 text-sm uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{profile.role}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{profile.specialization}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{profile.location}</p>
        </div>

        <div>
          <div className="border p-8 md:p-12" style={{ background: 'var(--r-paper)', borderColor: 'var(--r-hairline-paper)', boxShadow: '0 30px 70px -30px rgba(0,0,0,0.5)' }}>
            <p className="text-xl leading-snug md:text-[1.6rem]" style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-ink)', lineHeight: 1.35 }}>{profile.bio}</p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border-t pt-4" style={{ borderColor: 'var(--r-hairline)' }}>
                <p style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-malachite)', fontSize: 'clamp(1.5rem, 3vw, 2.3rem)' }}>{s.value}</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.12em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Label className="mb-4">Education</Label>
            <ul className="flex flex-col gap-4">
              {education.map((item) => (
                <li key={item.id} className="border-t pt-4" style={{ borderColor: 'var(--r-hairline)' }}>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone)' }}>{item.qualification}</p>
                  <p className="text-xs" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{item.institution}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>{item.period} · {item.result}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
