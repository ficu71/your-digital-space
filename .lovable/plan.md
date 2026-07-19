# /v7 — Liquid Chrome Cathedral

Jedno-stronicowe doświadczenie na `/v7`, które łączy najnowsze API z lipca 2026 (View Transitions Level 2, scroll-driven animations, CSS `@property`, container queries, `text-wrap: balance`, `color-mix()`, oklch, anchor positioning) z ciężką warstwą WebGL/WGSL: ray-marched shader tła, GPGPU particle field reagujący na kursor i mikrofon, sceną 3D z bezier-linkami do węzłów projektów, i post-processingiem (bloom + chromatic aberration + film grain).

Nie dotykam obecnej `/` ani wersji v1–v6 — dodaję tylko dyskretny CTA "enter the lab →" w hero na `/` prowadzący do `/v7`, plus wpis w `VersionSwitcher`.

## Kierunek wizualny — "zaskocz mnie"

Ciemna, monolityczna scena. Tło = pełnoekranowy fragment shader (ray-marched SDF chromowej cieczy z refrakcją i kaustykami), na nim lewituje wektorowa struktura wireframe — katedra z węzłami. Akcenty: fiolet `oklch(0.62 0.24 296)` + cyjan `oklch(0.85 0.18 210)`, tekst w Fraunces (display) + JetBrains Mono. Wszystko dark, ale ciepłe — nie hakerskie neony, tylko "post-human luxury".

Sensoryczny metaforę: *dotknięcie chromowej powierzchni, która pamięta twój palec*.

## Struktura strony (jeden długi scroll, kamera synchronizowana)

```text
[00] BOOT           full-screen shader, boot log fade-in, F1CU logo morph
[01] HERO           manifest ("break the limits, unleash the truth"), CTA
[02] CAPABILITIES   3 świecące panele: red team / iOS research / AI agents
[03] SELECTED WORK  scena 3D: kombajn, bizon, jebie_w_denko + CVE stats
[04] TELEMETRY      UTC clock, uptime, ostatnie logi, availability bar
[05] CONTACT        look@f1cu.space, GitHub, Signal — jedno wielkie CTA
[06] SIGN-OFF       "handcrafted in warsaw" + wersja + hash commita
```

Scroll steruje `progress` (0→1) przekazywanym do shadera i kamery Three.js (lerp między pozycjami per-sekcja). Każda sekcja ma własny wpis w `IntersectionObserver`, który wyzwala mikro-animacje treści (fade+translate) przez `animation-timeline: view()`.

## Techniczne serce (skondensowane)

- **Trasa**: `src/routes/v7.tsx`, `ssr: false` (WebGL/WGSL nie działa w prerenderze), `head()` z własnym title/og.
- **Warstwy renderu** (fixed, absolute-positioned, `pointer-events` selektywnie):
  1. `<ShaderBackground/>` — pełnoekranowy `<canvas>` z WebGL2 fragment shaderem (ray-march SDF, noise-driven surface, chromatic dispersion). Fallback: statyczny gradient + `backdrop-filter: blur` gdy `!navigator.gpu && !WebGL2RenderingContext`.
  2. `<HoloScene/>` — React Three Fiber Canvas: wireframe icosahedron core, bezier-links do 4 node meshy (per sekcja), auto-rotacja w idle, lerp kamery per-scroll. Postprocessing: Bloom + ChromaticAberration + Noise + Vignette (`@react-three/postprocessing` — już zainstalowane pod v6).
  3. `<ParticleField/>` — GPGPU compute w WGSL (jeśli `navigator.gpu`), fallback do instanced mesh w Three. 8k cząstek reagujących na pozycję kursora (repulsion) i głośność mikrofonu jeśli user zezwoli (opt-in button, nie prompt).
  4. `<ContentLayer/>` — HTML na wierzchu, mix-blend-mode: `screen` w wybranych miejscach, `text-wrap: balance`, container queries, anchor positioning dla tooltipów.
- **Nowe CSS (lipiec 2026)**:
  - `animation-timeline: scroll()` i `view()` dla progress-barów i reveal — bez JS.
  - `@property --hue` do animowanego oklch gradientu na hero.
  - `view-transition-name` na CTA → `/` fallback (View Transitions Level 2 cross-document).
  - `interpolate-size: allow-keywords` dla płynnego rozwijania paneli capabilities.
  - `field-sizing: content` na jednym easter-egg inpucie.
- **Interakcja**:
  - Pointer parallax na hero (magnetic hover na CTA przez `anchor-name`).
  - Klawisze `1–5` skaczą do sekcji (View Transition).
  - `prefers-reduced-motion`: shader zamraża się na klatce, particle field wyłączony, kamera statyczna. To nie opcja — twardy wymóg.
- **Dostępność / perf**:
  - `pointer-events: none` na wszystkich canvas oprócz interaktywnych warstw.
  - DPR cap = 1.5, `powerPreference: "high-performance"`, RAF-guard przy `document.hidden`.
  - Fallback pipeline gdy brak WebGL2 → statyczna wersja HTML+CSS (nadal ładna, oparta o `color-mix` i scroll-driven anim).

## Treść (co powie strona)

- **Hero manifest**: "*breaks the limits, unleashes the truth.* red team · ios research · ai agents. based in warsaw. english/polish."
- **Capabilities**: 3 karty (Red team engagements → assumed-breach + physical, iOS Research → RE i CVE, AI Agents → offensive automation + guardrail bypass research).
- **Selected work / CVE**: 4 węzły w scenie 3D, klik = overlay z opisem: kombajn (apple ecosystem RE), bizon (iOS runtime), jebie_w_denko (guardrail probing), CVE stats (licznik "N reported / M accepted", jeśli podasz liczby — inaczej placeholder "under NDA").
- **Live telemetry**: UTC clock (co sekundę), uptime od `Date.now() - mountedAt`, rotujące logi z bufora, availability bar ("open for Q4 2026").
- **Contact**: `look@f1cu.space` jako duży, magnetic-hover CTA otwierający `mailto:` z gotowym briefem. Poniżej: GitHub `ficu71`, Signal handle (placeholder), keybase (opcjonalnie).
- **Sign-off**: "handcrafted in warsaw · v7.0.0 · build $HASH · press ? for shortcuts".

## Struktura plików

```text
src/routes/v7.tsx                     # trasa, ssr:false, head()
src/features/v7/
  V7.tsx                              # composition root
  scene/HoloScene.tsx                 # R3F canvas + kamera rig
  scene/nodes/*.tsx                   # node meshy per projekt
  shaders/background.frag             # ray-march SDF
  shaders/background.vert
  shaders/particles.wgsl              # GPGPU compute (fallback: TS)
  hooks/useScrollProgress.ts          # scroll-linked value
  hooks/useReducedMotion.ts
  ui/Hero.tsx, Capabilities.tsx, Work.tsx, Telemetry.tsx, Contact.tsx
  ui/CommandPalette.tsx               # ?  → skróty
  content.ts                          # dane sekcji
  v7.css                              # @scope .v7-scope, animation-timeline, @property
```

## Wpięcie w istniejący projekt

- `src/components/VersionSwitcher.tsx` → dopisuję `v7` do listy.
- `src/routes/index.tsx` → jedna nowa, subtelna linia w hero: `<Link to="/v7">enter the lab →</Link>` z `view-transition-name`.
- `vite.config.ts` → już mamy `prerender.routes: ["/"]` i `crawlLinks: false`, więc `/v7` nie prerenderuje się. Route sam ma `ssr: false` jako pas bezpieczeństwa.
- Brak nowych zależności — `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `zustand` już są od v6. WGSL kompilowany runtime.

## Ryzyka i decyzje

- **WebGPU w sandboxie**: `navigator.gpu` bywa `undefined`; kod od razu wykrywa i schodzi do WebGL2/Three fallbacku (bez pustej sceny).
- **Waga bundla**: R3F+drei+postprocessing = ~2.6 MB gz (już w projekcie od v6). Trasa jest lazy — nie wpływa na `/`.
- **Motion sickness**: `prefers-reduced-motion` twardo wyłącza kamera-lerp, particle field i chromatic aberration.
- **SSR**: `ssr:false` + prerender ograniczony do `/` = zero szans na crash builda na `/v7`.

## Kolejność implementacji

1. Route + `V7.tsx` shell + `ssr:false`, statyczna wersja treści (żeby SEO/OG działało nawet bez JS).
2. `ShaderBackground` (WebGL2 fragment), `useScrollProgress`.
3. `HoloScene` (R3F) + kamera rig + 4 node meshy + bezier links + postprocessing.
4. `ParticleField` (WebGPU→WebGL fallback), interakcja z kursorem.
5. Warstwa UI (hero → capabilities → work → telemetry → contact) z scroll-driven CSS.
6. Command palette (`?`), skróty `1–5`, magnetic CTA (anchor positioning).
7. Reduced-motion, DPR cap, RAF-guard, fallback bez WebGL.
8. CTA "enter the lab →" na `/` + wpis w VersionSwitcher.
