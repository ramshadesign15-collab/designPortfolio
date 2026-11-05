import { useMediaQuery } from '@/hooks/useMediaQuery'

/** Reactive `prefers-reduced-motion`: read on first render (no animation flash), updates if the OS setting changes. */
export const useReducedMotion = (): boolean => useMediaQuery('(prefers-reduced-motion: reduce)')
