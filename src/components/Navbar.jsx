import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logo from '../assets/logo.png'
import mainL from '../assets/main-l.png'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/numerology', label: 'Numerology' },
  { path: '/biogeometry', label: 'BioGeometry' },
  { path: '/meditation-breathwork', label: 'Meditation & Yogic Breathwork' },
  { path: '/chakra-reading', label: 'Chakra Reading' },
  { path: '/retreats', label: 'Retreats' },
  { path: '/about', label: 'About' },
  { path: '/books', label: 'Books' },
  { path: '/gallery', label: 'Gallery' },
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

        </ul>
      </div>
    </nav>
    </>
  )
}
