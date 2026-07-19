import { Canvas } from '@react-three/fiber'
import { Grid, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Scanline, Noise, Vignette } from '@react-three/postprocessing'
import { NODES } from '../data/content'
import Core from './Core'
import HoloPanel from './HoloPanel'
import Links from './Links'
import CameraRig from './CameraRig'

export default function Experience() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 3.2, 10.8], fov: 46, near: 0.1, far: 140 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          setTimeout(() => window.location.reload(), 800)
        })
      }}
    >
      <color attach="background" args={['#020409']} />
      <fog attach="fog" args={['#020409', 15, 36]} />

      <CameraRig />

      {/* floor grid */}
      <Grid
        position={[0, -0.6, 0]}
        args={[70, 70]}
        cellSize={0.55}
        cellThickness={0.6}
        cellColor="#0b1526"
        sectionSize={2.75}
        sectionThickness={1.1}
        sectionColor="#11404e"
        fadeDistance={32}
        fadeStrength={1.4}
        infiniteGrid
      />

      {/* ambient particles */}
      <Sparkles count={130} scale={[26, 13, 26]} position={[0, 4.5, 0]} size={1.7} speed={0.25} color="#67e8f9" opacity={0.5} />
      <Sparkles count={70} scale={[30, 16, 30]} position={[0, 5, 0]} size={2.6} speed={0.12} color="#e2e8f0" opacity={0.22} />

      <Core />
      <Links />
      {NODES.map((n, i) => (
        <HoloPanel key={n.id} node={n} index={i} />
      ))}

      <EffectComposer>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.12} luminanceSmoothing={0.28} />
        <Scanline density={1.35} opacity={0.09} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} darkness={0.72} offset={0.22} />
      </EffectComposer>
    </Canvas>
  )
}
