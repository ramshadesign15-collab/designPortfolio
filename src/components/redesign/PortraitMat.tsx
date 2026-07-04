import { useRef, type MouseEvent } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * A matted portrait that tilts a few degrees toward the pointer — a physical
 * card on a mat, not a floating image. Pointer-only (disabled for touch and for
 * reduced-motion). Square corners keep the archival/gallery register.
 */
export function PortraitMat({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - (r.top + r.height / 2)) / r.height) * -3
    const ry = ((e.clientX - (r.left + r.width / 2)) / r.width) * 3
    el.style.transform = `perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(1600px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div className="[perspective:1600px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="w-fit border p-3 [transform-style:preserve-3d] will-change-transform md:p-4"
        style={{
          borderColor: 'var(--r-hairline-paper)',
          background: 'var(--r-paper-2)',
          boxShadow: '0 2px 8px -2px rgba(0,0,0,0.4), 0 30px 60px -20px rgba(0,0,0,0.55)',
          transition: 'transform 500ms var(--ease-settle)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="block h-auto w-full max-w-[420px]"
          style={{ filter: 'saturate(0.92) contrast(1.03)' }}
        />
      </div>
    </div>
  )
}
