import FAQ from '../components/FAQ'
import { TbGeometry } from 'react-icons/tb'
import './ServicePage.css'
import './BioGeometry.css'

// ── Sparse background stars (cluster-based) ──
const STAR_CLUSTERS = [
  { cx: 5,  cy: 8,  spread: 6, count: 8  },
  { cx: 88, cy: 5,  spread: 7, count: 10 },
  { cx: 15, cy: 70, spread: 6, count: 7  },
  { cx: 92, cy: 65, spread: 5, count: 8  },
  { cx: 45, cy: 90, spread: 8, count: 9  },
  { cx: 72, cy: 28, spread: 5, count: 6  },
]
const BG_STARS = STAR_CLUSTERS.flatMap(({ cx, cy, spread, count }) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + i * 1.618
    const radius = ((i * 0.7 + 1) % spread)
    return {
      x:     Math.max(1, Math.min(99, cx + Math.cos(angle) * radius)),
      y:     Math.max(1, Math.min(99, cy + Math.sin(angle) * radius)),
      size:  [0.8, 1, 1, 1.2][i % 4],
      dur:   2.5 + (i * 0.41) % 3,
      delay: (i * 0.53) % 5,
    }
  })
)

// ── Shooting stars ──
const SHOOTS = [
  { top: '8%',  left: '0%', width: 200, dur: '6s', delay: '2s'  },
  { top: '40%', left: '8%', width: 260, dur: '8s', delay: '11s' },
  { top: '72%', left: '4%', width: 180, dur: '7s', delay: '22s' },
]

// ── Nebulas ──
const NEBULAS = [
  { w: 500, h: 360, top: '-6%',  left: '-2%',  bg: 'radial-gradient(ellipse, rgba(123,47,242,0.18), transparent 70%)',  dur: '22s', delay: '0s' },
  { w: 400, h: 400, top: '15%',  right: '-4%', bg: 'radial-gradient(ellipse, rgba(6,182,212,0.12), transparent 70%)',   dur: '28s', delay: '5s' },
  { w: 350, h: 280, top: '60%',  left: '10%',  bg: 'radial-gradient(ellipse, rgba(236,72,153,0.10), transparent 70%)',  dur: '18s', delay: '9s' },
]

// ── Planet data ──
const PLANETS = [
  {
    name: 'Mercury', orbitD: 130, size: 7, period: 8, startDeg: 45,
    gradient: 'radial-gradient(circle at 35% 30%, #c8b89a 0%, #9a8878 40%, #6a5850 72%, #3a2c28 100%)',
    glow: 'rgba(178,158,130,0.28)',
  },
  {
    name: 'Venus', orbitD: 200, size: 14, period: 14, startDeg: 160,
    gradient: 'radial-gradient(circle at 38% 32%, #f5e090 0%, #e0b83a 28%, #b07810 56%, #602800 100%)',
    glow: 'rgba(224,180,58,0.38)',
  },
  {
    name: 'Earth', orbitD: 285, size: 16, period: 22, startDeg: 275,
    gradient: 'radial-gradient(circle at 35% 30%, #88cef4 0%, #2878d0 28%, #1252a8 55%, #081838 100%)',
    glow: 'rgba(40,120,208,0.42)',
  },
  {
    name: 'Mars', orbitD: 375, size: 11, period: 32, startDeg: 118,
    gradient: 'radial-gradient(circle at 32% 28%, #ec7848 0%, #c83818 35%, #881008 68%, #401008 100%)',
    glow: 'rgba(200,56,24,0.34)',
  },
  {
    name: 'Jupiter', orbitD: 505, size: 34, period: 56, startDeg: 212,
    // Multi-stop gradient to suggest atmospheric banding
    gradient: 'radial-gradient(circle at 36% 30%, #edd090 0%, #c89050 16%, #ddb460 28%, #b07838 40%, #d0a060 52%, #9a6828 64%, #7a5022 76%, #4a2c12 90%, #2a1808 100%)',
    glow: 'rgba(206,154,80,0.38)',
  },
  {
    name: 'Saturn', orbitD: 655, size: 26, period: 76, startDeg: 308,
    gradient: 'radial-gradient(circle at 38% 32%, #f0dea0 0%, #d2a850 32%, #927232 64%, #503810 100%)',
    glow: 'rgba(202,168,80,0.30)',
    ring: { outerR: 44, innerR: 18 },
  },
  {
    name: 'Uranus', orbitD: 796, size: 20, period: 102, startDeg: 68,
    gradient: 'radial-gradient(circle at 36% 30%, #c4f0f8 0%, #6cc4d8 30%, #2a8cb4 60%, #0c3868 100%)',
    glow: 'rgba(108,196,216,0.28)',
  },
]

const painPoints = [
  'Do you often feel mentally exhausted even after a full night\'s sleep?',
  'Struggle to focus at work despite your best efforts?',
  'Notice tension and miscommunication at home that seems to come out of nowhere?',
]

const faqItems = [
  { q: 'What exactly is BioGeometry?',          a: 'BioGeometry is the science of using geometric shapes, proportions and angles to harmonize energy fields in your environment. It was developed by Dr. Ibrahim Karim and is used worldwide.' },
  { q: 'How does it counter EMF and 5G effects?', a: 'BioGeometry shapes introduce a balancing energy quality that counteracts the stress caused by electromagnetic radiation from Wi-Fi routers, phones and 5G towers — without blocking the signals themselves.' },
  { q: 'Will I notice a difference quickly?',   a: 'Most clients report noticeable improvements within days — better sleep, clearer thinking, fewer arguments at home and reduced physical tension.' },
  { q: 'Do you need to visit my home or office?', a: 'Ideally yes, for the most accurate placement. However, remote consultations are available where I guide you through the process using floor plans and photos.' },
  { q: 'Is this related to Feng Shui?',         a: 'While there are overlapping principles around environmental energy, BioGeometry is a distinct science based on geometric shapes and measurable energy qualities rather than traditional Feng Shui elements.' },
  { q: 'How long does a BioGeometry session take?', a: 'An initial consultation runs about 90 minutes. Follow-up adjustments and checks are typically shorter.' },
]

const SUN_SIZE = 56

function SolarSystem() {
  const size = 876  // fits outermost orbit (796) + padding
  return (
    <div className="solar-system-wrap">
      <div className="solar-system" style={{ width: size, height: size }}>

        {/* Faint orbit paths */}
        {PLANETS.map(p => (
          <div key={p.name + '-orb'} className="orbit-path" style={{ width: p.orbitD, height: p.orbitD }} />
        ))}

        {/* Sun */}
        <div className="ss-sun" style={{ width: SUN_SIZE, height: SUN_SIZE }} />

        {/* Orbiting planets */}
        {PLANETS.map(p => {
          const animDelay = `${(-(p.startDeg / 360) * p.period).toFixed(2)}s`
          return (
            <div key={p.name} className="orbit-carrier" style={{
              width:  p.orbitD,
              height: p.orbitD,
              '--period': `${p.period}s`,
              animationDelay: animDelay,
            }}>
              {/* Planet group pinned to 12 o'clock of carrier */}
              <div style={{
                position:  'absolute',
                top:       0,
                left:      '50%',
                transform: 'translate(-50%, -50%)',
                width:     p.size,
                height:    p.size,
              }}>
                {/* Saturn ring — behind planet sphere */}
                {p.ring && (
                  <div className="saturn-ring" style={{
                    position:    'absolute',
                    top:         '50%',
                    left:        '50%',
                    transform:   'translate(-50%, -50%)',
                    width:       p.ring.outerR * 2,
                    height:      Math.round(p.ring.outerR * 0.42),
                    borderWidth: p.ring.outerR - p.ring.innerR,
                    borderColor: 'rgba(212,178,100,0.60)',
                    zIndex: 1,
                  }} />
                )}
                {/* Planet sphere — ::before terminator shadow, ::after specular highlight applied by CSS */}
                <div className="ss-planet" style={{
                  position:   'relative',
                  top:        'unset',
                  left:       'unset',
                  transform:  'none',
                  width:      p.size,
                  height:     p.size,
                  background: p.gradient,
                  boxShadow:  `0 0 ${Math.round(p.size * 0.55)}px ${Math.round(p.size * 0.2)}px ${p.glow}`,
                  zIndex: 2,
                }} />
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default function BioGeometry() {
  return (
    <div className="bio-page">

      {/* ════ CELESTIAL SKY ════ */}
      <div className="bio-sky">

        {/* Milky Way band */}
        <div className="milky-way" />

        {/* Nebula clouds */}
        {NEBULAS.map((n, i) => (
          <div key={i} className="nebula" style={{
            width: n.w, height: n.h,
            top: n.top, left: n.left ?? 'unset', right: n.right ?? 'unset',
            background: n.bg,
            '--dur': n.dur, '--delay': n.delay,
          }} />
        ))}

        {/* Background stars */}
        {BG_STARS.map((s, i) => (
          <div key={i} className="bg-star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
          }} />
        ))}

        {/* Shooting stars */}
        {SHOOTS.map((s, i) => (
          <div key={i} className="shooting-star" style={{
            top: s.top, left: s.left, width: s.width,
            '--dur': s.dur, '--delay': s.delay,
          }} />
        ))}

      </div>
      {/* ════ END SKY ════ */}

      {/* Solar System */}
      <SolarSystem />

      {/* Hero */}
      <section className="page-hero" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'linear-gradient(rgba(5,5,20,0.55), rgba(5,5,20,0.55)), url(/pics/bg5.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Galaxy core behind icon */}
        <div style={{
          position: 'absolute',
          width: 500, height: 500,
          top: '50%', left: '50%',
          marginTop: -250, marginLeft: -250,
          background: 'radial-gradient(ellipse, rgba(123,47,242,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
        }} />

        {/* Rotating sacred geometry rings */}
        <div className="geo-ring" style={{ width: 280, height: 280, borderColor: 'rgba(123,47,242,0.25)', '--dur': '28s', '--dir': 'normal'  }} />
        <div className="geo-ring" style={{ width: 380, height: 380, borderColor: 'rgba(6,182,212,0.18)',  '--dur': '40s', '--dir': 'reverse' }} />
        <div className="geo-ring" style={{ width: 480, height: 480, borderColor: 'rgba(212,168,83,0.12)', '--dur': '55s', '--dir': 'normal', borderStyle: 'dashed' }} />

        {/* Rotating hex SVG */}
        <svg style={{ position: 'absolute', width: 320, height: 320, top: '50%', left: '50%', marginTop: -160, marginLeft: -160, animation: 'ring-spin 35s linear infinite', opacity: 0.1 }} viewBox="0 0 100 100">
          <polygon points="50,5 91,27.5 91,72.5 50,95 9,72.5 9,27.5"    fill="none" stroke="rgba(180,200,255,1)" strokeWidth="0.6" />
          <polygon points="50,18 79,34.5 79,65.5 50,82 21,65.5 21,34.5" fill="none" stroke="rgba(180,200,255,1)" strokeWidth="0.4" />
          <polygon points="50,28 71,39 71,61 50,72 29,61 29,39"          fill="none" stroke="rgba(180,200,255,1)" strokeWidth="0.3" />
        </svg>

        <div className="container hero-content bio-hero-inner">
          <div className="hero-icon-wrap">
            <TbGeometry />
          </div>
          <h1 className="fade-in">
            <span className="gradient-text">BioGeometry</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            Harmonize your environment using the science of shape and energy.
          </p>
        </div>
      </section>

      {/* Pain points — 3 horizontal cards */}
      <section style={{ padding: '80px 0 0' }}>
        <div className="container">
          <h2 className="section-title">Feeling Drained, Unfocused, or <span className="gradient-text">On-Edge</span> at Home or Work?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '48px' }}>
            {painPoints.map((point, i) => (
              <div key={i} className="card" style={{ padding: '32px 28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(212,168,83,0.3)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  {`0${i + 1}`}
                </span>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '80px 0 100px', background: 'var(--bg-secondary)', marginTop: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="section-label" style={{ textAlign: 'left' }}>BioGeometry</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, fontWeight: 700, textAlign: 'left' }}>
              Your Environment Shapes <span className="gradient-text">How You Feel</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                You're not alone. Many high-functioning professionals and homeowners face these exact
                frustrations — and often, the real cause isn't you, it's your environment.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                BioGeometry offers a simple, science-based way to restore balance to the spaces you
                live and work in — without needing to overhaul your lifestyle. It works by using
                precise geometric shapes to harmonize the subtle energy fields in your environment,
                helping your body return to its natural state of calm, clarity and vitality.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                Originally developed by <a href="https://youtu.be/J3RlmAu3Rbs?si=PjKY_3MrqWdMm8-r" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-purple-light)', textDecoration: 'underline' }}>Dr. Ibrahim Karim</a> (My Guru).
                BioGeometry has been successfully applied in homes, offices, schools and even entire towns. These shapes interact with the electromagnetic and geopathic stresses around us—like Wi-Fi, 5G, and underground disturbances—to neutralize their effects on your nervous system.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                Most clients report noticeable improvements within days — better sleep, clearer
                thinking, fewer arguments at home, more focus at work and even reduced physical
                tension. It's subtle, non-invasive and blends seamlessly into any lifestyle.
              </p>
              <blockquote style={{
                borderLeft: '3px solid var(--accent-gold)',
                paddingLeft: 24,
                margin: '8px 0',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.7,
              }}>
                BioGeometry doesn't ask you to change who you are. It simply changes the energetic
                environment around you, so you can be more of your best self.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />

      {/* Still Confused? CTA */}
      <section className="bio-cta-section">
        <div className="container">
          <div className="bio-cta-card">
            <h2>Still <span className="gradient-text">Confused?</span></h2>
            <p>Reach out and we'll guide you through whether BioGeometry is right for you.</p>
            <button className="bio-cta-btn" onClick={() => document.querySelector('.contact-fab')?.click()}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
