import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import V7 from "@/features/v7/V7";
import "@/features/v7/v7.css";

export const Route = createFileRoute("/v7")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "f1cu // liquid chrome cathedral — v7" },
      {
        name: "description",
        content:
          "A shader-first, scroll-driven experience. Ray-marched chrome, holo mesh, live telemetry — f1cu's red team, iOS research and AI agent work.",
      },
      { property: "og:title", content: "f1cu // liquid chrome cathedral" },
      {
        property: "og:description",
        content:
          "Ray-marched shader, scroll-linked 3D scene, live telemetry. f1cu — red team · iOS research · AI agents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#05050a" },
    ],
  }),
  component: V7Page,
});

function V7Page() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-black" />}>
      <V7 />
    </ClientOnly>
  );
}
