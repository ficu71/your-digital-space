import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import Home from "@/features/v6/Home";
import "@/features/v6/v6.css";

export const Route = createFileRoute("/v6")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "f1cu // holo mesh — v6" },
      {
        name: "description",
        content:
          "Interactive 3D holo-mesh control room. Explore f1cu's profile, capabilities, active systems, and secure contact channels.",
      },
      { property: "og:title", content: "f1cu // holo mesh" },
      {
        property: "og:description",
        content:
          "Interactive 3D holo-mesh. Inspect the operator profile, capability matrix, active systems, and contact channels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/v6" },
    ],
    links: [{ rel: "canonical", href: "/v6" }],
  }),
  component: V6Page,
});

function V6Page() {
  return (
    <div className="v6-scope">
      <VersionSwitcher active="v6" />
      <ClientOnly
        fallback={
          <div className="stage flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/60">
            synchronizing holomesh...
          </div>
        }
      >
        <Home />
      </ClientOnly>
    </div>
  );
}
