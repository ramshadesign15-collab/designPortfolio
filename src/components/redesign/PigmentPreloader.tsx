import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const SEEN_KEY = 'r_pigment_intro'
// pigment palette — the Mah-e-Noor pigments + malachite + bone
const COLORS = ['#c8a96e', '#3e5c9a', '#7fa8c9', '#4fa37d', '#e9e8e2', '#8b6f4a']

/**
 * First-load unveil, in pigment. Coloured pigment dust scatters, then swarms
 * into "Ramsha Ansari" before the cloth wipes upward to reveal the site — raw
 * pigment settling into identity, from which the page is then woven. Pure 2D
 * canvas (no three.js on first paint), once per session, skipped for reduced
 * motion, scroll locked while it plays.
 */
export function PigmentPreloader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    if (reduce || typeof window === 'undefined') return false
    return !sessionStorage.getItem(SEEN_KEY)
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    const canvas = canvasRef.current
    let raf = 0
    let timer = 0

    const run = () => {
      if (!canvas) return
      const W = canvas.clientWidth
      const H = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)

      // sample the name's pixels as target points
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d')
      if (!octx) return
      const fontSize = Math.min(W * 0.135, 146)
      octx.fillStyle = '#fff'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.font = `${fontSize}px 'Young Serif', Georgia, serif`
      octx.fillText('Ramsha', W / 2, H / 2 - fontSize * 0.56)
      octx.fillText('Ansari', W / 2, H / 2 + fontSize * 0.56)
      const px = octx.getImageData(0, 0, W, H).data
      const targets: Array<{ x: number; y: number }> = []
      for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (px[(y * W + x) * 4 + 3] > 128) targets.push({ x, y })
      if (targets.length === 0) return

      const N = Math.min(targets.length, 4800)
      const parts = Array.from({ length: N }, (_, i) => {
        const t = targets[Math.floor((i / N) * targets.length)]
        return { x: Math.random() * W, y: Math.random() * H, tx: t.x, ty: t.y, c: COLORS[i % COLORS.length], sz: Math.random() * 1.0 + 0.7, d: Math.random() * 0.22 }
      })

      const DUR = 1400
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
      const start = performance.now()
      const loop = (now: number) => {
        const p = Math.min((now - start) / DUR, 1)
        ctx.clearRect(0, 0, W, H)
        for (const pt of parts) {
          const e = ease(Math.max(0, Math.min(1, (p - pt.d) / (1 - pt.d))))
          const cx = pt.x + (pt.tx - pt.x) * e
          const cy = pt.y + (pt.ty - pt.y) * e
          ctx.globalAlpha = 0.35 + 0.65 * e
          ctx.fillStyle = pt.c
          ctx.beginPath()
          ctx.arc(cx, cy, pt.sz, 0, Math.PI * 2)
          ctx.fill()
        }
        if (p < 1) raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    // let the webfont land so the name samples in Young Serif, but never block long
    const fontsReady = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready
    Promise.race([fontsReady ?? Promise.resolve(), new Promise((r) => setTimeout(r, 400))]).then(run)

    timer = window.setTimeout(() => {
      setShow(false)
      try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* private mode */ }
      document.body.style.overflow = ''
    }, 2450)

    return () => { cancelAnimationFrame(raf); clearTimeout(timer); document.body.style.overflow = '' }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pigment-preloader"
          className="fixed inset-0 z-[400]"
          style={{ background: 'var(--r-ground)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        >
          <canvas ref={canvasRef} className="h-full w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
