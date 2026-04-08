import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logo from '../assets/logo.png'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/numerology', label: 'Numerology' },
  { path: '/biogeometry', label: 'BioGeometry' },
  { path: '/meditation-breathwork', label: 'Meditation' },
  { path: '/chakra-reading', label: 'Chakra Reading' },
  { path: '/retreats', label: 'Retreats' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-wrap">
            <img src={logo} alt="My LifeChoices" className="navbar-logo" />
            <div className="brand-l-mark">
              {/* CSS-drawn L shape with cosmic glow */}
              <svg viewBox="0 0 40 40" className="l-shape-svg">
                <defs>
                  <linearGradient id="lGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7b2ff2" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="lGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M10 4 L10 30 L32 30"
                  fill="none"
                  stroke="url(#lGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lGlow)"
                />
                {/* Cosmic sparkle dots */}
                <circle cx="10" cy="4" r="1.5" fill="#a855f7" opacity="0.9">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="32" cy="30" r="1.5" fill="#ec4899" opacity="0.9">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="10" cy="30" r="1" fill="#d4a853" opacity="0.7">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Small star at corner */}
                <path d="M20 16 L21 18 L23 18 L21.5 19.5 L22 22 L20 20.5 L18 22 L18.5 19.5 L17 18 L19 18 Z"
                  fill="white" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          </div>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={location.pathname === path ? 'active' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
