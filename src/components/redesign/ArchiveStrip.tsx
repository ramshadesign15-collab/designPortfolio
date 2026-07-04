import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

/** A drifting archive of real studio images — matted plates on the dark ground. */
export function ArchiveStrip() {
  const { galleryStrip } = usePortfolio()
  if (!galleryStrip?.length) return null
  const row = [...galleryStrip, ...galleryStrip]
  return (
    <section className="overflow-hidden border-y py-16 md:py-20" style={{ background: 'var(--r-ground)', borderColor: 'var(--r-hairline)' }}>
      <div className="mx-auto mb-10 max-w-content px-6 md:px-10">
        <Label>In the Studio</Label>
        <KerningHeading className="mt-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'var(--r-bone)' }}>A living archive of motifs &amp; make</KerningHeading>
      </div>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max motion-safe:[animation:marquee_80s_linear_infinite]">
          {row.map((src, i) => (
            <div key={i} className="mx-2 h-52 w-72 shrink-0 border p-2 md:h-60 md:w-80" style={{ borderColor: 'var(--r-hairline)', background: 'var(--r-ground-2)' }}>
              <img src={src} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" style={{ filter: 'saturate(0.95)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
