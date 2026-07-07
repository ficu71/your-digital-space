import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { ClientOnly } from "@/components/ClientOnly";

export const Route = createFileRoute("/v5")({
  head: () => ({
    meta: [
      { title: "f1cu // neural sphere — v5" },
      {
        name: "description",
        content:
          "Interactive 3D neural sphere of f1cu's capabilities. Rotate the sphere and click nodes to inspect.",
      },
      { property: "og:title", content: "f1cu // neural sphere" },
      {
        property: "og:description",
        content: "Drag to rotate. Click a node to inspect. WebGL portfolio.",
      },
      { property: "og:url", content: "/v5" },
    ],
    links: [{ rel: "canonical", href: "/v5" }],
  }),
  component: V5Page,
});

type Node = {
  id: string;
  label: string;
  desc: string;
  color: string;
  pos: THREE.Vector3;
};

const RAW_NODES: Omit<Node, "pos">[] = [
  { id: "red-team", label: "red team", color: "#ff2e88", desc: "objective-based adversary simulation, MITRE ATT&CK mapped, custom implants." },
  { id: "ios", label: "iOS internals", color: "#00f0ff", desc: "static + dynamic analysis, frida hooking, entitlements, jailed runtime research." },
  { id: "automation", label: "automation", color: "#a78bfa", desc: "python / typescript tooling, ci-integrated, yours to keep after the engagement." },
  { id: "osint", label: "osint", color: "#facc15", desc: "attack surface mapping, exposure discovery, dark web monitoring." },
  { id: "cloud", label: "cloud", color: "#34d399", desc: "aws / gcp misconfig, iam abuse, terraform review, cloudflare edge hardening." },
  { id: "web", label: "web app", color: "#fb923c", desc: "burp pro, auth flow abuse, business-logic bugs, api pentesting." },
  { id: "tooling", label: "tooling", color: "#f472b6", desc: "internal recon platform, ci security gates, llm-assisted triage." },
  { id: "training", label: "training", color: "#60a5fa", desc: "workshops for eng teams: threat modelling, secure sdlc, red vs blue drills." },
];

// distribute on sphere using golden angle
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return pts;
}

function NodeMesh({
  node,
  active,
  onSelect,
}: {
  node: Node;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const s = active ? 1.6 : hover ? 1.3 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), Math.min(dt * 8, 1));
  });
  return (
    <group position={node.pos}>
      <mesh
        ref={ref}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
      >
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hover || active ? 1.4 : 0.6}
          toneMapped={false}
        />
      </mesh>
      {(hover || active) && (
        <Html
          center
          distanceFactor={8}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              padding: "4px 10px",
              background: "rgba(3,6,13,0.85)",
              border: `1px solid ${node.color}`,
              borderRadius: 2,
              color: node.color,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: 1,
              whiteSpace: "nowrap",
              transform: "translateY(-24px)",
              textShadow: `0 0 6px ${node.color}`,
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Connections({ nodes }: { nodes: Node[] }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < 2.6) {
          positions.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
          positions.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
        }
      }
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#22d3ee" transparent opacity={0.28} />
    </lineSegments>
  );
}

function Sphere({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) {
  const nodes: Node[] = useMemo(() => {
    const positions = fibonacciSphere(RAW_NODES.length, 2.1);
    return RAW_NODES.map((n, i) => ({ ...n, pos: positions[i] }));
  }, []);

  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    if (activeId === null) group.current.rotation.y += dt * 0.15;
  });

  return (
    <group ref={group}>
      {/* wireframe hull */}
      <mesh>
        <icosahedronGeometry args={[2.1, 2]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.35} />
      </mesh>
      <Connections nodes={nodes} />
      {nodes.map((n) => (
        <NodeMesh key={n.id} node={n} active={activeId === n.id} onSelect={setActiveId} />
      ))}
      {/* inner core */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ff2e88"
          emissive="#ff2e88"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
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
      <color attach="background" args={["#05010f"]} />
      <fog attach="fog" args={["#05010f", 6, 16]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff2e88" />
      <pointLight position={[-5, -5, -5]} intensity={1.2} color="#00f0ff" />
      <Sphere activeId={activeId} setActiveId={setActiveId} />
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={9}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

function V5Page() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = RAW_NODES.find((n) => n.id === activeId);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05010f] text-slate-100">
      <VersionSwitcher active="v5" />

      {/* Title */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 font-mono">
        <div className="text-[11px] uppercase tracking-[0.4em] text-fuchsia-400/80">
          f1cu.neural.sphere
        </div>
        <div className="mt-1 text-[10px] text-slate-500">
          drag · scroll · click a node
        </div>
      </div>

      {/* Legend */}
      <div className="pointer-events-none absolute right-6 top-6 z-20 space-y-1 font-mono text-[11px] text-slate-400">
        {RAW_NODES.map((n) => (
          <div key={n.id} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }}
            />
            <span style={{ color: activeId === n.id ? n.color : undefined }}>{n.label}</span>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div
          className="absolute bottom-6 left-1/2 z-20 w-[min(560px,calc(100vw-3rem))] -translate-x-1/2 border bg-black/70 p-5 font-mono backdrop-blur"
          style={{ borderColor: active.color, boxShadow: `0 0 40px ${active.color}55` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ color: active.color }}
              >
                node // {active.id}
              </div>
              <div className="mt-1 text-lg text-slate-100">{active.label}</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{active.desc}</p>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="shrink-0 border px-3 py-1 text-[11px] uppercase tracking-widest transition hover:bg-white/5"
              style={{ borderColor: active.color, color: active.color }}
            >
              close
            </button>
          </div>
        </div>
      )}

      <ClientOnly
        fallback={
          <div className="flex h-screen items-center justify-center font-mono text-fuchsia-400/60">
            spinning up neural sphere...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 55 }}
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
