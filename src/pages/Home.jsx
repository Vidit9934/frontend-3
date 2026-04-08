import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa'
import { TbNumbers, TbGeometry, TbYoga, TbEye } from 'react-icons/tb'
import './Home.css'

const services = [
  {
    icon: <TbNumbers />,
    title: 'Numerology',
    desc: 'Decode your birthdate to reveal career paths, relationship patterns, and life purpose.',
    link: '/numerology',
    accent: '#7b2ff2',
  },
  {
    icon: <TbGeometry />,
    title: 'BioGeometry',
    desc: 'Harmonize your spaces with geometric science to balance energy and reduce stress.',
    link: '/biogeometry',
    accent: '#ec4899',
  },
  {
    icon: <TbYoga />,
    title: 'Meditation & Breathwork',
    desc: 'Restore your nervous system through classical pranayama and guided meditation.',
    link: '/meditation-breathwork',
    accent: '#d4a853',
  },
  {
    icon: <TbEye />,
    title: 'Chakra Reading',
    desc: 'Journey through your energy centers to unlock emotional clarity and personal power.',
    link: '/chakra-reading',
    accent: '#06b6d4',
  },
]

const testimonials = [
  {
    text: "Sharan's numerology session gave me the clarity I'd been searching for about my career change. It was spot-on and deeply personal.",
    name: 'R.K.',
    context: 'Career Clarity',
    stars: 5,
  },
  {
    text: 'The breathwork session was transformative. I felt years of stored tension release in just one sitting. I sleep better now.',
    name: 'M.L.',
    context: 'Emotional Release',
    stars: 5,
  },
  {
    text: 'After the BioGeometry adjustments, our home felt completely different — calmer, lighter. Even the kids noticed the change.',
    name: 'S.T.',
    context: 'Home Energy',
    stars: 5,
  },
]

const stats = [
  { number: '1000+', label: 'Sessions Conducted' },
  { number: '10+', label: 'Years Experience' },
  { number: '4', label: 'Core Disciplines' },
  { number: '15+', label: 'Countries Served' },
]

export default function Home() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="hero">
        <div className="hero-bg-effects">
          <div className="hero-orb hero-orb--purple" />
          <div className="hero-orb hero-orb--pink" />
          <div className="hero-orb hero-orb--gold" />
          <div className="hero-grid-lines" />
        </div>

        <div className="container hero-layout">
          {/* Left: Text */}
          <div className="hero-text">
            <span className="hero-label fade-in">NumberSaySo&trade; by Sharan</span>
            <h1 className="fade-in fade-in-delay-1">
              Master Every Area of <span className="gradient-text">Your Life</span>
            </h1>
            <p className="hero-desc fade-in fade-in-delay-2">
              Find peace, clarity and direction in your health, relationships,
              career and life purpose — through ancient sciences refined for modern life.
            </p>
            <div className="hero-actions fade-in fade-in-delay-3">
              <Link to="/about" className="btn-primary">
                <span>Start Your Journey</span> <FaArrowRight />
              </Link>
              <Link to="/retreats" className="btn-outline">
                Upcoming Retreat
              </Link>
            </div>
            {/* Stats row */}
            <div className="hero-stats fade-in fade-in-delay-4">
              {stats.map((s, i) => (
                <div key={i} className="hero-stat">
                  <span className="stat-number">{s.number}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo with spiritual aura */}
          <div className="hero-image-wrap fade-in fade-in-delay-2">
            <div className="hero-aura">
              <div className="aura-ring aura-ring--1" />
              <div className="aura-ring aura-ring--2" />
              <div className="aura-ring aura-ring--3" />
              {/* Floating spiritual symbols */}
              <svg className="spiritual-symbol sym-1" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(212,168,83,0.4)" strokeWidth="0.5" />
                <circle cx="12" cy="12" r="6" stroke="rgba(212,168,83,0.3)" strokeWidth="0.5" />
                <circle cx="12" cy="12" r="2" fill="rgba(212,168,83,0.5)" />
              </svg>
              <svg className="spiritual-symbol sym-2" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L14 10 L22 10 L16 15 L18 22 L12 18 L6 22 L8 15 L2 10 L10 10 Z"
                  stroke="rgba(123,47,242,0.4)" strokeWidth="0.5" fill="rgba(123,47,242,0.1)" />
              </svg>
              <svg className="spiritual-symbol sym-3" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L15 9 L22 9 L16.5 14 L19 22 L12 17 L5 22 L7.5 14 L2 9 L9 9 Z"
                  stroke="rgba(236,72,153,0.3)" strokeWidth="0.5" fill="none" />
              </svg>
              {/* Om symbol */}
              <div className="spiritual-symbol sym-om">&#x0950;</div>
              {/* Floating particles */}
              <div className="hero-particle p1" />
              <div className="hero-particle p2" />
              <div className="hero-particle p3" />
              <div className="hero-particle p4" />
              <div className="hero-particle p5" />
              <div className="hero-particle p6" />
            </div>
            <div className="hero-photo">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop&crop=face"
                alt="Sharan - Master LifeChoice Analyst"
              />
              <div className="photo-gradient-overlay" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="hero-bottom-fade" />
      </section>

      {/* ───── WHAT I DO ───── */}
      <section className="what-i-do">
        <div className="container">
          <div className="section-divider" />
          <span className="section-label">Services</span>
          <h2 className="section-title">What I <span className="gradient-text">Do</span></h2>
          <p className="section-subtitle">
            Four transformative pathways to clarity — each rooted in ancient wisdom, refined for your modern life.
          </p>
          <div className="services-grid">
            {services.map((s, i) => (
              <Link to={s.link} key={i} className="service-card">
                <div className="service-card-glow" style={{ background: s.accent }} />
                <div className="service-icon" style={{ color: s.accent }}>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-cta" style={{ color: s.accent }}>
                  Explore <FaArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-divider" />
          <span className="section-label">Client Stories</span>
          <h2 className="section-title">Transformations That <span className="gold-text">Speak</span></h2>
          <p className="section-subtitle">Real experiences from real people who found their clarity.</p>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <FaQuoteLeft className="testimonial-quote-icon" />
                <div className="testimonial-stars">
                  {[...Array(t.stars)].map((_, j) => <FaStar key={j} />)}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-context">{t.context}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-block">
            <div className="cta-glow" />
            <span className="section-label">Take the First Step</span>
            <h2>Ready to Discover <span className="gradient-text">Your Path</span>?</h2>
            <p>Book a session and begin your journey toward clarity, purpose, and inner peace.</p>
            <div className="cta-actions">
              <Link to="/retreats" className="btn-gold">
                Explore the Retreat <FaArrowRight />
              </Link>
              <Link to="/numerology" className="btn-outline">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
