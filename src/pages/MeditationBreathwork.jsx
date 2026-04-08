import FAQ from '../components/FAQ'
import { TbYoga, TbWind, TbMoodSmile, TbActivity, TbSparkles } from 'react-icons/tb'
import './ServicePage.css'

const highlights = [
  { icon: <TbWind />, title: 'Stress & Anxiety Relief', desc: 'Calm your nervous system and dissolve chronic tension through guided breathwork.' },
  { icon: <TbMoodSmile />, title: 'Emotional Clarity', desc: 'Release stored emotions and gain perspective on patterns that keep you stuck.' },
  { icon: <TbActivity />, title: 'Energy & Vitality', desc: 'Restore your body\'s natural energy flow and strengthen immune health.' },
  { icon: <TbSparkles />, title: 'Inner Connection', desc: 'Reconnect with your deeper self through ancient mantra and meditation practices.' },
]

const caseStudies = [
  { title: 'Executive Burnout', desc: 'A high-performing executive with racing thoughts and insomnia found deep calm after just three guided breathwork sessions.' },
  { title: 'Overwhelmed Mother', desc: 'A mother carrying the emotional weight of an entire household discovered a safe outlet through guided pranayama and yoga nidra.' },
  { title: 'Panic Attacks in a Young Adult', desc: 'A 24-year-old dealing with panic attacks learned breathwork techniques that became their go-to tool for self-regulation.' },
  { title: 'Creative Block', desc: 'An entrepreneur experiencing low energy and creative stagnation regained clarity and flow through regular breathwork practice.' },
]

const faqItems = [
  { q: 'Do I need prior meditation or yoga experience?', a: 'Not at all. Sessions are designed to meet you where you are — whether you\'re a complete beginner or have an existing practice. I guide you through every step.' },
  { q: 'What techniques do you teach?', a: 'I draw from classical practices including Pranayama, Yoga Nidra, Bhastrika, Kapalabhati, Anuloma Viloma, and Vedic Mantra Meditation — tailored to what your body and mind need.' },
  { q: 'How quickly will I feel results?', a: 'Many clients feel a noticeable shift after the very first session — calmer mind, deeper breathing, and reduced tension. Lasting transformation builds with consistent practice.' },
  { q: 'Is this available as a group session?', a: 'Yes, both private one-on-one sessions and small group sessions are available. Group sessions are great for couples, families, or small teams.' },
  { q: 'Can breathwork help with sleep issues?', a: 'Absolutely. Specific pranayama and yoga nidra techniques are highly effective for insomnia, restless sleep, and difficulty winding down at night.' },
  { q: 'Are online sessions as effective as in-person?', a: 'Yes. The guided nature of these practices translates very well to video calls. Many of my regular clients attend exclusively online.' },
]

export default function MeditationBreathwork() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
          <div className="hero-icon-wrap">
            <TbYoga />
          </div>
          <h1 className="fade-in">
            Meditation & Yogic <span className="gradient-text">Breathwork</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            Your breath isn't just for surviving — it's your shortcut to thriving.
          </p>
        </div>
      </section>

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Classical Techniques for <span className="gold-text">Modern Life</span></h2>
            <p>
              Trained in the lineage of classical yoga, I guide you through time-tested pranayama,
              mantra meditation, and deep relaxation techniques that calm the nervous system,
              clear mental fog, and restore your natural energy — one breath at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="service-highlights">
        <div className="container">
          <h2 className="section-title">Why <span className="gradient-text">Breathwork</span></h2>
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
