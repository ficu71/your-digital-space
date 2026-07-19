import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Core() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (outer.current) {
      outer.current.rotation.y = t * 0.22
      outer.current.rotation.x = Math.sin(t * 0.14) * 0.4
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.4
      inner.current.rotation.z = t * 0.13
      const s = 1 + Math.sin(t * 1.9) * 0.07
      inner.current.scale.setScalar(s)
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.35
    if (ring2.current) ring2.current.rotation.z = -t * 0.22
    if (ring3.current) ring3.current.rotation.z = t * 0.12
  })

  return (
    <group position={[0, 1.62, 0]}>
      {/* outer wireframe lattice */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.85} />
      </mesh>
      {/* inner core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#0d9488" transparent opacity={0.5} />
      </mesh>
      {/* orbit rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2.15, 0.2, 0]}>
        <torusGeometry args={[1.55, 0.008, 8, 96]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.75, -0.5, 0.4]}>
        <torusGeometry args={[1.85, 0.006, 8, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 2.6, 0.9, -0.3]}>
        <torusGeometry args={[2.15, 0.004, 8, 96]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.28} />
      </mesh>
      {/* core label */}
      <Html center position={[0, -1.45, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
        <div className="core-label">core // synchronized</div>
      </Html>
    </group>
  )
}
