import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const SEEN_KEY = 'r_loom_seen'

/**
 * First-load unveil. A single thread draws down and her name settles, then the
 * cloth wipes upward to reveal the site — the warp being set before weaving.
 * Plays once per session; skipped entirely under reduced motion.
 */
export function Preloader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    if (reduce) return false
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem(SEEN_KEY)
  })

  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* private mode */ }
      document.body.style.overflow = ''
    }, 1500)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[400] flex items-center justify-center"
          style={{ background: 'var(--r-ground)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <svg width="2" height="120" viewBox="0 0 2 120" fill="none">
              <motion.path
                d="M1,0 L1,120"
                stroke="var(--r-malachite)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-display-r)', color: 'var(--r-bone)', fontSize: '1.7rem', letterSpacing: '0.01em' }}
            >
              Ramsha Ansari
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
