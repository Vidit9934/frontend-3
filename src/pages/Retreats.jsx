import { TbMountain, TbCalendar, TbUsers, TbMapPin, TbCheck, TbSun, TbYoga, TbPlant } from 'react-icons/tb'
import './ServicePage.css'

const details = [
  { icon: <TbCalendar />, title: '10 Days', desc: 'March 20–29, 2026. A full immersion into classical yoga and self-discovery.' },
  { icon: <TbMapPin />, title: 'Rishikesh, India', desc: 'Tapovan — the yoga capital of the world, nestled in the Himalayan foothills.' },
  { icon: <TbUsers />, title: 'Small Group', desc: 'Intentionally intimate to ensure personal attention and deep connection.' },
]

const dailyPractices = [
  { icon: <TbSun />, title: 'Pranayama & Mantra', desc: 'Start each day with breathwork and sacred sound practice.' },
  { icon: <TbYoga />, title: 'Hatha & Yin Yoga', desc: 'Build strength and flexibility with classical yoga sessions.' },
  { icon: <TbPlant />, title: 'Meditation & Philosophy', desc: 'Guided meditation, ancient teachings, and integration time.' },
  { icon: <TbMountain />, title: 'Sacred Site Learning', desc: 'Experience Rishikesh\'s temples, rivers, and spiritual heritage.' },
]

const includes = [
  'Daily sattvic (pure vegetarian) meals',
  'All yoga, breathwork, and meditation sessions',
  'Philosophy and sacred text teachings',
  'Ayurveda consultation',
  'Sacred site visits and learning',
  'Optional therapeutic massages',
  'Complimentary station pickup',
  'Integration and personal reflection time',
]

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

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>More Than a Retreat — A <span className="gold-text">Turning Point</span></h2>
            <p>
              For those feeling mentally exhausted, successful but internally unsettled, or simply
              ready for clarity without dogma. No prior yoga experience needed — just the
              willingness to show up for yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="retreat-details">
        <div className="container">
          <h2 className="section-title">The <span className="gradient-text">Details</span></h2>
          <div className="details-grid">
            {details.map((d, i) => (
              <div key={i} className="detail-card card">
                <div className="detail-icon">{d.icon}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-highlights">
        <div className="container">
          <h2 className="section-title">Daily <span className="gradient-text">Practice</span></h2>
          <p className="section-subtitle">A balanced rhythm of movement, stillness, and learning</p>
          <div className="highlights-grid">
            {dailyPractices.map((p, i) => (
              <div key={i} className="highlight-card card">
                <div className="highlight-icon" style={{ color: 'var(--accent-gold)' }}>{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Accommodation <span className="gold-text">Options</span></h2>
          <p className="section-subtitle">Choose what suits you best</p>
          <div className="pricing-grid">
            <div className="pricing-card card">
              <div className="price-label">Twin Share</div>
              <div className="price">$1,296</div>
              <div className="price-unit">USD per person</div>
              <p className="price-desc">Shared room with a fellow retreat participant. Perfect for those who enjoy company.</p>
            </div>
            <div className="pricing-card card featured">
              <div className="price-label">Private Room</div>
              <div className="price">$1,596</div>
              <div className="price-unit">USD per person</div>
              <p className="price-desc">Your own private space for maximum rest and reflection.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-studies">
        <div className="container">
          <h2 className="section-title">What's <span className="gradient-text">Included</span></h2>
          <ul className="includes-list">
            {includes.map((item, i) => (
              <li key={i}><TbCheck /> {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>What You <span className="gold-text">Take Home</span></h2>
            <p>
              Sustainable daily practices, stress management tools you can use anywhere,
              improved mental clarity, renewed physical vitality, and a steadiness
              that stays with you long after the retreat ends.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 24 }}>
              $500 USD non-refundable deposit via PayPal secures your spot.
              Remaining balance payable in cash in Rishikesh.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
