import { useEffect, useState } from 'react'
import { useMeshStore } from '../state/store'
import { NODES } from '../data/content'

export default function Header() {
  const focused = useMeshStore((s) => s.focused)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const focusedNode = focused !== null ? NODES.find((n) => n.id === focused) : null

  return (
    <header className="hud hud-top">
      <div className="hud-brand">
        <span className="brand-glyph glitch" data-text="f1cu.holo.mesh">
          f1cu.holo.mesh
        </span>
        <span className="brand-sub">control room // revision 05</span>
      </div>

      <div className="hud-title">operational intelligence mesh</div>

      <div className="hud-status">
        <div className="status-line">
          <i className="dot dot-green" /> mesh online
        </div>
        <div className="status-line">
          <span className="dim">local</span> {time}
        </div>
        <div className="status-line">
          <span className="dim">focus //</span>{' '}
          <span style={{ color: focusedNode?.color ?? '#64748b' }}>
            {focusedNode ? focusedNode.category : 'roaming'}
          </span>
        </div>
        <div className="versions">
          <a href="https://f1cu.space/" target="_blank" rel="noreferrer">
            v1
          </a>
          <a href="https://f1cu.space/v4" target="_blank" rel="noreferrer">
            v4
          </a>
          <span className="v-active">v5</span>
        </div>
      </div>
    </header>
  )
}
