import FAQ from '../components/FAQ'
import { TbNumbers, TbBriefcase, TbHeart, TbCompass, TbUsers } from 'react-icons/tb'
import './ServicePage.css'

const highlights = [
  { icon: <TbBriefcase />, title: 'Career Clarity', desc: 'Understand your ideal professional path and when to make bold moves.' },
  { icon: <TbHeart />, title: 'Relationship Insights', desc: 'Decode compatibility and communication styles between partners.' },
  { icon: <TbCompass />, title: 'Life Purpose', desc: 'Discover your core strengths, challenges, and karmic lessons.' },
  { icon: <TbUsers />, title: 'Family Dynamics', desc: 'Better understand parent-child and sibling relationships.' },
]

const caseStudies = [
  { title: 'Student at a Crossroads', desc: 'Helped a student choose between engineering and design by revealing their innate creative strengths and ideal timing for the switch.' },
  { title: 'Parent-Teen Tensions', desc: 'A parent discovered why conventional approaches weren\'t working — their child\'s number profile needed freedom, not structure.' },
  { title: 'Business Partner Conflict', desc: 'Numerology revealed misaligned work styles between partners, leading to clearer role definitions and renewed collaboration.' },
  { title: 'Career Shift at 40', desc: 'A professional stuck in a draining job found the confidence to transition after understanding their life cycle timing.' },
]

const faqItems = [
  { q: 'What type of numerology do you practice?', a: 'I combine Vedic and Chinese numerology with grid-based profiling for a comprehensive character and life-path analysis that goes deeper than traditional methods.' },
  { q: 'Do I need to prepare anything before a session?', a: 'Just your full birthdate and the name on your birth certificate. No prior knowledge of numerology is needed — I guide you through everything.' },
  { q: 'Is this about predicting the future?', a: 'Not at all. Numerology reveals patterns, tendencies, and timing in your life. It helps you make better-informed decisions rather than telling you what will happen.' },
  { q: 'How long is a session?', a: 'A typical numerology session runs 60–90 minutes. It\'s thorough and personalized — not a generic reading.' },
  { q: 'Can numerology help with my child\'s education decisions?', a: 'Absolutely. Understanding your child\'s numerical profile can reveal their natural strengths, learning style, and what kind of environment helps them thrive.' },
  { q: 'Is this available online?', a: 'Yes, sessions are available both in-person (Singapore) and via video call for clients anywhere in the world.' },
]

export default function Numerology() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
          <div className="hero-icon-wrap">
            <TbNumbers />
          </div>
          <h1 className="fade-in">
            <span className="gradient-text">Numerology</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            What if your birthdate held the clues to your career, relationships and life purpose?
          </p>
        </div>
      </section>

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Deep Character & Life-Path <span className="gold-text">Analysis</span></h2>
            <p>
              Using a blend of Vedic and Chinese numerology with advanced grid-based profiling,
              I decode the patterns hidden in your birthdate and name — revealing personality
              traits, emotional tendencies, ideal career paths, relationship compatibility,
              and the timing of key life events.
            </p>
            <p>
              This isn't fortune-telling. It's a structured, analytical approach to self-understanding
              that helps professionals, parents, students, and couples make clearer, more confident decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="service-highlights">
        <div className="container">
          <h2 className="section-title">How Numerology <span className="gradient-text">Helps</span></h2>
          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <div key={i} className="highlight-card card">
                <div className="highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-studies">
        <div className="container">
          <h2 className="section-title">Real Problems <span className="gold-text">Solved</span></h2>
          <p className="section-subtitle">Actual client scenarios (details changed for privacy)</p>
          <div className="cases-grid">
            {caseStudies.map((c, i) => (
              <div key={i} className="case-card card">
                <span className="case-number">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />
    </>
  )
}
