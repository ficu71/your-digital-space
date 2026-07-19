import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { NODES } from '../data/content'
import { useMeshStore } from '../state/store'

const CORE_POS = new THREE.Vector3(0, 1.62, 0)

export default function Links() {
  const lines = useRef<any[]>([])
  const pulses = useRef<(THREE.Mesh | null)[]>([])
  const focused = useMeshStore((s) => s.focused)

  const curves = useMemo(
    () =>
      NODES.map((n) => {
        const end = new THREE.Vector3(...n.position)
        const mid = CORE_POS.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.7, 0))
        return new THREE.QuadraticBezierCurve3(CORE_POS, mid, end)
      }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    curves.forEach((c, i) => {
      const m = pulses.current[i]
      if (m) {
        m.position.copy(c.getPoint((t * 0.22 + i * 0.31) % 1))
        const s = 1 + Math.sin(t * 6 + i) * 0.3
        m.scale.setScalar(s)
      }
      const line = lines.current[i]
      if (line?.material) {
        line.material.dashOffset -= delta * 0.35
      }
    })
  })

  return (
    <group>
      {NODES.map((n, i) => {
        const active = focused === n.id
        return (
          <group key={n.id}>
            <Line
              ref={(el) => {
                lines.current[i] = el
              }}
              points={curves[i].getPoints(40)}
              color={n.color}
              transparent
              opacity={active ? 0.85 : 0.28}
              lineWidth={active ? 1.8 : 1}
              dashed
              dashSize={0.22}
              gapSize={0.14}
            />
            <mesh
              ref={(el) => {
                pulses.current[i] = el
              }}
            >
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color={n.color} transparent opacity={active ? 1 : 0.75} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
