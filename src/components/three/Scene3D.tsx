import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Group, Points } from 'three'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const GOLD: [number, number, number] = [0.886, 0.749, 0.431]
const PORCELAIN: [number, number, number] = [0.498, 0.659, 0.788]
const INDIGO = '#3e5c9a'

function rng(i: number) { return (Math.sin(i * 127.1) * 43758.5453) % 1 }

/** Deep, slowly drifting particle field that parallaxes with page scroll. */
function DepthField({ count, animate }: { count: number; animate: boolean }) {
  const ref = useRef<Points>(null)
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = rng(i) * 28 - 14
      positions[i * 3 + 1] = rng(i + 99) * 34 - 17
      positions[i * 3 + 2] = rng(i + 7) * 14 - 10
      const c = i % 3 === 0 ? PORCELAIN : GOLD
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2]
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    const node = ref.current
    if (!node) return
    const scroll = typeof window !== 'undefined'
      ? window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      : 0
    if (animate) {
      const t = state.clock.elapsedTime
      node.rotation.y = t * 0.02 + state.pointer.x * 0.15
      node.rotation.x = state.pointer.y * 0.1
    }
    // Parallax: the whole field rises as you scroll down  depth on every section.
    node.position.y = scroll * 18
    node.position.z = -2 + scroll * 4
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={2} />
    </points>
  )
}

/** A few large soft floating shapes for real volumetric depth behind the page. */
function FloatingForms({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const scroll = typeof window !== 'undefined'
      ? window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      : 0
    // Different shapes orbit through the viewport as you scroll.
    group.current.position.y = scroll * 26
    group.current.rotation.y = state.clock.elapsedTime * 0.05
  })
  return (
    <group ref={group}>
      <Float speed={animate ? 1 : 0} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-7, 4, -6]}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial color={INDIGO} roughness={0.4} metalness={0.6} transparent opacity={0.22} wireframe />
        </mesh>
      </Float>
      <Float speed={animate ? 0.8 : 0} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[8, -10, -7]}>
          <torusGeometry args={[2, 0.5, 16, 60]} />
          <meshStandardMaterial color="#c8a96e" roughness={0.3} metalness={0.8} transparent opacity={0.18} wireframe />
        </mesh>
      </Float>
      <Float speed={animate ? 1.2 : 0} rotationIntensity={0.7} floatIntensity={1.4}>
        <mesh position={[6, -24, -5]}>
          <dodecahedronGeometry args={[1.8, 0]} />
          <meshStandardMaterial color="#7fa8c9" roughness={0.35} metalness={0.7} transparent opacity={0.2} wireframe />
        </mesh>
      </Float>
      <Float speed={animate ? 0.9 : 0} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-8, -34, -6]}>
          <icosahedronGeometry args={[2.2, 0]} />
          <meshStandardMaterial color="#c8a96e" roughness={0.3} metalness={0.8} transparent opacity={0.16} wireframe />
        </mesh>
      </Float>
    </group>
  )
}

/** Fixed, full-viewport 3D scene that lives behind ALL page content. */
export function Scene3D({ reducedMotion }: { reducedMotion: boolean }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const count = isMobile ? 120 : 320
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 55 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.8]} style={{ pointerEvents: 'none' }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 6, 6]} color="#e3bf7a" intensity={2} decay={0} />
      <pointLight position={[-6, -4, 4]} color={INDIGO} intensity={1.6} decay={0} />
      <DepthField count={count} animate={!reducedMotion} />
      <FloatingForms animate={!reducedMotion} />
    </Canvas>
  )
}
