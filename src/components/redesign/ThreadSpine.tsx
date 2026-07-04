import { motion, useReducedMotion, useScroll } from 'framer-motion'

/**
 * The Loom's warp. A single malachite thread meanders down the full page and
 * draws itself as you scroll (SVG pathLength linked to document scroll via
 * framer-motion — no GSAP, so it never fights Lenis for the RAF loop). Reduced
 * motion shows the thread already fully woven. Decorative, non-interactive.
 */
export function ThreadSpine() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-3 z-[40] h-full w-8 md:left-6 md:w-10"
      viewBox="0 0 40 1000"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* faint full warp so the thread reads as pre-strung cloth */}
      <path
        d="M20,0 C36,120 4,240 20,360 C36,480 4,600 20,720 C36,840 4,960 20,1000"
        stroke="var(--r-malachite)"
        strokeOpacity="0.12"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {/* the drawn thread, revealed by scroll */}
      <motion.path
        d="M20,0 C36,120 4,240 20,360 C36,480 4,600 20,720 C36,840 4,960 20,1000"
        stroke="var(--r-malachite)"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: reduce ? 1 : scrollYProgress }}
      />
    </svg>
  )
}
