import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { TbNumbers, TbGeometry, TbYoga, TbEye, TbSword, TbCertificate, TbWorld } from 'react-icons/tb'
import './ServicePage.css'

const credentials = [
  { icon: <TbSword />, title: 'Military Background', desc: 'Over a decade in personal protection, close-combat training, and intelligence operations.' },
  { icon: <TbCertificate />, title: '1,000+ Hours Training', desc: 'Certified Hatha-Vinyasa Yoga training in the Himalayas with traditional lineage holders.' },
  { icon: <TbWorld />, title: 'Global Practice', desc: 'BioGeometry certification, Ayurveda studies, Siddha practices, and Vedic numerology mastery.' },
]

const services = [
  { icon: <TbNumbers />, title: 'Numerology', desc: 'Career guidance, relationship dynamics, and life-path analysis through Vedic and Chinese numerology.', link: '/numerology' },
  { icon: <TbGeometry />, title: 'BioGeometry', desc: 'Home and office energy balancing using geometric science.', link: '/biogeometry' },
  { icon: <TbYoga />, title: 'Meditation & Breathwork', desc: 'Emotional release and nervous system restoration through classical techniques.', link: '/meditation-breathwork' },
  { icon: <TbEye />, title: 'Chakra Reading', desc: 'Energy alignment and self-discovery through tantra-based chakra analysis.', link: '/chakra-reading' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
          <h1 className="fade-in">
            From <span className="gradient-text">Warrior</span> to LifeChoice Analyst
          </h1>
          <p className="fade-in fade-in-delay-1">
            The journey from elite military operations to guiding people toward clarity and purpose.
          </p>
        </div>
      </section>

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Meet <span className="gold-text">Sharan</span></h2>
            <p>
              After over a decade in military service — personal protection, close-combat training,
              and intelligence work — Sharan reached a turning point. The discipline that shaped
              his outer world needed to be directed inward.
            </p>
            <p>
              He pursued intensive yoga studies across India, trained in Ayurveda and Siddha practices,
              earned BioGeometry certification, and developed LifeChoice Analytics&trade; — a profiling
              system built on Vedic and Chinese numerology that brings structure to self-understanding.
            </p>
            <p>
              Today, as a Master LifeChoice Analyst, Sharan blends analytical precision with deep
              intuition to help parents, professionals, students, and seekers find the clarity they need.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent-gold)', marginTop: 24 }}>
              "Clarity isn't a luxury — it's your birthright."
            </p>
          </div>
        </div>
      </section>

      <section className="credentials">
        <div className="container">
          <h2 className="section-title">Background & <span className="gradient-text">Training</span></h2>
          <div className="credentials-grid">
            {credentials.map((c, i) => (
              <div key={i} className="credential-card card">
                <div className="cred-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          <h2 className="section-title">How Sessions <span className="gold-text">Help</span></h2>
          <p className="section-subtitle">Practical guidance across every area of life</p>
          <div className="service-list-grid">
            {services.map((s, i) => (
              <Link to={s.link} key={i} className="service-list-item card">
                <div className="sli-icon">{s.icon}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Begin Your <span className="gradient-text">Journey</span>?</h2>
            <p>Take the first step toward clarity, purpose, and inner peace.</p>
            <Link to="/retreats" className="btn-primary">
              <span>Explore the Retreat</span> <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
