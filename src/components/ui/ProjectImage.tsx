import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ProjectImageProps {
  src: string
  alt: string
  /** Tailwind aspect-ratio class (e.g. 'aspect-[3/4]'). When set, every tile
   *  takes this exact ratio so a grid of mixed-size images stays uniform; the
   *  image is letterboxed with object-contain so nothing is ever cropped. */
  aspect?: string
  tilt?: number
  priority?: boolean
  /** No card frame: transparent cut-outs float on the page with a soft shadow. */
  bare?: boolean
}

/**
 * Displays a project image with a soft load-fade and a subtle scroll-driven
 * 3D rotateY tilt. Renders the FULL image (no crop) on a matted frame at its
 * natural ratio. Pass `aspect` to force a uniform tile size.
 */
export function ProjectImage({ src, alt, aspect, tilt = 5, priority = false, bare = false }: ProjectImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // style-bound motion values bypass MotionConfig, so honour reduced motion here
  const t = useReducedMotion() ? 0 : tilt
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [t, 0, -t])

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        style={{ rotateY, transformStyle: 'preserve-3d' }}
        className={cn('relative', !bare && 'overflow-hidden rounded-lg border border-border-subtle bg-elevated/50 p-2 md:p-3', aspect)}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={cn(
            'w-full rounded-md object-contain transition-opacity duration-700',
            aspect ? 'h-full' : 'h-auto',
            bare && 'rounded-none drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      </motion.div>
    </div>
  )
}
