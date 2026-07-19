import { useEffect, useRef, useState } from 'react'
import { BOOT_LINES } from '../data/content'
import { useMeshStore } from '../state/store'

export default function Boot() {
  const setBooted = useMeshStore((s) => s.setBooted)
  const [lines, setLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    setLeaving(true)
    setTimeout(() => setBooted(), 450)
  }

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLines((l) => {
        if (l >= BOOT_LINES.length) {
          clearInterval(lineTimer)
          return l
        }
        return l + 1
      })
    }, 260)
    return () => clearInterval(lineTimer)
  }, [])

  useEffect(() => {
    const progTimer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.round(6 + Math.random() * 9))
        if (next >= 100) {
          clearInterval(progTimer)
          setTimeout(finish, 500)
        }
        return next
      })
    }, 130)
    return () => clearInterval(progTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`boot ${leaving ? 'boot-out' : ''}`} onClick={finish}>
      <div className="boot-box">
        <div className="boot-glyph">◈</div>
        {BOOT_LINES.slice(0, lines).map((l, i) => (
          <div key={i} className="boot-line">
            <span className="dim">&gt;</span> {l}
          </div>
        ))}
        <div className="boot-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="boot-meta">
          <span>{progress}%</span>
          <span className="dim">click to skip</span>
        </div>
      </div>
    </div>
  )
}
