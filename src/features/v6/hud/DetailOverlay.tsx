import { NODES, type DetailBlock } from '../data/content'
import { useMeshStore } from '../state/store'

function Block({ block }: { block: DetailBlock }) {
  switch (block.kind) {
    case 'text':
      return <p className="ov-text">{block.value}</p>
    case 'kv':
      return (
        <div className="ov-kv">
          {block.rows.map(([k, v]) => (
            <div key={k} className="ov-kv-row">
              <span className="dim">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )
    case 'stats':
      return (
        <div className="ov-stats">
          {block.rows.map(([v, l]) => (
            <div key={l} className="ov-stat">
              <b>{v}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      )
    case 'feature':
      return (
        <div className="ov-feature">
          <b>{block.title}</b>
          <p>{block.desc}</p>
        </div>
      )
    case 'chips':
      return (
        <div className="ov-chips">
          {block.chips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      )
    case 'project':
      return (
        <div className="ov-project">
          <div className="ov-proj-head">
            <b>{block.project.name}</b>
            <span className="dim">{block.project.tagline}</span>
          </div>
          <p>{block.project.desc}</p>
          <div className="ov-chips">
            {block.project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a href={block.project.url} target="_blank" rel="noreferrer" className="ov-link">
            {block.project.linkLabel} ↗
          </a>
        </div>
      )
    case 'actions':
      return (
        <div className="ov-actions">
          {block.actions.map((a) => (
            <a
              key={a.label}
              href={a.url}
              target={a.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className={a.primary ? 'ov-btn primary' : 'ov-btn'}
            >
              {a.label} ↗
            </a>
          ))}
        </div>
      )
    case 'ticks':
      return (
        <div className="ov-ticks">
          {block.items.map((t) => (
            <div key={t}>
              <span className="tick">✓</span> {t}
            </div>
          ))}
        </div>
      )
  }
}

export default function DetailOverlay() {
  const focused = useMeshStore((s) => s.focused)
  const select = useMeshStore((s) => s.select)
  const compact = useMeshStore((s) => s.compact)
  const node = focused !== null ? NODES.find((n) => n.id === focused) : null

  if (!node) return null

  return (
    <aside
      key={node.id}
      className={`overlay ${compact ? 'overlay-compact' : ''}`}
      style={{ '--c': node.color, '--cd': node.colorDim } as React.CSSProperties}
    >
      <div className="ov-head">
        <span>
          0{node.id} <span className="dim">//</span> {node.category}
        </span>
        <button className="ov-close" onClick={() => select(null)}>
          esc ✕
        </button>
      </div>
      <h2 className="ov-heading">{node.detail.heading}</h2>
      <div className="ov-body">
        {node.detail.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </aside>
  )
}
