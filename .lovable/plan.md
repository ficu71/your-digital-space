## Co myślę

Solidna robota — to jest znacznie lepsze niż obecne `/v4` (proste holo panele) i `/v5` (neural sphere). Konkretnie:

- **4 holo-panele w 3D** z `<Html transform>` (prawdziwy tekst w scenie, nie sprity) — czytelne i klikalne
- **Rdzeń** z wireframe icosahedron + 3 orbitami + pulsującym inner mesh
- **Bezier-linki** rdzeń→panele z animowanymi pulse-kulami i dashOffset
- **CameraRig** z auto-rotacją w stanie idle i płynnym lerp do wybranego węzła, blokada OrbitControls przy focusie
- **HUD**: Boot sequence, Header, Navigator (klawisze 1–4), Telemetry, Hint, DetailOverlay z blokami (text/kv/stats/feature/chips/project/actions/ticks)
- **Postprocessing**: Bloom + Scanline + Noise + Vignette + Sparkles + Grid + Fog — spójny cyber-holo look
- Treść (`content.ts`) już dopasowana pod Ciebie: Gouda NL, jebie_w_denko, apple-kombajn, bunq, CVE stats

Minusy do ogarnięcia przy porcie:
- Projekt zakłada Tailwind v3 + osobne `index.css`, my mamy Tailwind v4 (`@theme` w `styles.css`) — trzeba przenieść tylko klasy niebędące pluginowe, resztę do naszej konwencji
- Używa React Router (`pages/Home.tsx`) — u nas TanStack Start, więc opakowujemy w `createFileRoute` + `<ClientOnly>` (r3f = tylko klient)
- Deps: `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, `zustand` — do dodania (postprocessing i zustand na razie nie ma)

## Plan portu (nowa trasa `/v6`, `/v4` i `/v5` bez zmian)

### Nowe pliki

```text
src/routes/v6.tsx                  # createFileRoute + head() + ClientOnly<Home>
src/features/v6/Home.tsx           # port pages/Home.tsx
src/features/v6/state/store.ts     # zustand store (focused, booted, compact, toggle, select, setCompact)
src/features/v6/data/content.ts    # NODES + typy (1:1 z zipa, z Twoim contentem)
src/features/v6/scene/Experience.tsx
src/features/v6/scene/Core.tsx
src/features/v6/scene/HoloPanel.tsx
src/features/v6/scene/Links.tsx
src/features/v6/scene/CameraRig.tsx
src/features/v6/hud/Boot.tsx
src/features/v6/hud/Header.tsx
src/features/v6/hud/Navigator.tsx
src/features/v6/hud/Telemetry.tsx
src/features/v6/hud/Hint.tsx
src/features/v6/hud/DetailOverlay.tsx
src/features/v6/v6.css             # style HUD/holo (klasy .holo-panel, .hp-*, .ov-*, .core-label, .stage)
```

### Zmiany istniejące

- `src/routes/v6.tsx` importuje `v6.css` (scoped-side-effect import)
- `src/components/VersionSwitcher.tsx` — dopisać `v6` do listy linków (v1..v6)
- `package.json` — `bun add @react-three/postprocessing zustand` (fiber/drei/three już są od /v4-/v5)

### Detale techniczne

- Cała scena zapakowana w `<ClientOnly>` — r3f + WebGL nie może iść przez SSR (nasz prerender by się wysypał). `/v6` będzie miał minimalny placeholder w SSR, hydracja klienta doładowuje scenę.
- `head()` unikalne: title "f1cu // holo mesh", opis o interaktywnej wizytówce 3D, `og:title/og:description/twitter:card`. Bez `og:image` (brak sensownego cover).
- Tailwind v4 nie ma pluginu `tailwindcss-animate` z zipa — nie potrzebne, style z `index.css` (holo-panel, boot, overlay) portujemy jako czysty CSS do `v6.css`.
- Klawisze `1–4` przełączają panele, `Esc` zamyka — jak w oryginale.
- Compact mode (mobile ≤768px) przesuwa kamerę dalej i zmniejsza panele — bez zmian względem oryginału.
- WebGL context-lost handler z Experience zostaje (auto-reload po 800ms).

### Poza zakresem

- `/v4` i `/v5` zostają nietknięte
- Nie ruszam `/`, `/v2`, `/v3`, `__root.tsx` (poza ewentualnym niczym)
- Bez backendu, bez Cloud

Jak dam radę pchnąć — powiedz "buduj" i lecę.
