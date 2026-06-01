import { Link } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaInstagram, FaFacebookF, FaYoutube, FaGlobe } from 'react-icons/fa'
import logo from '../assets/logo.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="My LifeChoices" className="footer-logo" />
            <p>Find peace, clarity and direction in your health, relationships, career and life purpose.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/numerology">Numerology</Link></li>
              <li><Link to="/biogeometry">BioGeometry</Link></li>
              <li><Link to="/meditation-breathwork">Meditation & Breathwork</Link></li>
              <li><Link to="/chakra-reading">Chakra Reading</Link></li>
              <li><Link to="/retreats">Retreats</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <a href="https://wa.me/6589220656" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
              <FaWhatsapp /> +65 8922 0656
            </a>
            <a href="mailto:sharan.mylifechoices@gmail.com" className="footer-contact-item">
              <FaEnvelope /> sharan.mylifechoices@gmail.com
            </a>
            <Link to="/wiztec" className="footer-contact-item footer-wiztec-link">
              <FaGlobe /> <span><strong>WizTec</strong> — We Re-Incarnate You on the Web</span>
            </Link>
            <div className="footer-socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} My LifeChoices by Sharan. All rights reserved.</p>
        </div>
      </div>
      <img src="/pics/badal.png" alt="" className="footer-badal" aria-hidden="true" />
    </footer>
  )
}
