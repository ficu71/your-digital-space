import { useEffect } from "react";
import Experience from "./scene/Experience";
import Header from "./hud/Header";
import Navigator from "./hud/Navigator";
import Telemetry from "./hud/Telemetry";
import Hint from "./hud/Hint";
import Boot from "./hud/Boot";
import DetailOverlay from "./hud/DetailOverlay";
import { useMeshStore } from "./state/store";

export default function Home() {
  const booted = useMeshStore((s) => s.booted);
  const setCompact = useMeshStore((s) => s.setCompact);
  const toggle = useMeshStore((s) => s.toggle);
  const select = useMeshStore((s) => s.select);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4") toggle(Number(e.key));
      if (e.key === "Escape") select(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, select]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setCompact]);

  return (
    <div className="stage">
      <Experience />
      <Header />
      <Navigator />
      <Telemetry />
      <Hint />
      <DetailOverlay />
      {!booted && <Boot />}
    </div>
  );
}
