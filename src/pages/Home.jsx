import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaQuoteLeft, FaYoutube } from 'react-icons/fa'
import { TbNumbers, TbGeometry, TbYoga, TbEye } from 'react-icons/tb'
import './Home.css'

const YT_VIDEO_ID = '68jC1sZJAkY'
const YT_WATCH_URL = `https://youtu.be/${YT_VIDEO_ID}`

// ── Slide components (defined outside to avoid re-mounting on every render) ──

function SlideVideo() {
  return (
    <div className="carousel-slide slide-video">
      <div className="slide-orb slide-orb--purple" />
      <div className="slide-orb slide-orb--pink" />
      <div className="container slide-inner slide-inner--split">
        <div className="slide-text">
          <span className="slide-badge">
            <FaYoutube style={{ color: '#ff4444', fontSize: '1.1rem' }} /> Featured Video
          </span>
          <h1 className="slide-title">Watch &amp; <span className="gradient-text">Discover</span></h1>
          <p className="slide-tagline">
            Get Peace, Clarity and Direction in Your Health, Relationships, Career and Money Matters.
          </p>
          <p className="slide-desc">
            See how ancient numerology reveals the hidden blueprint of your life —
            in this exclusive video by Sharan.
          </p>
          <a href={YT_WATCH_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Watch on YouTube <FaArrowRight />
          </a>
        </div>
        <div className="slide-video-frame">
          <iframe
            id="yt-player"
            src={`https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?enablejsapi=1&controls=1&modestbranding=1&rel=0`}
            title="Featured video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

function SlideNumerology() {
  return (
    <div className="carousel-slide slide-numerology">
      <div className="slide-orb slide-orb--purple-bright" />
      <div className="num-bg-numbers" aria-hidden="true">
        {['1','3','7','9','11','22','33'].map((n, i) => (
          <span key={i} className={`float-num fn-${i}`}>{n}</span>
        ))}
      </div>
      <div className="container slide-inner slide-inner--center">
        <span className="slide-badge slide-badge--purple">Ancient Science</span>
        <h1 className="slide-title">
          Discover What Your <span className="gradient-text">Numbers Reveal</span>
        </h1>
        <p className="slide-desc slide-desc--center">
          Your birthdate holds the blueprint of your destiny. Decode the hidden
          patterns shaping your career, relationships and life purpose.
        </p>
        <Link to="/numerology" className="btn-primary">
          Explore Numerology <FaArrowRight />
        </Link>
      </div>
    </div>
  )
}

function SlideBook() {
  return (
    <div className="carousel-slide slide-book">
      <div className="slide-orb slide-orb--gold" />
      <div className="slide-orb slide-orb--pink-soft" />
      <div className="container slide-inner slide-inner--center">
        <span className="slide-badge slide-badge--gold">Personal Consultation</span>
        <h1 className="slide-title">
          Begin Your <span className="gold-text">Transformation</span>
        </h1>
        <p className="slide-desc slide-desc--center">
          One session can change everything. Book a personal consultation with Sharan
          and discover your path to clarity, purpose and peace.
        </p>
        <button
          className="btn-gold"
          onClick={() => document.querySelector('.book-session-fab')?.click()}
        >
          Book a Session <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

const SLIDES = 3

const services = [
  {
    img: '/pics/image1.png',
    title: 'Numerology',
    desc: 'A Structured method to decode your birthdate revealing career paths, relationships patterns & life purpose.',
    link: '/numerology',
    accent: '#7b2ff2',
  },
  {
    img: '/pics/image2.png',
    title: 'BioGeometry',
    desc: 'An energy-balancing science that uses geometric shapes to harmonize your home or workspace, balance personal energy, reduce stress.',
    link: '/biogeometry',
    accent: '#ec4899',
  },
  {
    img: '/pics/image3.png',
    title: 'Meditation & Breathwork',
    desc: 'Guided practice using classical pranayama and meditation to release stress, reset your nervous system and restore inner calm.',
    link: '/meditation-breathwork',
    accent: '#d4a853',
  },
  {
    img: '/pics/image.png',
    title: 'Chakra Reading',
    desc: 'A structured journey through your energy centres to unlock emotional clarity & offer energetic balance.',
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
  // trackPos: 0=Book(clone) | 1=Video | 2=Numerology | 3=Book | 4=Video(clone)
  const [trackPos, setTrackPos] = useState(1)
  const [transEnabled, setTransEnabled] = useState(true)
  const timerRef = useRef(null)
  const videoPlayingRef = useRef(false)
  const startTimerRef = useRef(null)

  // Which dot lights up (0-indexed)
  const activeDot = ((trackPos - 1) % SLIDES + SLIDES) % SLIDES

  const startTimer = () => {
    clearInterval(timerRef.current)
    if (videoPlayingRef.current) return  // don't slide while video is playing
    timerRef.current = setInterval(() => {
      setTransEnabled(true)
      setTrackPos(prev => prev + 1)
    }, 5000)
  }

  // Keep ref fresh to avoid stale closure in YT callback
  useEffect(() => { startTimerRef.current = startTimer })

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  // YouTube IFrame API — pause auto-slide while video plays, resume on pause/end
  useEffect(() => {
    const setupPlayer = () => {
      new window.YT.Player('yt-player', {
        events: {
          onStateChange: (e) => {
            if (e.data === 1) { // PLAYING
              videoPlayingRef.current = true
              clearInterval(timerRef.current)
            } else { // PAUSED (2), ENDED (0), BUFFERING (3)
              videoPlayingRef.current = false
              startTimerRef.current?.()
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      setupPlayer()
    } else {
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script')
        tag.id = 'yt-api-script'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = setupPlayer
    }

    return () => {
      if (window.onYouTubeIframeAPIReady === setupPlayer)
        delete window.onYouTubeIframeAPIReady
    }
  }, [])

  // After transition finishes on a clone, snap to the real slide
  useEffect(() => {
    if (trackPos === SLIDES + 1) {
      const t = setTimeout(() => { setTransEnabled(false); setTrackPos(1) }, 700)
      return () => clearTimeout(t)
    }
    if (trackPos === 0) {
      const t = setTimeout(() => { setTransEnabled(false); setTrackPos(SLIDES) }, 700)
      return () => clearTimeout(t)
    }
  }, [trackPos])

  // Re-enable transition one frame after the instant snap
  useEffect(() => {
    if (!transEnabled) {
      const t = setTimeout(() => setTransEnabled(true), 50)
      return () => clearTimeout(t)
    }
  }, [transEnabled])

  const goNext = () => { setTransEnabled(true); setTrackPos(p => p + 1); startTimer() }
  const goPrev = () => { setTransEnabled(true); setTrackPos(p => p - 1); startTimer() }
  const goTo   = (i) => { setTransEnabled(true); setTrackPos(i + 1);     startTimer() }

  return (
    <>
      {/* ───── HERO CAROUSEL ───── */}
      <section className="hero-carousel">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${trackPos * 100}%)`,
            transition: transEnabled ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          }}
        >
          <SlideBook />       {/* clone — position 0 */}
          <SlideVideo />      {/* real  — position 1 */}
          <SlideNumerology /> {/* real  — position 2 */}
          <SlideBook />       {/* real  — position 3 */}
          <SlideVideo />      {/* clone — position 4 */}
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              className={`carousel-dot ${i === activeDot ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
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
                <div className="service-icon">
                  <img src={s.img} alt={s.title} />
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
            <p>Book a session and begin your journey toward clarity, purpose and inner peace.</p>
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
