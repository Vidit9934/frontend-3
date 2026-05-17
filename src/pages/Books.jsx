import { Link } from 'react-router-dom'
import { TbBook } from 'react-icons/tb'
import './ServicePage.css'

const books = [
  { id: 1, title: 'The Numbers Say So', subtitle: 'Idealistic Innovator', cover: '/books/book-1.jpg' },
  { id: 2, title: 'The Numbers Say So', subtitle: 'Pragmatic Negotiator', cover: '/books/book-2.jpg' },
  { id: 3, title: 'The Numbers Say So', subtitle: 'Realistic Taskmaster', cover: '/books/book-3.jpg' },
  { id: 4, title: 'The Numbers Say So', subtitle: 'Idealistic Strategist', cover: '/books/book-4.jpg' },
  { id: 5, title: 'The Numbers Say So', subtitle: 'Pragmatic Architect', cover: '/books/book-5.jpg' },
  { id: 6, title: 'The Numbers Say So', subtitle: 'Realistic Protector', cover: '/books/book-6.jpg' },
  { id: 7, title: 'The Numbers Say So', subtitle: 'Idealistic Spiritulist', cover: '/books/book-7.jpg' },
  { id: 8, title: 'The Numbers Say So', subtitle: 'Pragmatic Commander', cover: '/books/book-8.jpg' },
  { id: 9, title: 'The Numbers Say So', subtitle: 'Realistic Creator', cover: '/books/book-9.jpg' },
]

export default function Books() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-content">
          <div className="hero-icon-wrap">
            <TbBook />
          </div>
          <h1 className="fade-in">
            Sharan's <span className="gradient-text">Books</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            A collection of works on clarity, purpose, and the LifeChoice journey.
          </p>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
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
