import FAQ from '../components/FAQ'
import { TbGeometry, TbHome, TbBrain, TbMoodHappy, TbBolt } from 'react-icons/tb'
import './ServicePage.css'

const highlights = [
  { icon: <TbHome />, title: 'Space Harmonization', desc: 'Balance the energy in your home or office using precise geometric configurations.' },
  { icon: <TbBrain />, title: 'Mental Clarity', desc: 'Counteract electromagnetic stress from Wi-Fi, 5G, and devices that drain focus.' },
  { icon: <TbMoodHappy />, title: 'Emotional Balance', desc: 'Reduce household tension and create an environment that supports calm.' },
  { icon: <TbBolt />, title: 'Vitality Boost', desc: 'Experience improved sleep, clearer thinking, and reduced physical tension.' },
]

const caseStudies = [
  { title: 'Home Under Constant Stress', desc: 'A couple constantly arguing at home found relief after geometric energy balancing — tension dropped noticeably within days.' },
  { title: 'Child\'s Sleep & Focus Issues', desc: 'A child struggling with restless sleep and poor concentration improved after bedroom energy adjustments were applied.' },
  { title: 'Executive Emotional Blocks', desc: 'Through the Cracked Steps process, an executive released deep-seated patterns and regained emotional clarity.' },
  { title: 'Office Morale Shift', desc: 'A business space experiencing low morale saw measurable improvement in team energy and productivity post-adjustment.' },
]

const faqItems = [
  { q: 'What exactly is BioGeometry?', a: 'BioGeometry is the science of using geometric shapes, proportions, and angles to harmonize energy fields in your environment. It was developed by Dr. Ibrahim Karim and is used worldwide.' },
  { q: 'How does it counter EMF and 5G effects?', a: 'BioGeometry shapes introduce a balancing energy quality that counteracts the stress caused by electromagnetic radiation from Wi-Fi routers, phones, and 5G towers — without blocking the signals themselves.' },
  { q: 'Will I notice a difference quickly?', a: 'Most clients report noticeable improvements within days — better sleep, clearer thinking, fewer arguments at home, and reduced physical tension.' },
  { q: 'Do you need to visit my home or office?', a: 'Ideally yes, for the most accurate placement. However, remote consultations are available where I guide you through the process using floor plans and photos.' },
  { q: 'Is this related to Feng Shui?', a: 'While there are overlapping principles around environmental energy, BioGeometry is a distinct science based on geometric shapes and measurable energy qualities rather than traditional Feng Shui elements.' },
  { q: 'How long does a BioGeometry session take?', a: 'An initial consultation runs about 90 minutes. Follow-up adjustments and checks are typically shorter.' },
]

export default function BioGeometry() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
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

      <section className="service-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Shape-Based Energy <span className="gold-text">Harmonization</span></h2>
            <p>
              BioGeometry applies precise geometric forms to neutralize environmental stress —
              from electromagnetic radiation to geopathic disturbances. Whether it's your home,
              office, or personal space, the right geometric configuration can transform how
              a space feels and how you function within it.
            </p>
          </div>
        </div>
      </section>

      <section className="service-highlights">
        <div className="container">
          <h2 className="section-title">What BioGeometry <span className="gradient-text">Addresses</span></h2>
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
