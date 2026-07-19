import { Link } from "@tanstack/react-router";

const versions = [
  { to: "/", label: "v1" },
  { to: "/v4", label: "v4" },
  { to: "/v6", label: "v6" },
  { to: "/v7", label: "v7" },
] as const;

export function VersionSwitcher({ active }: { active: "v1" | "v4" | "v6" | "v7" }) {
  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 font-mono text-xs text-white/70 backdrop-blur">
      {versions.map((v) => {
        const isActive = v.label === active;
        return (
          <Link
            key={v.label}
            to={v.to}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              isActive ? "bg-white text-black" : "hover:text-white"
            }`}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
