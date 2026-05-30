import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import { useMediaQuery } from '@/hooks/useMediaQuery'
const GOLD = '#e3bf7a', INDIGO = '#3e5c9a', PORCELAIN = '#7fa8c9'
function Orb({ detail, animate }: { detail: number; animate: boolean }) {
  const group = useRef<Group>(null), halo = useRef<Mesh>(null), lattice = useRef<Mesh>(null)
  useFrame((state) => {
    const node = group.current
    if (!node) return
    const t = state.clock.elapsedTime
    if (animate) {
      node.rotation.y += 0.0025
      node.rotation.x = Math.sin(t * 0.2) * 0.15
      if (halo.current) halo.current.rotation.z = Math.sin(t * 0.15) * 0.1
      if (lattice.current) { lattice.current.rotation.y += 0.001; lattice.current.rotation.x -= 0.0008 }
    }
    node.position.x += (state.pointer.x * 0.6 - node.position.x) * 0.04
    node.position.y += (state.pointer.y * 0.6 - node.position.y) * 0.04
  })
  return (
    <group ref={group}>
      <mesh><icosahedronGeometry args={[2.1, detail]} /><MeshDistortMaterial color={GOLD} distort={0.45} speed={1.6} roughness={0.18} metalness={0.85} emissive={GOLD} emissiveIntensity={0.18} /></mesh>
      <mesh ref={halo} scale={1.18}><icosahedronGeometry args={[2.1, detail]} /><MeshDistortMaterial color={INDIGO} distort={0.55} speed={1.1} roughness={0.4} metalness={0.7} transparent opacity={0.32} /></mesh>
      <mesh ref={lattice} scale={1.36}><icosahedronGeometry args={[2.1, 4]} /><meshBasicMaterial color={PORCELAIN} wireframe transparent opacity={0.18} /></mesh>
    </group>
  )
}
export function HeroOrb({ reducedMotion }: { reducedMotion: boolean }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const detail = useMemo(() => (isMobile ? 6 : 16), [isMobile])
  return (
    <Canvas camera={{ position: [0, 0, 7.2], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 4]} color={GOLD} intensity={3.2} decay={0} />
      <pointLight position={[-4, -1, 2]} color={INDIGO} intensity={2.4} decay={0} />
      <pointLight position={[0, 4, -2]} color={PORCELAIN} intensity={1.4} decay={0} />
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={reducedMotion ? 0 : 0.35} floatIntensity={reducedMotion ? 0 : 0.9}>
        <Orb detail={detail} animate={!reducedMotion} />
      </Float>
      {!reducedMotion && <Sparkles count={isMobile ? 40 : 80} scale={[8, 6, 6]} size={2.2} speed={0.35} color={GOLD} opacity={0.7} />}
    </Canvas>
  )
}
