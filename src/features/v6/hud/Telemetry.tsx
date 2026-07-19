import { useEffect, useState } from 'react'

export default function Telemetry() {
  const [pkt, setPkt] = useState(1480)
  const [up, setUp] = useState(0)
  const [entropy, setEntropy] = useState(62)

  useEffect(() => {
    const id = setInterval(() => {
      setPkt((p) => Math.max(900, Math.min(2400, p + Math.round((Math.random() - 0.5) * 220))))
      setUp((u) => u + 1)
      setEntropy((e) => Math.max(38, Math.min(94, e + Math.round((Math.random() - 0.5) * 14))))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(Math.floor(up / 3600)).padStart(2, '0')
  const mm = String(Math.floor((up % 3600) / 60)).padStart(2, '0')
  const ss = String(up % 60).padStart(2, '0')

  return (
    <div className="hud hud-telemetry">
      <div className="tl-row">
        <span className="dim">session</span>
        <span>
          {hh}:{mm}:{ss}
        </span>
      </div>
      <div className="tl-row">
        <span className="dim">mesh traffic</span>
        <span>{pkt} pkt/s</span>
      </div>
      <div className="tl-row">
        <span className="dim">entropy</span>
        <span className="tl-bar">
          <i style={{ width: `${entropy}%` }} />
        </span>
        <span>{entropy}%</span>
      </div>
      <div className="tl-row">
        <span className="dim">threat level</span>
        <span className="tl-low">low</span>
      </div>
    </div>
  )
}
