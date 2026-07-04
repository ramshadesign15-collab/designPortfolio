import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const PATH = 'M20,0 C36,120 4,240 20,360 C36,480 4,600 20,720 C36,840 4,960 20,1000'

/** A knot the thread ties as it crosses the warp's centre line at a section seam. */
function StitchKnot({ frac, scroll, reduce }: { frac: number; scroll: MotionValue<number>; reduce: boolean | null }) {
  const opacity = useTransform(scroll, [frac - 0.05, frac - 0.01], [0, 1])
  const scale = useTransform(scroll, [frac - 0.05, frac], [0.3, 1])
  return (
    <motion.span
      className="absolute left-1/2 block h-2 w-2"
      style={{ top: `${frac * 100}%`, x: '-50%', y: '-50%', rotate: 45, background: 'var(--r-malachite)', opacity: reduce ? 1 : opacity, scale: reduce ? 1 : scale }}
    />
  )
}

/** The finished knot + tassel where the cloth ends. */
function FooterKnot({ scroll, reduce }: { scroll: MotionValue<number>; reduce: boolean | null }) {
  const opacity = useTransform(scroll, [0.9, 0.99], [0, 1])
  return (
    <motion.span className="absolute bottom-8 left-1/2 flex flex-col items-center" style={{ x: '-50%', opacity: reduce ? 1 : opacity }}>
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--r-malachite)' }} />
      <span className="mt-1 flex items-start gap-[3px]">
        <span className="h-3 w-px" style={{ background: 'var(--r-malachite)' }} />
        <span className="h-4 w-px" style={{ background: 'var(--r-malachite)' }} />
        <span className="h-3 w-px" style={{ background: 'var(--r-malachite)' }} />
      </span>
    </motion.span>
  )
}

/**
 * The Loom's warp. A single malachite thread meanders down the full page and
 * draws itself as you scroll (SVG pathLength via framer-motion, riding the
 * existing Lenis — no GSAP, so it never fights for the RAF loop). It ties a
 * stitch-knot where it crosses the centre line, and finishes in a knot + tassel.
 * Reduced motion shows the whole thing already woven. Decorative, non-interactive.
 */
export function ThreadSpine() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-3 z-[40] w-8 md:left-6 md:w-10">
      <svg className="h-full w-full" viewBox="0 0 40 1000" preserveAspectRatio="none" fill="none">
        {/* faint full warp so the thread reads as pre-strung cloth */}
        <path d={PATH} stroke="var(--r-malachite)" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {/* the drawn thread, revealed by scroll */}
        <motion.path
          d={PATH}
          stroke="var(--r-malachite)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : scrollYProgress }}
        />
      </svg>

      {/* the thread crosses the warp centre at these page fractions (see PATH) */}
      <StitchKnot frac={0.36} scroll={scrollYProgress} reduce={reduce} />
      <StitchKnot frac={0.72} scroll={scrollYProgress} reduce={reduce} />
      <FooterKnot scroll={scrollYProgress} reduce={reduce} />
    </div>
  )
}
