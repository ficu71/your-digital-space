import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const Route = createFileRoute("/v3")({
  head: () => ({
    meta: [
      { title: "f1cu // network — v3" },
      {
        name: "description",
        content:
          "Interactive network graph of f1cu's capabilities — red team, iOS, automation, OSINT, tooling.",
      },
      { property: "og:title", content: "f1cu // network" },
      {
        property: "og:description",
        content: "Explore capabilities as an interactive SVG graph.",
      },
      { property: "og:url", content: "/v3" },
    ],
    links: [{ rel: "canonical", href: "/v3" }],
  }),
  component: NetworkPage,
});

type NodeDef = {
  id: string;
  label: string;
  tag: string;
  desc: string;
  angle: number; // radians
  r: number; // ring radius from center
};

const CENTER = { x: 500, y: 380 };

const NODES: NodeDef[] = [
  {
    id: "red",
    label: "Red Team",
    tag: "01",
    desc: "Objective-based adversary simulation. Initial access, lateral movement, exfil — mapped to MITRE ATT&CK with a detection handoff for your blue team.",
    angle: -Math.PI / 2,
    r: 240,
  },
  {
    id: "ios",
    label: "iOS Internals",
    tag: "02",
    desc: "Sandbox, entitlements, IPC and runtime research. Frida tooling, Ghidra, Hopper. Jailbreak-era exploit context applied to modern app security.",
    angle: -Math.PI / 2 + (2 * Math.PI) / 5,
    r: 240,
  },
  {
    id: "auto",
    label: "Automation",
    tag: "03",
    desc: "Custom tooling for teams that outgrew off-the-shelf scanners. Python + TypeScript, CI-integrated, LLM-assisted triage. Owned and handed over.",
    angle: -Math.PI / 2 + (4 * Math.PI) / 5,
    r: 240,
  },
  {
    id: "osint",
    label: "OSINT",
    tag: "04",
    desc: "External attack surface mapping. Recon platforms, credential exposure sweeps, and targeted intelligence for scoping engagements.",
    angle: -Math.PI / 2 + (6 * Math.PI) / 5,
    r: 240,
  },
  {
    id: "tooling",
    label: "Tooling",
    tag: "05",
    desc: "Internal platforms tuned to your stack. FastAPI services, Playwright agents, custom Burp extensions. Delivered with docs and tests.",
    angle: -Math.PI / 2 + (8 * Math.PI) / 5,
    r: 240,
  },
];

// Edges: center to every node, plus a few between adjacent nodes
const EDGES: [string, string][] = [
  ["core", "red"],
  ["core", "ios"],
  ["core", "auto"],
  ["core", "osint"],
  ["core", "tooling"],
  ["red", "osint"],
  ["ios", "auto"],
  ["auto", "tooling"],
];

function NetworkPage() {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const p: Record<string, { x: number; y: number }> = { core: { ...CENTER } };
    for (const n of NODES) {
      p[n.id] = {
        x: CENTER.x + Math.cos(n.angle) * n.r,
        y: CENTER.y + Math.sin(n.angle) * n.r,
      };
    }
    return p;
  });
  const [hovered, setHovered] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      const client = "touches" in e ? e.touches[0] : (e as MouseEvent);
      pt.x = client.clientX;
      pt.y = client.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const local = pt.matrixTransform(ctm.inverse());
      setPositions((prev) => ({ ...prev, [dragging]: { x: local.x, y: local.y } }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging]);

  const activeNode = NODES.find((n) => n.id === hovered) ?? null;

  const isEdgeActive = (a: string, b: string) =>
    hovered === a || hovered === b || (hovered === "core" && (a === "core" || b === "core"));

  return (
    <div
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #0f1a2e 0%, #060a14 60%, #030507 100%)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <VersionSwitcher active="v3" tone="neon" />

      {/* grid */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div
            className="grid h-8 w-8 place-items-center rounded-md text-xs font-bold text-black"
            style={{ background: "#22d3ee" }}
          >
            f1
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">f1cu.network</div>
            <div className="text-[10px] uppercase tracking-widest text-cyan-300/60">
              capability graph · v3
            </div>
          </div>
        </div>
        <a
          href="mailto:look@f1cu.space"
          className="rounded-full border border-cyan-400/40 px-4 py-1.5 text-xs font-medium text-cyan-100 transition-colors hover:bg-cyan-400/10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          look@f1cu.space
        </a>
      </header>

      {/* intro */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          The graph is the résumé.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-cyan-100/60 md:text-base">
          Hover a node to inspect a capability. Drag to rearrange. Everything f1cu
          does connects back to the same core: offense, done quietly.
        </p>
      </div>

      {/* SVG graph */}
      <div className="relative z-10 mx-auto mt-6 max-w-6xl px-4">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 760"
          className="w-full select-none"
          style={{ touchAction: "none" }}
        >
          <defs>
            <radialGradient id="coreGlow">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* core glow */}
          <circle cx={positions.core.x} cy={positions.core.y} r={140} fill="url(#coreGlow)" />

          {/* edges */}
          {EDGES.map(([a, b], i) => {
            const pa = positions[a];
            const pb = positions[b];
            const active = isEdgeActive(a, b);
            const len = Math.hypot(pb.x - pa.x, pb.y - pa.y);
            return (
              <g key={i}>
                <line
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke={active ? "#22d3ee" : "#22d3ee"}
                  strokeOpacity={active ? 0.9 : 0.2}
                  strokeWidth={active ? 1.5 : 0.8}
                  strokeDasharray="4 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={len}
                    to="0"
                    dur={`${6 + (i % 3)}s`}
                    repeatCount="indefinite"
                  />
                </line>
              </g>
            );
          })}

          {/* core node */}
          <g
            style={{ cursor: dragging === "core" ? "grabbing" : "grab" }}
            onMouseDown={() => setDragging("core")}
            onTouchStart={() => setDragging("core")}
            onMouseEnter={() => setHovered("core")}
            onMouseLeave={() => setHovered(null)}
          >
            <circle
              cx={positions.core.x}
              cy={positions.core.y}
              r={44}
              fill="#0a0f1a"
              stroke="#22d3ee"
              strokeWidth={2}
              filter="url(#glow)"
            />
            <text
              x={positions.core.x}
              y={positions.core.y + 5}
              textAnchor="middle"
              fill="#22d3ee"
              fontSize="18"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              f1cu
            </text>
          </g>

          {/* capability nodes */}
          {NODES.map((n) => {
            const p = positions[n.id];
            const active = hovered === n.id;
            return (
              <g
                key={n.id}
                style={{ cursor: dragging === n.id ? "grabbing" : "grab" }}
                onMouseDown={() => setDragging(n.id)}
                onTouchStart={() => setDragging(n.id)}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 38 : 32}
                  fill={active ? "#22d3ee" : "#0a0f1a"}
                  stroke="#22d3ee"
                  strokeWidth={active ? 2.5 : 1.5}
                  style={{ transition: "r 0.2s, fill 0.2s" }}
                  filter={active ? "url(#glow)" : undefined}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fill={active ? "#0a0f1a" : "#22d3ee"}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {n.tag}
                </text>
                <text
                  x={p.x}
                  y={p.y + 58}
                  textAnchor="middle"
                  fill="#e0f7ff"
                  fontSize="13"
                  fontWeight="500"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* detail panel */}
      <div className="relative z-10 mx-auto mt-4 max-w-2xl px-6 pb-16">
        <div
          className="rounded-2xl border border-cyan-400/30 bg-black/40 p-6 backdrop-blur transition-opacity"
          style={{ minHeight: 140 }}
        >
          {activeNode ? (
            <>
              <div
                className="text-[10px] uppercase tracking-widest text-cyan-300/70"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                node · {activeNode.tag}
              </div>
              <div className="mt-1 text-xl font-semibold text-white">{activeNode.label}</div>
              <p className="mt-3 text-sm leading-relaxed text-cyan-100/70">{activeNode.desc}</p>
            </>
          ) : (
            <div className="text-sm text-cyan-100/50">
              Hover a node. Drag to rearrange. Click the core for the operator profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
