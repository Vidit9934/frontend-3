import { TbMountain } from 'react-icons/tb'
import './ServicePage.css'

export default function Retreats() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
          <div className="hero-icon-wrap">
            <TbMountain />
          </div>
          <h1 className="fade-in">
            <span className="gradient-text">Reset Your Life</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            A 10-day immersive yoga and life clarity retreat in Rishikesh, India.
          </p>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="section-label" style={{ textAlign: 'left' }}>Retreat</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, fontWeight: 700, textAlign: 'left' }}>
              Rishikesh Changed My <span className="gradient-text">Life</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                For years, my life moved in many directions at once. Outwardly functional, inwardly
                unsettled, I carried persistent questions about purpose, meaning and direction that
                success alone could not answer.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                That search led me to Rishikesh in 2017. I undertook a 10-day immersive yoga course
                and the experience brought a level of clarity, grounding and inner alignment I had
                not encountered before.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                It was not emotional. It was precise. Something fundamental recalibrated.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                Since then, my study has gone far deeper and more disciplined. I immersed myself in
                classical yoga and breathwork and practice numerology and bio geometry at an advanced
                level. These disciplines were not studied in isolation but tested through lived
                practice and integration.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                Today, I work with people from around the world to help them live with greater
                awareness, presence, and inner freedom.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                Drawing from this body of work, and years of direct experience, I have worked closely
                with the team at Maharishi Yoga Peeth to design this specialised 10-day on-site
                retreat in Rishikesh as a deliberate confluence of ancient yogic disciplines and
                contemporary interpretive tools.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                The programme is structured to help participants not only experience inner alignment
                but understand how to apply it with clarity and stability in daily modern living.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', margin: 0 }}>
                My aim for everyone participating in this retreat is to leave grounded, clear, and
                equipped with practices and understanding they can carry forward long after returning home.
              </p>
              <div style={{ marginTop: 12 }}>
                <a href="/Retreat.pdf" download className="btn-primary" style={{ textDecoration: 'none' }}>
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
