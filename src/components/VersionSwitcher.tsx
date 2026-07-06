import { Link } from "@tanstack/react-router";

const versions = [
  { to: "/", label: "v1" },
  { to: "/v2", label: "v2" },
  { to: "/v3", label: "v3" },
  { to: "/v4", label: "v4" },
  { to: "/v5", label: "v5" },
] as const;

export function VersionSwitcher({
  active,
  tone = "dark",
}: {
  active: "v1" | "v2" | "v3" | "v4" | "v5";
  tone?: "dark" | "light" | "neon" | "terminal";
}) {
  const palette = {
    dark: {
      wrap: "bg-black/60 border-white/15 text-white/70 backdrop-blur",
      active: "bg-white text-black",
      hover: "hover:text-white",
    },
    light: {
      wrap: "bg-white/70 border-black/15 text-black/60 backdrop-blur",
      active: "bg-black text-white",
      hover: "hover:text-black",
    },
    neon: {
      wrap: "bg-black/50 border-cyan-400/40 text-cyan-100/70 backdrop-blur",
      active: "bg-cyan-400 text-black",
      hover: "hover:text-cyan-200",
    },
    terminal: {
      wrap: "bg-black/80 border-green-500/40 text-green-500/70",
      active: "bg-green-500 text-black",
      hover: "hover:text-green-300",
    },
  }[tone];

  return (
    <div
      className={`fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-xs ${palette.wrap}`}
    >
      {versions.map((v) => {
        const isActive = v.label === active;
        return (
          <Link
            key={v.label}
            to={v.to}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              isActive ? palette.active : palette.hover
            }`}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
