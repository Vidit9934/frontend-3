import './WizTec.css'

const team = [
  {
    role: 'CEO',
    name: 'Sharan',
    desc: 'The visionary architect behind WizTec. A spiritual idealist with an engineer\'s precision, Sharan blends ancient wisdom with digital strategy — channelling numerical science, healing frequencies and internet mastery to transform how individuals and businesses present themselves to the world.',
  },
  {
    role: 'COO',
    name: 'Ms Tanvi',
    desc: 'Production Head and creative force of WizTec. An ambidextrous multitasker who bridges vision with execution — from Facebook to Instagram projections, Tanvi ensures every concept is brought to life with precision, flair and systematic clarity.',
  },
  {
    role: 'CTO',
    name: 'Tushar Choudary',
    desc: 'Our lens master and visual strategist. A drone pilot, video director and cover designer rolled into one — Tushar captures the world with cinematic precision. From breathtaking aerials to polished brand visuals, his kinaesthetic eye for detail turns every frame into a statement.',
  },
  {
    role: 'Web Builder Extraordinaire',
    name: 'Vidit',
    desc: 'The digital architect of WizTec. Certified Claude architect and leading GenAI developer — Vidit builds fast, clean and to last, fusing AI into every layer to raise an entire web presence in a day. Meticulous in code, relentless in direction and perpetually in demand. This guy is busy.',
  },
  {
    role: 'AI Robotics & Outreach',
    name: 'Mr. Saurav',
    desc: 'WizTec\'s AI frontier commander. Saurav engineers avatar-driven advertising campaigns that fuse human storytelling with machine precision. From social awareness outreach to data lead analysis, he deploys AI mechanics to position your brand exactly where it needs to be.',
  },
  {
    role: 'Content & Marketing',
    name: 'Ms Shaticka',
    desc: 'The voice behind your brand. Shaticka crafts content that doesn\'t just inform — it resonates. With a flair for scripts, site management and strategic marketing, she gives your story the articulate, mindful presence it deserves across every digital platform.',
  },
]

export default function WizTec() {
  return (
    <div className="wiztec-page">

      {/* ── Hero ── */}
      <section className="wiztec-hero">
        <div className="wiztec-hero-glow wiztec-hero-glow--red" />
        <div className="wiztec-hero-glow wiztec-hero-glow--purple" />
        <div className="container wiztec-hero-inner">
          <p className="wiztec-eyebrow">Built by believers</p>
          <h1 className="wiztec-brand">
            <span className="gradient-text">Wiz</span>Tec
          </h1>
          <p className="wiztec-tagline">We Re-Incarnate You on the Web.</p>
          <p className="wiztec-sub">
            Your authentic digital self — built with colour, strategy and purpose.<br />
            A website that earns for you while you sleep isn't a luxury. It's a necessity.
          </p>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section className="wiztec-team-section">
        <div className="container">
          <p className="section-label">The People Behind the Magic</p>
          <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
          <div className="wiztec-team-grid">
            {team.map((member, i) => (
              <div className="wiztec-card" key={i}>
                <div className="wiztec-avatar" />
                <div className="wiztec-card-body">
                  <span className="wiztec-card-role">{member.role}</span>
                  <h3 className="wiztec-card-name">{member.name}</h3>
                  <p className="wiztec-card-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="wiztec-mission">
        <div className="container wiztec-mission-inner">
          <div className="wiztec-mission-divider" />
          <p className="wiztec-mission-text">
            Creating an authentic digital version of yourself — connecting, banking, broadcasting
            and converting — is a complex undertaking. The skills required are simply too vast
            for any one entrepreneur to master alone.
          </p>
          <p className="wiztec-mission-text">
            That's why WizTec exists. We are committed to re-incarnating you on the web —
            building your digital identity from the ground up, on your own terms and within
            a real budget.
          </p>
          <div className="wiztec-cta-block">
            <p className="wiztec-cta-text">
              Download our template &amp; questionnaire — then let's talk.
            </p>
            <a
              href="https://wa.me/6589220656"
              target="_blank"
              rel="noopener noreferrer"
              className="wiztec-cta-btn"
            >
              DM us · +65 8922 0656
            </a>
          </div>
          <p className="wiztec-closing">
            We Re-Incarnate You on the Web — <em>get jiggy with it.</em>
          </p>
        </div>
      </section>

    </div>
  )
}
