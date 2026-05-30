import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProjectImageProps {
  src: string
  alt: string
  /** 'contain' shows the FULL image (no crop) on a matted frame; 'cover' fills. */
  fit?: 'cover' | 'contain'
  /** Tailwind aspect-ratio class (e.g. 'aspect-[3/4]'). When set, every tile
   *  takes this exact ratio so a grid of mixed-size images stays uniform; the
   *  image is letterboxed with object-contain so nothing is ever cropped. */
  aspect?: string
  tilt?: number
  className?: string
  frameClassName?: string
  priority?: boolean
}

/**
 * Displays a project image with a soft load-fade and a subtle scroll-driven
 * 3D rotateY tilt. Default 'contain' renders the image at its natural ratio so
 * nothing is ever cropped. Pass `aspect` to force a uniform tile size.
 */
export function ProjectImage({ src, alt, fit = 'contain', aspect, tilt = 5, className, frameClassName, priority = false }: ProjectImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [tilt, 0, -tilt])

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        style={{ rotateY, transformStyle: 'preserve-3d' }}
        className={cn(
          'relative overflow-hidden rounded-lg border border-border-subtle bg-elevated/50',
          fit === 'contain' ? 'p-2 md:p-3' : '',
          aspect,
          frameClassName,
          className,
        )}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            'transition-opacity duration-700',
            aspect
              ? 'h-full w-full rounded-md object-contain'
              : fit === 'contain'
                ? 'h-auto w-full rounded-md object-contain'
                : 'h-full w-full object-cover',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      </motion.div>
    </div>
  )
}
