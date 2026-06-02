import { Link } from 'react-router-dom'
import { TbBook, TbCalendarEvent, TbGift, TbStar } from 'react-icons/tb'
import './ServicePage.css'

const books = [
  { id: 1, title: 'The Numbers Say So', subtitle: 'Idealistic Innovator',  cover: '/pics/BOOK 1 copy.jpg' },
  { id: 2, title: 'The Numbers Say So', subtitle: 'Pragmatic Negotiator',  cover: '/pics/BOOK 2 copy.jpg' },
  { id: 3, title: 'The Numbers Say So', subtitle: 'Realistic Taskmaster',  cover: '/pics/BOOK 3 copy.jpg' },
  { id: 4, title: 'The Numbers Say So', subtitle: 'Idealistic Strategist', cover: '/pics/BOOK 4 copy.jpg' },
  { id: 5, title: 'The Numbers Say So', subtitle: 'Pragmatic Architect',   cover: '/pics/BOOK 5 copy.jpg' },
  { id: 6, title: 'The Numbers Say So', subtitle: 'Realistic Protector',   cover: '/pics/BOOK 6 copy.jpg' },
  { id: 7, title: 'The Numbers Say So', subtitle: 'Idealistic Spiritulist', cover: '/pics/BOOK 7 copy.jpg' },
  { id: 8, title: 'The Numbers Say So', subtitle: 'Pragmatic Commander',   cover: '/pics/BOOK 8 copy.jpg' },
  { id: 9, title: 'The Numbers Say So', subtitle: 'Realistic Creator',     cover: '/pics/BOOK 9 copy.jpg' },
]

const perks = [
  {
    icon: <TbCalendarEvent />,
    label: 'Pre-Launch Delivery',
    value: '1 October 2026',
    desc: 'Early birds receive their copies before the official launch — guaranteed delivery ahead of the crowd.',
  },
  {
    icon: <TbStar />,
    label: 'Early Bird Price',
    value: 'US $37.75',
    desc: 'A special pre-order rate exclusively for those who register before the launch date.',
  },
  {
    icon: <TbGift />,
    label: '100 Free Readings',
    value: '100 Lucky Numbers',
    desc: 'One hundred early bird pre-orders will receive a complimentary personal numerology reading with Sharan.',
  },
]

export default function Books() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(rgba(5,5,20,0.55), rgba(5,5,20,0.55)), url(/pics/bg1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container hero-content">
          <h1 className="fade-in">
            Sharan's <span className="gradient-text">Books</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            A collection of works on clarity, purpose and the LifeChoice journey.
          </p>
        </div>
      </section>

      {/* ── Pre-launch announcement ── */}
      <section style={{ padding: '100px 0', background: 'rgba(5,5,20,0.35)' }}>
        <div className="container">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-label">Coming Soon</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: 16, marginTop: 8 }}>
              We're Working on It —<br />
              <span className="gradient-text">Something Special Is Coming.</span>
            </h2>

            {/* Launch date card */}
            <div style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(212,168,83,0.08)',
              border: '1px solid rgba(212,168,83,0.3)',
              borderRadius: 16,
              padding: '20px 40px',
              marginTop: 24,
            }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 600 }}>Official Launch</span>
              <span style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#f0cc73', lineHeight: 1.1 }}>20 October 2026</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>Sharan's 60th Birthday</span>
            </div>
          </div>

          {/* Perks grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 72 }}>
            {perks.map((p, i) => (
              <div key={i} className="card" style={{ padding: '32px 28px', textAlign: 'center' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(212,168,83,0.12)',
                  border: '1px solid rgba(212,168,83,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontSize: '1.4rem', color: 'var(--accent-gold)',
                }}>
                  {p.icon}
                </div>
                <p style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>{p.label}</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f0cc73', marginBottom: 12 }}>{p.value}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Books grid ── */}
      <section style={{ padding: '100px 0', background: 'rgba(5,5,20,0.78)' }}>
        <div className="container">
          <p className="section-label">Reading List</p>
          <h2 className="section-title">All <span className="gold-text">9 Books</span></h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '32px',
            marginTop: '56px',
          }}>
            {books.map((book, i) => (
              <Link
                to={`/books/${book.id}`}
                key={book.id}
                className="card fade-in"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  animationDelay: `${i * 0.07}s`,
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ width: '100%', aspectRatio: '2/3', overflow: 'hidden' }}>
                  <img
                    src={book.cover}
                    alt={`${book.title} — ${book.subtitle}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {book.title}
                  </p>
                  <h3 style={{ margin: '0 0 14px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {book.subtitle}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    border: '1px solid var(--accent-gold)',
                    borderRadius: '60px',
                    color: 'var(--accent-gold)',
                    fontSize: '0.7rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                    Coming Soon
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
