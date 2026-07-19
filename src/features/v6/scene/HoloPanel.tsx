import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { MeshNode } from '../data/content'
import { useMeshStore } from '../state/store'

export default function HoloPanel({ node, index }: { node: MeshNode; index: number }) {
  const group = useRef<THREE.Group>(null)
  const focused = useMeshStore((s) => s.focused)
  const toggle = useMeshStore((s) => s.toggle)
  const compact = useMeshStore((s) => s.compact)
  const isFocused = focused === node.id
  const dimmed = focused !== null && !isFocused

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.position.y = node.position[1] + Math.sin(t * 0.55 + index * 1.9) * 0.09
    }
  })

  return (
    <group ref={group} position={node.position} rotation={[0, node.rotationY, 0]}>
      <Html
        transform
        distanceFactor={compact ? 3.6 : 2.6}
        zIndexRange={[30, 0]}
        style={{
          opacity: dimmed ? 0.18 : 1,
          transition: 'opacity 0.45s ease',
        }}
      >
        <div
          className={`holo-panel ${isFocused ? 'holo-active' : ''}`}
          style={
            {
              '--c': node.color,
              '--cd': node.colorDim,
              width: compact ? 235 : 315,
            } as React.CSSProperties
          }
          onClick={() => toggle(node.id)}
        >
          <div className="hp-head">
            <span>
              0{node.id} <span className="hp-dim">//</span> {node.category}
            </span>
            <span className="hp-status">
              <i /> online
            </span>
          </div>
          <div className="hp-title">{node.label}</div>
          <div className="hp-viz">
            {Array.from({ length: 18 }).map((_, i) => (
              <b key={i} style={{ animationDelay: `${(i * 0.13 + index * 0.4) % 1.1}s` }} />
            ))}
          </div>
          <div className="hp-desc">{node.short}</div>
          <div className="hp-cta">{isFocused ? 'release node ⌄' : 'select node ↗'}</div>
          <span className="hp-corner tl" />
          <span className="hp-corner br" />
        </div>
      </Html>
    </group>
  )
}
