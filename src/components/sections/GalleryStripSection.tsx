import { usePortfolio } from '@/hooks/usePortfolio'
import { ImageMarquee } from '@/components/ui/ImageMarquee'
import { Reveal } from '@/components/ui/Reveal'

export function GalleryStripSection() {
  const { galleryStrip } = usePortfolio()
  if (!galleryStrip?.length) return null
  const half = Math.ceil(galleryStrip.length / 2)
  const rowOne = galleryStrip.slice(0, half)
  const rowTwo = galleryStrip.slice(half)

  return (
    <section className="relative overflow-hidden border-y border-border-subtle py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-content px-6 md:px-10">
        <Reveal variant="up">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-1">In the Studio</p>
          <h2 className="mt-2 font-display font-semibold text-primary" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>A living archive of motifs & make</h2>
        </Reveal>
      </div>
      <ImageMarquee rowOne={rowOne} rowTwo={rowTwo} />
    </section>
  )
}
