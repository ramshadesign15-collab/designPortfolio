import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'
import type { ParticleData } from './PigmentReveal'

// Heavy (three.js) — imported lazily by PigmentReveal only on desktop + motion,
// so touch/reduced-motion visitors never download the WebGL chunk.

const VERT = /* glsl */ `
  uniform float uProgress;
  uniform float uSize;
  uniform float uTime;
  attribute vec3 aTarget;
  attribute vec3 aColor;
  varying vec3 vColor;
  float easeInOut(float t){ return t < 0.5 ? 2.0*t*t : 1.0 - pow(-2.0*t + 2.0, 2.0) / 2.0; }
  void main() {
    vColor = aColor;
    float e = easeInOut(clamp(uProgress, 0.0, 1.0));
    vec3 pos = mix(position, aTarget, e);
    pos.z += sin(uTime * 0.6 + position.x * 1.6) * 0.25 * (1.0 - e);
    pos.x += cos(uTime * 0.5 + position.y * 1.4) * 0.18 * (1.0 - e);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (9.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`
const FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.32, d);
    gl_FragColor = vec4(vColor, alpha);
  }
`

function Cloud({ data, progress }: { data: ParticleData; progress: MotionValue<number> }) {
  const ref = useRef<THREE.Points>(null)
  const { geo, mat } = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(data.positions, 3))
    g.setAttribute('aTarget', new THREE.BufferAttribute(data.targets, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(data.colors, 3))
    const m = new THREE.ShaderMaterial({
      uniforms: { uProgress: { value: 0 }, uSize: { value: 3.0 }, uTime: { value: 0 } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
    })
    return { geo: g, mat: m }
  }, [data])

  useEffect(() => () => { geo.dispose(); mat.dispose() }, [geo, mat])

  useFrame((state) => {
    const p = progress.get()
    mat.uniforms.uProgress.value = p
    mat.uniforms.uTime.value = state.clock.elapsedTime
    if (ref.current) ref.current.rotation.y = (1 - p) * 0.35 + state.pointer.x * 0.12
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

export function PigmentCanvas({ data, progress }: { data: ParticleData; progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: 'none' }}>
        <Cloud data={data} progress={progress} />
      </Canvas>
    </div>
  )
}
