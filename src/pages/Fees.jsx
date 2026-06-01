import { FaWhatsapp } from 'react-icons/fa'
import './Fees.css'

export default function Fees() {
  return (
    <>
      <section className="page-hero fees-hero">
        <div className="container">
          <span className="section-label">Transparent Pricing</span>
          <h1>Fees</h1>
          <p className="page-hero-sub">Simple, honest pricing — because transformation shouldn't be complicated.</p>
        </div>
      </section>

      <section className="fees-section">
        <div className="container fees-container">

          {/* Numerology */}
          <div className="fees-card">
            <div className="fees-card-header">
              <span className="fees-eyebrow section-label">Numerology</span>
              <h2 className="fees-title">1-Hour Face-To-Face Session</h2>
              <div className="fees-price">
                <span className="fees-amount">$96</span>
                <span className="fees-per">/ session</span>
              </div>
            </div>
            <div className="fees-card-body">
              <ul className="fees-list">
                <li>Payment by <strong>PayNow</strong> or <strong>cash</strong></li>
                <li>Home visits or remote appointments at <strong>no extra cost</strong></li>
                <li>If more time is needed for deeper issues, additional timing &amp; fees are discussed during the session</li>
                <li>International clients may book remote sessions via <strong>Zoom or phone</strong></li>
              </ul>
              <div className="fees-note">
                <p>
                  You may also offer Sharan your personal gift of encouragement as appreciation when
                  you receive your savings &amp; blessings from your personalised reading — greatly
                  appreciated. Thank you so much.
                </p>
              </div>
              <div className="fees-notice">
                <strong>Please note:</strong> Sharan does not conduct local Numerology sessions remotely
                via Zoom or phone at the present time. This method is strictly reserved for
                international clients only.
              </div>
            </div>
          </div>

          {/* BioGeometry + Meditation */}
          <div className="fees-card fees-card--bespoke">
            <div className="fees-card-header">
              <span className="fees-eyebrow section-label">BioGeometry &amp; Meditation &amp; Breathwork</span>
              <h2 className="fees-title">Bespoke Services</h2>
              <p className="fees-bespoke-sub">
                These services are tailored to your specific needs. Fees are discussed personally after
                understanding the help you require.
              </p>
            </div>
            <div className="fees-card-body">
              <p className="fees-whatsapp-cta-text">
                WhatsApp Sharan with the help you need and he will guide you on the fees from there.
              </p>
              <a
                href="https://wa.me/6589220656"
                target="_blank"
                rel="noopener noreferrer"
                className="fees-whatsapp-btn"
              >
                <FaWhatsapp /> WhatsApp Sharan
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
