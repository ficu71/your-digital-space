import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { CONTENT } from "./content";

function Core() {
  const ref = useRef<THREE.Mesh>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.22;
    }
    if (inner.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.05;
      inner.current.scale.setScalar(s);
    }
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial wireframe color="#c4a8ff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#8be9ff" transparent opacity={0.35} wireframe />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#a78bfa" distance={6} />
    </group>
  );
}

function Node({ angle, label }: { angle: number; label: string }) {
  const r = 3.2;
  const x = Math.cos(angle) * r;
  const z = Math.sin(angle) * r;
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.position.y = Math.sin(t * 0.7 + angle) * 0.25;
  });
  const points = useMemo(() => {
    // bezier core→node
    const a = new THREE.Vector3(0, 0, 0);
    const b = new THREE.Vector3(x, 0, z);
    const mid = new THREE.Vector3(x * 0.5, 1.2, z * 0.5);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    return curve.getPoints(24);
  }, [x, z]);

  return (
    <group>
      <Line points={points} color="#a78bfa" lineWidth={1} transparent opacity={0.4} />
      <group ref={ref} position={[x, 0, z]}>
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
          <mesh>
            <octahedronGeometry args={[0.36, 0]} />
            <meshBasicMaterial wireframe color="#8be9ff" />
          </mesh>
          <mesh scale={0.18}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </Float>
      </group>
      {/* label sprite handled via HTML overlay in V7 to avoid drei/html suspense issues */}
      <SpriteLabel position={[x, 0.75, z]} text={label} />
    </group>
  );
}

function SpriteLabel({ position, text }: { position: [number, number, number]; text: string }) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = "600 44px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(199, 210, 254, 0.95)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, c.width / 2, c.height / 2);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }, [text]);
  return (
    <sprite position={position} scale={[1.6, 0.4, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.4;
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    return arr;
  }, [count]);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.03 + mouse.x * 0.2;
    ref.current.rotation.x = mouse.y * 0.1;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#dcd6ff" transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  useFrame(({ camera, mouse }) => {
    const p = progress.current;
    // orbit: 0 far, ~0.3 close hero, ~0.6 around back, ~1 pulled out
    const angle = p * Math.PI * 1.5;
    const dist = 6.5 - Math.sin(p * Math.PI) * 1.5;
    const tx = Math.cos(angle) * dist + mouse.x * 0.4;
    const tz = Math.sin(angle) * dist + mouse.y * 0.2;
    const ty = 0.6 - p * 0.4 + mouse.y * 0.3;
    camera.position.lerp(new THREE.Vector3(tx, ty, tz), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HoloScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      className="v7-scene"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.6, 6.5], fov: 55 }}
    >
      <Suspense fallback={null}>
        <Rig progress={progressRef} />
        <Core />
        {CONTENT.work.map((w) => (
          <Node key={w.id} angle={w.angle} label={w.title} />
        ))}
        <Particles />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0015, 0.0015)} radialModulation={false} modulationOffset={0} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.2} darkness={0.75} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
