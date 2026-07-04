import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLenis } from '@/components/layout/lenis-context'
import { PortraitMat } from './PortraitMat'

const EASE_INK = [0.22, 0.61, 0.36, 1] as const
const EASE_SETTLE = [0.16, 1, 0.3, 1] as const

/**
 * The Weave-In. The manifesto line is drawn left-to-right (clip-path) while a
 * malachite "needle" rides the reveal edge  the thread being laid into cloth.
 * Everything sits on the dark iron ground; the portrait is a matted print.
 */
export function HeroManifesto() {
  const reduce = useReducedMotion()
  const { scrollTo } = useLenis()
  const lineRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const measure = () => setWidth(el.offsetWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <header
      id="top"
      className="relative flex min-h-svh w-full items-center overflow-hidden"
      style={{ background: 'var(--r-ground)', color: 'var(--r-bone)' }}
    >
      {/* faint dye-vat wash so the ground isn't flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 12% 18%, rgba(79,163,125,0.10), transparent 55%)' }}
      />

      <div className="relative mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 px-6 py-28 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:px-10 md:py-32">
        <div className="order-2 md:order-1">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_INK }}
            className="mb-8 text-xs uppercase tracking-[0.22em]"
            style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-malachite)' }}
          >
            <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] align-middle" style={{ background: 'var(--r-malachite)' }} />
            Ramsha Ansari · Textile &amp; Surface Designer
          </motion.p>

          <h1
            className="text-balance"
            style={{
              fontFamily: 'var(--font-display-r)',
              fontSize: 'clamp(2.6rem, 6.4vw, 5.25rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.005em',
            }}
          >
            <span ref={lineRef} className="relative block">
              <motion.span
                className="block"
                initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
                animate={reduce ? false : { clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.25, ease: EASE_INK, delay: 0.15 }}
                style={reduce ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
              >
                A living archive of thread, pigment{' '}
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: 0 }}
                  animate={reduce ? false : { y: [-1.5, 1.5, 0] }}
                  transition={{ duration: 0.5, ease: EASE_SETTLE, delay: 1.5 }}
                  style={{ color: 'var(--r-malachite)' }}
                >
                  &amp;
                </motion.span>{' '}
                story.
              </motion.span>

              {!reduce && width > 0 && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-px"
                  style={{ background: 'var(--r-malachite)' }}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: width, opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 1.25,
                    ease: EASE_INK,
                    delay: 0.15,
                    opacity: { duration: 1.25, delay: 0.15, times: [0, 0.06, 0.9, 1] },
                  }}
                />
              )}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_INK, delay: 0.9 }}
            className="mt-8 max-w-[46ch] text-lg leading-relaxed md:text-xl"
            style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}
          >
            Heritage art in Madhubani, Pichwai, Bani Thani and blue pottery, reworked into
            surfaces people live with.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_INK, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-3"
            style={{ fontFamily: 'var(--font-body-r)' }}
          >
            <button
              type="button"
              onClick={() => scrollTo('#work', 0)}
              className="group inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--r-malachite)', color: 'var(--r-ground)' }}
            >
              View the work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
              style={{ borderColor: 'var(--r-hairline)', color: 'var(--r-bone)' }}
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={reduce ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_SETTLE, delay: 0.3 }}
          className="order-1 mx-auto md:order-2 md:ml-auto md:mr-0"
        >
          <PortraitMat src="/assets/img/profile.jpg" alt="Ramsha Ansari, textile & surface designer" />
        </motion.div>
      </div>
    </header>
  )
}
