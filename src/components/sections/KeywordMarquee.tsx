import { Marquee } from '@/components/ui/Marquee'

const KEYWORDS = ['Madhubani', 'Pichwai', 'Bani Thani', 'Blue Pottery', 'Surface Design', 'Heritage Craft', 'Motif Development', 'Hand Embroidery']

/** Full-width keyword band that sits between the hero and About  no overlap with the hero video. */
export function KeywordMarquee() {
  return (
    <section aria-hidden className="relative border-y border-border-subtle bg-surface/40 py-6 md:py-8">
      <Marquee items={KEYWORDS} durationSeconds={50} />
    </section>
  )
}
