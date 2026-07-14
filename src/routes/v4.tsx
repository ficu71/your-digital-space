import { createFileRoute } from "@tanstack/react-router";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars } from "@react-three/drei";
import { ArrowUpRight, Crosshair, Radio, X } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ClientOnly } from "@/components/ClientOnly";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const Route = createFileRoute("/v4")({
  head: () => ({
    meta: [
      { title: "f1cu // holo control room — v4" },
      {
        name: "description",
        content:
          "An immersive 3D control room for f1cu's offensive security work, capabilities, projects, and secure contact channels.",
      },
      { property: "og:title", content: "f1cu // holo control room" },
      {
        property: "og:description",
        content:
          "Navigate the live holomesh. Inspect nodes, capabilities, projects, and contact channels.",
      },
      { property: "og:url", content: "/v4" },
    ],
    links: [{ rel: "canonical", href: "/v4" }],
  }),
  component: V4Page,
});

type PanelId = "about" | "skills" | "projects" | "contact";

type Panel = {
  id: PanelId;
  order: string;
  label: string;
  title: string;
  color: string;
  summary: string;
  body: string[];
  metrics: Array<{ label: string; value: string }>;
  position: [number, number, number];
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

const PANELS: Panel[] = [
  {
    id: "about",
    order: "01",
    label: "identity",
    title: "Operator profile",
    color: "#22d3ee",
    summary: "Independent offensive security engineering from Gouda, NL.",
    body: [
      "8+ years working across adversary simulation, mobile internals, and security automation.",
      "Direct operator access, compact engagement teams, documented handoff, zero consultancy overhead.",
      "Research-led delivery with production-grade tooling and reproducible findings.",
    ],
    metrics: [
      { label: "mode", value: "independent" },
      { label: "base", value: "NL / EU" },
      { label: "access", value: "direct" },
    ],
    position: [0, 1.15, -3.5],
  },
  {
    id: "skills",
    order: "02",
    label: "capabilities",
    title: "Capability matrix",
    color: "#a78bfa",
    summary: "Offensive depth across apps, identity, mobile, cloud, and automation.",
    body: [
      "Burp Suite, Cobalt Strike, Sliver, BloodHound, custom payload chains, and detection-aware operations.",
      "Frida, Ghidra, Hopper, iOS internals, Android runtime analysis, and mobile hardening.",
      "Python, TypeScript, FastAPI, Playwright, AWS, GCP, Terraform, and Cloudflare.",
    ],
    metrics: [
      { label: "domains", value: "05" },
      { label: "stack", value: "hybrid" },
      { label: "handoff", value: "owned" },
    ],
    position: [3.35, 0.35, -1.15],
    action: {
      label: "Inspect GitHub",
      href: "https://github.com/ficu71",
      external: true,
    },
  },
  {
    id: "projects",
    order: "03",
    label: "systems",
    title: "Active systems",
    color: "#f472b6",
    summary: "Research, red-team infrastructure, mobile tooling, and CI security.",
    body: [
      "bunq API research — AI-assisted flows, prompt injection behavior, and SEPA transaction logic.",
      "Jebie_w_denko — modular async red-team framework with exploit, post-exploitation, and reporting layers.",
      "iOS runtime hardening, recon platforms, and TypeScript security gates for delivery pipelines.",
    ],
    metrics: [
      { label: "state", value: "shipping" },
      { label: "focus", value: "R&D" },
      { label: "proof", value: "code" },
    ],
    position: [-3.35, 0.35, -1.15],
    action: {
      label: "Open repositories",
      href: "https://github.com/ficu71?tab=repositories",
      external: true,
    },
  },
  {
    id: "contact",
    order: "04",
    label: "uplink",
    title: "Secure channel",
    color: "#34d399",
    summary: "Fast scoping, NDA-ready communication, and direct operator access.",
    body: [
      "Email: look@f1cu.space",
      "Signal and encrypted communication available on request.",
      "Send the objective, target surface, constraints, and timeline to start scoping.",
    ],
    metrics: [
      { label: "response", value: "< 24h" },
      { label: "NDA", value: "ready" },
      { label: "channel", value: "secure" },
    ],
    position: [0, -1.4, -2.65],
    action: {
      label: "Open secure contact",
      href: "mailto:look@f1cu.space?subject=Security%20engagement%20inquiry",
    },
  },
];

const PANEL_KEYS: Record<string, PanelId> = {
  "1": "about",
  "2": "skills",
  "3": "projects",
  "4": "contact",
};

function useSystemClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function GridFloor({ reducedMotion }: { reducedMotion: boolean }) {
  const grid = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!grid.current || reducedMotion) return;
    grid.current.position.z = (clock.elapsedTime * 0.22) % 1;
  });

  return (
    <group ref={grid} position={[0, -2.2, 0]}>
      <gridHelper args={[42, 42, "#155e75", "#0c2b37"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[42, 42]} />
        <meshBasicMaterial color="#02060c" transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

function NetworkLinks({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<THREE.LineBasicMaterial>(null);
  const geometry = useMemo(() => {
    const origin = new THREE.Vector3(0, 0, 0);
    const points = PANELS.flatMap((panel) => [
      origin.clone(),
      new THREE.Vector3(...panel.position),
    ]);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.opacity = reducedMotion
      ? 0.24
      : 0.16 + Math.sin(clock.elapsedTime * 1.8) * 0.08;
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial ref={material} color="#22d3ee" transparent opacity={0.2} />
    </lineSegments>
  );
}

function CenterCore({ reducedMotion }: { reducedMotion: boolean }) {
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    if (core.current) {
      core.current.rotation.x += delta * 0.22;
      core.current.rotation.y += delta * 0.38;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.22;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.18;
    if (halo.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 1.7) * 0.08;
      halo.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={halo}>
        <sphereGeometry args={[0.86, 32, 32]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.055}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[0.78, 0.012, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.72} />
      </mesh>
      <mesh ref={ringB} rotation={[0.45, 0, Math.PI / 2]}>
        <torusGeometry args={[0.98, 0.008, 8, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.85}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#e0f2fe" wireframe transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2.6} color="#22d3ee" distance={9} />
      <Html
        center
        position={[0, -1.08, 0]}
        distanceFactor={5}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.35em] text-cyan-200/80">
          core // synchronized
        </div>
      </Html>
    </group>
  );
}

function HoloPanel({
  panel,
  active,
  reducedMotion,
  onSelect,
}: {
  panel: Panel;
  active: boolean;
  reducedMotion: boolean;
  onSelect: (id: PanelId) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const targetScale = active ? 1.18 : hovered ? 1.08 : 1;
    const damping = 1 - Math.exp(-delta * 7);
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), damping);
    group.current.lookAt(0, group.current.position.y * 0.45, 5);
    if (glow.current && !reducedMotion) {
      glow.current.opacity =
        (active ? 0.18 : hovered ? 0.13 : 0.07) +
        Math.sin(clock.elapsedTime * 2 + Number(panel.order)) * 0.018;
    }
  });

  const handleSelect = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(panel.id);
  };

  return (
    <Float
      speed={reducedMotion ? 0 : 1.15}
      rotationIntensity={reducedMotion ? 0 : 0.08}
      floatIntensity={reducedMotion ? 0 : 0.28}
    >
      <group
        ref={group}
        position={panel.position}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={handleSelect}
      >
        <mesh position={[0, 0, -0.075]}>
          <planeGeometry args={[2.55, 1.65]} />
          <meshBasicMaterial
            ref={glow}
            color={panel.color}
            transparent
            opacity={active ? 0.18 : 0.07}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[2.3, 1.45]} />
          <meshStandardMaterial
            color="#030812"
            emissive={panel.color}
            emissiveIntensity={active ? 0.32 : hovered ? 0.24 : 0.14}
            metalness={0.2}
            roughness={0.62}
            transparent
            opacity={0.9}
          />
        </mesh>
        <lineSegments position={[0, 0, 0.01]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.3, 1.45)]} />
          <lineBasicMaterial color={panel.color} transparent opacity={active ? 1 : 0.62} />
        </lineSegments>
        <mesh position={[-1.05, 0.62, 0.025]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color={panel.color} />
        </mesh>

        <Html
          transform
          distanceFactor={2.15}
          position={[0, 0, 0.035]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              width: 360,
              padding: "20px 24px",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              color: "#dff7ff",
              textShadow: `0 0 10px ${panel.color}55`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: panel.color,
                fontSize: 10,
                letterSpacing: 2.6,
                textTransform: "uppercase",
              }}
            >
              <span>
                {panel.order} // {panel.label}
              </span>
              <span style={{ opacity: 0.72 }}>{active ? "locked" : "online"}</span>
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: -0.3,
                color: "#f4fbff",
              }}
            >
              {panel.title}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                lineHeight: 1.55,
                color: "#a8c1ce",
              }}
            >
              {panel.summary}
            </div>
            <div
              style={{
                marginTop: 13,
                paddingTop: 9,
                borderTop: `1px solid ${panel.color}44`,
                color: panel.color,
                fontSize: 9,
                letterSpacing: 1.8,
                textTransform: "uppercase",
              }}
            >
              {active ? "focus acquired" : "select node"}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Scene({
  active,
  reducedMotion,
  onSelect,
}: {
  active?: Panel;
  reducedMotion: boolean;
  onSelect: (id: PanelId) => void;
}) {
  const focusTarget: [number, number, number] = active
    ? [active.position[0] * 0.15, active.position[1] * 0.18, -1.1]
    : [0, -0.1, -1.2];

  return (
    <>
      <color attach="background" args={["#02050b"]} />
      <fog attach="fog" args={["#02050b", 7, 20]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[5, 7, 5]} intensity={0.72} color="#dbeafe" />
      <Stars
        radius={42}
        depth={34}
        count={1800}
        factor={2.6}
        fade
        speed={reducedMotion ? 0 : 0.35}
      />
      <GridFloor reducedMotion={reducedMotion} />
      <NetworkLinks reducedMotion={reducedMotion} />
      <CenterCore reducedMotion={reducedMotion} />
      {PANELS.map((panel) => (
        <HoloPanel
          key={panel.id}
          panel={panel}
          active={active?.id === panel.id}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
        />
      ))}
      <OrbitControls
        enableDamping
        dampingFactor={0.055}
        enablePan={false}
        minDistance={4.2}
        maxDistance={9}
        maxPolarAngle={Math.PI / 1.68}
        minPolarAngle={Math.PI / 3.55}
        target={focusTarget}
        autoRotate={!reducedMotion && !active}
        autoRotateSpeed={0.38}
      />
    </>
  );
}

function HudFrame() {
  const corner = "absolute h-10 w-10 border-cyan-300/30 transition-colors duration-500";

  return (
    <div className="pointer-events-none absolute inset-3 z-10 sm:inset-5">
      <div className={`${corner} left-0 top-0 border-l border-t`} />
      <div className={`${corner} right-0 top-0 border-r border-t`} />
      <div className={`${corner} bottom-0 left-0 border-b border-l`} />
      <div className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

function NodeNavigator({
  activeId,
  onSelect,
}: {
  activeId: PanelId | null;
  onSelect: (id: PanelId) => void;
}) {
  return (
    <>
      <nav
        aria-label="Holomesh nodes"
        className="absolute bottom-6 left-6 z-30 hidden w-72 border border-cyan-400/20 bg-[#030812]/80 p-3 font-mono backdrop-blur-xl md:block"
      >
        <div className="mb-2 flex items-center justify-between px-2 py-1 text-[9px] uppercase tracking-[0.28em] text-cyan-200/45">
          <span>node navigator</span>
          <span>keys 1—4</span>
        </div>
        <div className="grid gap-1">
          {PANELS.map((panel) => {
            const selected = panel.id === activeId;
            return (
              <button
                key={panel.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(panel.id)}
                className="group flex items-center gap-3 border px-3 py-2.5 text-left transition"
                style={{
                  borderColor: selected ? `${panel.color}88` : "transparent",
                  background: selected ? `${panel.color}12` : "transparent",
                }}
              >
                <span
                  className="grid h-6 w-6 place-items-center border text-[9px]"
                  style={{ borderColor: `${panel.color}66`, color: panel.color }}
                >
                  {panel.order}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] uppercase tracking-[0.14em] text-slate-200">
                    {panel.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] uppercase tracking-[0.18em] text-slate-500">
                    {selected ? "focus locked" : panel.label}
                  </span>
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full opacity-60 transition group-hover:opacity-100"
                  style={{ backgroundColor: panel.color }}
                />
              </button>
            );
          })}
        </div>
      </nav>

      <nav
        aria-label="Holomesh mobile nodes"
        className="absolute inset-x-4 bottom-4 z-30 grid grid-cols-4 gap-1 border border-cyan-400/20 bg-[#030812]/88 p-1.5 font-mono backdrop-blur-xl md:hidden"
      >
        {PANELS.map((panel) => {
          const selected = panel.id === activeId;
          return (
            <button
              key={panel.id}
              type="button"
              aria-label={panel.title}
              aria-pressed={selected}
              onClick={() => onSelect(panel.id)}
              className="grid min-h-12 place-items-center border text-[9px] uppercase tracking-[0.12em] text-slate-400"
              style={{
                borderColor: selected ? `${panel.color}88` : "transparent",
                color: selected ? panel.color : undefined,
                background: selected ? `${panel.color}10` : "transparent",
              }}
            >
              <span>{panel.order}</span>
              <span className="max-w-full truncate">{panel.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

function DetailPanel({ panel, onClose }: { panel: Panel; onClose: () => void }) {
  return (
    <aside
      className="holo-panel-in absolute inset-x-4 bottom-20 z-40 max-h-[65vh] overflow-y-auto border bg-[#030812]/94 p-5 font-mono shadow-2xl backdrop-blur-2xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[430px] md:p-6"
      style={{
        borderColor: `${panel.color}66`,
        boxShadow: `0 0 60px ${panel.color}14, inset 0 0 40px ${panel.color}08`,
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="text-[9px] uppercase tracking-[0.34em]" style={{ color: panel.color }}>
            node {panel.order} // {panel.label}
          </div>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">{panel.title}</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{panel.summary}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close node details"
          className="grid h-8 w-8 shrink-0 place-items-center border border-cyan-300/25 text-cyan-100/60 transition hover:border-cyan-300/60 hover:text-cyan-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div
        className="mt-5 grid grid-cols-3 gap-px border"
        style={{ borderColor: `${panel.color}33` }}
      >
        {panel.metrics.map((metric) => (
          <div
            key={metric.label}
            className="min-w-0 px-3 py-2.5"
            style={{ backgroundColor: `${panel.color}08` }}
          >
            <div className="truncate text-[8px] uppercase tracking-[0.18em] text-slate-500">
              {metric.label}
            </div>
            <div className="mt-1 truncate text-[10px] uppercase" style={{ color: panel.color }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {panel.body.map((line) => (
          <div key={line} className="flex gap-3 text-[11px] leading-relaxed text-slate-300">
            <span className="mt-2 h-px w-4 shrink-0" style={{ backgroundColor: panel.color }} />
            <span>{line}</span>
          </div>
        ))}
      </div>

      {panel.action ? (
        <a
          href={panel.action.href}
          target={panel.action.external ? "_blank" : undefined}
          rel={panel.action.external ? "noreferrer" : undefined}
          className="mt-6 flex items-center justify-between border px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white/5"
          style={{ borderColor: `${panel.color}66`, color: panel.color }}
        >
          {panel.action.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </aside>
  );
}

function V4Page() {
  const [activeId, setActiveId] = useState<PanelId | null>(null);
  const active = PANELS.find((panel) => panel.id === activeId);
  const time = useSystemClock();
  const reducedMotion = useReducedMotion();

  const selectPanel = (id: PanelId) => {
    setActiveId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
        return;
      }
      const id = PANEL_KEYS[event.key];
      if (id) setActiveId(id);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050b] text-slate-100">
      <VersionSwitcher active="v4" />
      <HudFrame />

      <div className="holo-vignette pointer-events-none absolute inset-0 z-10" />
      <div className="holo-scanline pointer-events-none absolute inset-0 z-10 opacity-50" />

      <header className="pointer-events-none absolute left-6 top-6 z-20 font-mono sm:left-8 sm:top-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-cyan-200/90 sm:text-xs">
          <Radio className="h-3.5 w-3.5" />
          f1cu.holo.mesh
        </div>
        <div className="mt-2 text-[8px] uppercase tracking-[0.28em] text-slate-600 sm:text-[9px]">
          control room // revision 04
        </div>
      </header>

      <div className="pointer-events-none absolute left-1/2 top-7 z-20 hidden -translate-x-1/2 items-center gap-3 font-mono text-[8px] uppercase tracking-[0.3em] text-slate-500 lg:flex">
        <span className="h-px w-10 bg-cyan-400/25" />
        operational intelligence mesh
        <span className="h-px w-10 bg-cyan-400/25" />
      </div>

      <div className="pointer-events-none absolute right-6 top-16 z-20 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-100/45 sm:right-8">
        <div className="flex items-center justify-end gap-2">
          <span className="holo-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
          mesh online
        </div>
        <div className="mt-1 text-right">local {time}</div>
        <div className="mt-1 text-right">focus {active ? `// ${active.id}` : "// roaming"}</div>
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-600 xl:flex">
        <Crosshair className="h-3 w-3 text-cyan-400/45" />
        drag to orbit · scroll to zoom · 1—4 select · esc release
      </div>

      <NodeNavigator activeId={activeId} onSelect={selectPanel} />

      {active ? <DetailPanel panel={active} onClose={() => setActiveId(null)} /> : null}

      <ClientOnly
        fallback={
          <div className="flex h-screen items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/60">
            synchronizing holomesh...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.15, 6.8], fov: 54, near: 0.1, far: 60 }}
          className="!h-screen !w-screen"
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onPointerMissed={() => setActiveId(null)}
        >
          <Suspense fallback={null}>
            <Scene active={active} reducedMotion={reducedMotion} onSelect={selectPanel} />
          </Suspense>
        </Canvas>
      </ClientOnly>
    </div>
  );
}
