import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Points } from 'three'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const GOLD: [number, number, number] = [0.886, 0.749, 0.431]
const PORCELAIN: [number, number, number] = [0.498, 0.659, 0.788]

function Bokeh({ count, animate }: { count: number; animate: boolean }) {
  const ref = useRef<Points>(null)

  const { positions, colors, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random (no Math.random in build env constraints elsewhere; here is fine at runtime).
      positions[i * 3] = (Math.sin(i * 12.9898) * 43758.5453 % 1) * 16 - 8
      positions[i * 3 + 1] = (Math.sin(i * 78.233) * 43758.5453 % 1) * 10 - 5
      positions[i * 3 + 2] = (Math.sin(i * 37.719) * 43758.5453 % 1) * 6 - 4
      const c = i % 3 === 0 ? PORCELAIN : GOLD
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2]
      seeds[i] = (Math.sin(i * 5.123) * 43758.5453 % 1)
    }
    return { positions, colors, seeds }
  }, [count])

  useFrame((state) => {
    const node = ref.current
    if (!node || !animate) return
    const t = state.clock.elapsedTime
    const pos = node.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const base = positions[i * 3 + 1]
      pos.array[i * 3 + 1] = base + Math.sin(t * 0.3 + seeds[i] * 6.28) * 0.5
    }
    pos.needsUpdate = true
    node.rotation.y = Math.sin(t * 0.05) * 0.1
    // gentle mouse parallax
    node.position.x += (state.pointer.x * 0.6 - node.position.x) * 0.03
    node.position.y += (state.pointer.y * 0.4 - node.position.y) * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={2 /* AdditiveBlending */} />
    </points>
  )
}

export function CinematicLayer({ reducedMotion }: { reducedMotion: boolean }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const count = isMobile ? 90 : 200
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
      <Bokeh count={count} animate={!reducedMotion} />
    </Canvas>
  )
}
