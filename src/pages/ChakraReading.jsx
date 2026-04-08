import { TbEye, TbFlame, TbDroplet, TbSun, TbHeart, TbMessage, TbBulb, TbCrown } from 'react-icons/tb'
import './ServicePage.css'

const chakras = [
  { icon: <TbFlame />, name: 'Root', color: '#e74c3c', desc: 'Stability, security, and grounding.' },
  { icon: <TbDroplet />, name: 'Sacral', color: '#e67e22', desc: 'Creativity, emotions, and pleasure.' },
  { icon: <TbSun />, name: 'Solar Plexus', color: '#f1c40f', desc: 'Confidence, willpower, and identity.' },
  { icon: <TbHeart />, name: 'Heart', color: '#2ecc71', desc: 'Love, compassion, and connection.' },
  { icon: <TbMessage />, name: 'Throat', color: '#3498db', desc: 'Communication and authentic expression.' },
  { icon: <TbBulb />, name: 'Third Eye', color: '#8e44ad', desc: 'Intuition, insight, and clarity.' },
  { icon: <TbCrown />, name: 'Crown', color: '#9b59b6', desc: 'Spiritual connection and higher purpose.' },
]

const outcomes = [
  'Greater emotional clarity and self-awareness',
  'Understanding of recurring behavioral patterns',
  'Identification of energy blockages affecting your life',
  'Practical strategies for chakra alignment',
  'Integration of numerology grids with chakra archetypes',
  'A deeper sense of inner peace and personal power',
]

export default function ChakraReading() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
          <div className="hero-icon-wrap">
            <TbEye />
          </div>
          <h1 className="fade-in">
            Chakra <span className="gradient-text">Reading</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            Discover the blueprint to your emotional strength, inner balance, and personal power.
          </p>
        </div>
      </section>

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Ancient Tantra Meets <span className="gold-text">Modern Insight</span></h2>
            <p>
              A chakra reading is a guided journey through your seven energy centers — exploring
              how each influences your emotions, behavior, and life decisions. Combined with
              numerology profiling, this creates a deeply personalized map of your inner landscape.
            </p>
          </div>
        </div>
      </section>

      <section className="service-highlights" style={{ background: 'transparent' }}>
        <div className="container">
          <h2 className="section-title">The Seven <span className="gradient-text">Chakras</span></h2>
          <p className="section-subtitle">Each energy center holds a key to understanding yourself</p>
          <div className="chakras-row">
            {chakras.map((c, i) => (
              <div key={i} className="chakra-item card" style={{ borderColor: `${c.color}33` }}>
                <div className="chakra-icon" style={{ color: c.color }}>{c.icon}</div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-studies">
        <div className="container">
          <h2 className="section-title">What You'll <span className="gold-text">Experience</span></h2>
          <div className="outcomes-grid">
            {outcomes.map((o, i) => (
              <div key={i} className="outcome-item card">
                <span className="outcome-check">&#10003;</span>
                <p>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Sharan's <span className="gradient-text">Background</span></h2>
            <p>
              With over 1,000 hours of certified Hatha-Vinyasa Yoga training in the Himalayas
              and participation in the Maha Kumbh spiritual gathering, Sharan brings deep
              traditional knowledge to every reading — grounded in practice, not performance.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
