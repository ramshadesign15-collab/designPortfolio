import { useEffect, useState } from 'react'

/** True once the browser is idle after first paint. Used to keep heavy,
 *  decorative chunks (three.js) off the critical path of the hero/LCP. */
export function useIdle(): boolean {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setIdle(true), { timeout: 2500 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(() => setIdle(true), 1200) // Safari has no requestIdleCallback
    return () => clearTimeout(id)
  }, [])
  return idle
}
