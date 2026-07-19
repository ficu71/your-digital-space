// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Lovable deploys with Nitro, while GitHub Pages needs TanStack's static output.
  nitro: process.env.GITHUB_PAGES === "true" ? false : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // GitHub Pages only serves static files. The 3D routes (/v4, /v6, ...) render
    // client-side inside <ClientOnly>, so we skip prerender crawling and only
    // emit HTML for the root route.
    prerender: {
      enabled: true,
      crawlLinks: false,
      failOnError: false,
      routes: ["/"],
    },
  },
});
