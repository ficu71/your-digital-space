import { NODES } from '../data/content'
import { useMeshStore } from '../state/store'

export default function Navigator() {
  const focused = useMeshStore((s) => s.focused)
  const toggle = useMeshStore((s) => s.toggle)

  return (
    <nav className="hud hud-nav">
      <div className="nav-head">
        <span>node navigator</span>
        <span className="dim">keys 1—4</span>
      </div>
      {NODES.map((n) => (
        <button
          key={n.id}
          className={`nav-item ${focused === n.id ? 'nav-active' : ''}`}
          style={{ '--c': n.color } as React.CSSProperties}
          onClick={() => toggle(n.id)}
        >
          <span className="nav-num">0{n.id}</span>
          <span className="nav-text">
            <b>{n.label}</b>
            <small>{n.category}</small>
          </span>
          <i className="nav-dot" />
        </button>
      ))}
    </nav>
  )
}
