import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FaChevronDown } from 'react-icons/fa'
import logo from '../assets/logo.png'
import mainL from '../assets/main-l.png'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/numerology', label: 'Numerology' },
  { path: '/biogeometry', label: 'BioGeometry' },
  { path: '/meditation-breathwork', label: 'Meditation' },
  { path: '/chakra-reading', label: 'Chakra Reading' },
  { path: '/retreats', label: 'Retreats' },
]

const books = Array.from({ length: 9 }, (_, i) => ({
  label: `Book ${i + 1}`,
  path: `/books/${i + 1}`,
}))

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [booksOpen, setBooksOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setBooksOpen(false)
  }, [location])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBooksOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <>
    <div className={`l-decoration ${scrolled ? 'scrolled' : ''}`}>
      <div className="l-decoration-container">
        <img src={mainL} alt="" draggable="false" />
      </div>
    </div>
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="My LifeChoices" className="navbar-logo" />
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

          {/* Books dropdown */}
          <li className="nav-has-dropdown" ref={dropdownRef}>
            <button
              className={`nav-dropdown-toggle ${booksOpen ? 'open' : ''}`}
              onClick={() => setBooksOpen(v => !v)}
            >
              Books <FaChevronDown className="dropdown-chevron" />
            </button>
            {booksOpen && (
              <ul className="nav-dropdown">
                {books.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path}>{label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Gallery */}
          <li>
            <Link
              to="/gallery"
              className={location.pathname === '/gallery' ? 'active' : ''}
            >
              Gallery
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}
