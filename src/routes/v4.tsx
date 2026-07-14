import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { ClientOnly } from "@/components/ClientOnly";

export const Route = createFileRoute("/v4")({
  head: () => ({
    meta: [
      { title: "f1cu // holo control room — v4" },
      {
        name: "description",
        content:
          "Interactive 3D holographic control room. Orbit the scene and click panels to explore f1cu's work.",
      },
      { property: "og:title", content: "f1cu // holo control room" },
      { property: "og:description", content: "Drag to orbit. Click panels to open. WebGL portfolio." },
      { property: "og:url", content: "/v4" },
    ],
    links: [{ rel: "canonical", href: "/v4" }],
  }),
  component: V4Page,
});

type Panel = {
  id: string;
  title: string;
  color: string;
  body: string[];
  position: [number, number, number];
};

const PANELS: Panel[] = [
  {
    id: "about",
    title: "// about",
    color: "#22d3ee",
    body: [
      "f1cu — independent offensive security engineer.",
      "gouda, NL. 8+ years on the tools.",
      "red team ops, iOS internals, security automation.",
    ],
    position: [0, 0.6, -3.4],
  },
  {
    id: "skills",
    title: "// skills",
    color: "#a78bfa",
    body: [
      "offensive: burp, cobalt strike, sliver, bloodhound",
      "ios: frida, ghidra, hopper, objection",
      "automation: python, ts, fastapi, playwright",
      "cloud: aws, gcp, terraform, cloudflare",
    ],
    position: [3.2, 0.4, -1.2],
  },
  {
    id: "projects",
    title: "// projects",
    color: "#f472b6",
    body: [
      "bunq API research — prompt injection + SEPA flows",
      "EU fintech red team — 2025 [classified]",
      "iOS runtime hardening — 2025 [classified]",
      "recon platform — python + fastapi + llm",
      "ci security gates — ts + playwright + semgrep",
    ],
    position: [-3.2, 0.4, -1.2],
  },
  {
    id: "contact",
    title: "// contact",
    color: "#34d399",
    body: [
      "email  : look@f1cu.space",
      "github : github.com/ficu71",
      "signal : on request",
      "nda    : signed same day",
    ],
    position: [0, -1.4, -2.6],
  },
];

function GridFloor() {
  return (
    <gridHelper
      args={[40, 40, "#164e63", "#0e2a33"]}
      position={[0, -2.2, 0]}
    />
  );
}

function HoloPanel({
  panel,
  active,
  onSelect,
}: {
  panel: Panel;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const targetScale = active ? 1.25 : hover ? 1.1 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), Math.min(dt * 6, 1));
    ref.current.lookAt(0, ref.current.position.y, 5);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(panel.id);
  };

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
      <group
        ref={ref}
        position={panel.position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
        onClick={handleClick}
      >
        {/* glow backplate */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[2.3, 1.5]} />
          <meshBasicMaterial color={panel.color} transparent opacity={hover || active ? 0.18 : 0.09} />
        </mesh>
        {/* frame */}
        <mesh>
          <planeGeometry args={[2.1, 1.35]} />
          <meshStandardMaterial
            color="#050a14"
            emissive={panel.color}
            emissiveIntensity={hover || active ? 0.35 : 0.18}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.1, 1.35)]} />
          <lineBasicMaterial color={panel.color} />
        </lineSegments>

        <Html
          transform
          distanceFactor={2.2}
          position={[0, 0, 0.01]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              width: 360,
              padding: "18px 22px",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              color: "#e2f2ff",
              textShadow: `0 0 8px ${panel.color}`,
            }}
          >
            <div style={{ color: panel.color, fontSize: 14, letterSpacing: 2, marginBottom: 10 }}>
              {panel.title}
            </div>
            {panel.body.map((l, i) => (
              <div key={i} style={{ fontSize: 12, lineHeight: 1.7, opacity: active ? 1 : 0.85 }}>
                {l}
              </div>
            ))}
            {!active && (
              <div style={{ marginTop: 12, fontSize: 10, color: panel.color, opacity: 0.7 }}>
                › click to focus
              </div>
            )}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function CenterCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.3;
    ref.current.rotation.y += dt * 0.4;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.6}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#22d3ee" distance={8} />
    </group>
  );
}

function Scene({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) {
  return (
    <>
      <color attach="background" args={["#03060d"]} />
      <fog attach="fog" args={["#03060d", 6, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={0.6} />
      <Stars radius={40} depth={30} count={2000} factor={3} fade speed={0.6} />
      <GridFloor />
      <CenterCore />
      {PANELS.map((p) => (
        <HoloPanel key={p.id} panel={p} active={activeId === p.id} onSelect={setActiveId} />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3.4}
        autoRotate={activeId === null}
        autoRotateSpeed={0.6}
      />
    </>
  );
}

function V4Page() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = PANELS.find((p) => p.id === activeId);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03060d] text-slate-100">
      <VersionSwitcher active="v4" />

      {/* Header */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/80">
        <div>f1cu.holo.mesh</div>
        <div className="mt-1 text-[10px] text-slate-500">
          drag · scroll · click panels
        </div>
      </div>

      {/* HUD status */}
      <div className="pointer-events-none absolute right-6 top-6 z-20 font-mono text-[11px] text-cyan-300/70">
        <div>status: <span className="text-emerald-400">online</span></div>
        <div>nodes : {PANELS.length}</div>
        <div>focus : {active ? active.id : "—"}</div>
      </div>

      {/* Bottom detail panel when active */}
      {active && (
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-cyan-500/30 bg-black/70 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-start justify-between gap-6 font-mono">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ color: active.color }}
              >
                node // {active.id}
              </div>
              <div className="mt-2 space-y-1 text-sm text-slate-200">
                {active.body.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="shrink-0 border border-cyan-500/40 px-3 py-1 text-[11px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-500/10"
            >
              close
            </button>
          </div>
        </div>
      )}

      <ClientOnly
        fallback={
          <div className="flex h-screen items-center justify-center font-mono text-cyan-300/60">
            booting holomesh...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.2, 6.5], fov: 55 }}
          className="!h-screen !w-screen"
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene activeId={activeId} setActiveId={setActiveId} />
          </Suspense>
        </Canvas>
      </ClientOnly>
    </div>
  );
}
