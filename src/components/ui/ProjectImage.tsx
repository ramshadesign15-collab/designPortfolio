import { useState } from 'react'
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
  className?: string
  frameClassName?: string
  priority?: boolean
}

/**
 * Displays a project image with a soft load-fade. Default 'contain' renders the
 * image at its natural ratio so nothing is ever cropped. Pass `aspect` to force
 * a uniform tile size. The images are the content, so they sit flat — no tilt.
 */
export function ProjectImage({ src, alt, fit = 'contain', aspect, className, frameClassName, priority = false }: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
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
    </div>
  )
}
