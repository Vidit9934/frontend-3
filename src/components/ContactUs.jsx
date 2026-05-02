import { useState } from 'react'
import { FaWhatsapp, FaTimes, FaCommentDots } from 'react-icons/fa'
import './ContactUs.css'

// TODO: Replace with Sharan's actual WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '6589220656'

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `*New Enquiry — My LifeChoices*\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n💬 Message: ${form.message}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setIsOpen(false)
      setForm({ name: '', phone: '', message: '' })
    }, 2000)
  }

  return (
    <>
      <button className="contact-fab" onClick={() => setIsOpen(true)} aria-label="Contact us">
        <FaCommentDots className="contact-fab-icon" />
        <span>Contact Us</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>

            {sent ? (
              <div className="contact-success">
                <FaWhatsapp className="success-wa-icon" />
                <h3>Opening WhatsApp…</h3>
                <p>Your message is ready to send to Sharan.</p>
              </div>
            ) : (
              <>
                <div className="contact-modal-header">
                  <FaWhatsapp className="modal-wa-icon" />
                  <h3 className="contact-title">Get in Touch</h3>
                  <p className="contact-subtitle">We'll connect with you on WhatsApp</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="contact-submit">
                    <FaWhatsapp /> Send on WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
