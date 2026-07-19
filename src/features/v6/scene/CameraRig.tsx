import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { NODES } from '../data/content'
import { useMeshStore } from '../state/store'

const HOME_POS = new THREE.Vector3(0, 3.2, 10.8)
const HOME_POS_COMPACT = new THREE.Vector3(0, 4.2, 15.5)
const HOME_TGT = new THREE.Vector3(0, 1.7, 0)

export default function CameraRig() {
  const controls = useRef<any>(null)
  const focused = useMeshStore((s) => s.focused)
  const compact = useMeshStore((s) => s.compact)
  const desired = useRef({ pos: HOME_POS.clone(), tgt: HOME_TGT.clone() })
  const animating = useRef(false)

  useEffect(() => {
    if (focused !== null) {
      const node = NODES.find((n) => n.id === focused)!
      const p = new THREE.Vector3(...node.position)
      const dir = new THREE.Vector3(Math.sin(node.rotationY), 0.3, Math.cos(node.rotationY)).normalize()
      const dist = compact ? 7.8 : 5.9
      desired.current = {
        pos: p.clone().add(dir.multiplyScalar(dist)).add(new THREE.Vector3(0, 0.4, 0)),
        tgt: p.clone(),
      }
    } else {
      desired.current = {
        pos: (compact ? HOME_POS_COMPACT : HOME_POS).clone(),
        tgt: HOME_TGT.clone(),
      }
    }
    animating.current = true
  }, [focused, compact])

  useFrame((state, delta) => {
    const c = controls.current
    if (!c) return
    if (animating.current) {
      const k = 1 - Math.pow(0.0001, delta)
      state.camera.position.lerp(desired.current.pos, k)
      c.target.lerp(desired.current.tgt, k)
      c.update()
      if (
        state.camera.position.distanceTo(desired.current.pos) < 0.04 &&
        c.target.distanceTo(desired.current.tgt) < 0.04
      ) {
        animating.current = false
      }
    }
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enabled={focused === null}
      enableDamping
      dampingFactor={0.06}
      autoRotate={focused === null}
      autoRotateSpeed={0.55}
      enablePan={false}
      minDistance={5}
      maxDistance={17}
      minPolarAngle={0.85}
      maxPolarAngle={1.48}
      minAzimuthAngle={-1.9}
      maxAzimuthAngle={1.9}
    />
  )
}
