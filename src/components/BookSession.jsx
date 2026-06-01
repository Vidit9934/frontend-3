import { useState, useEffect } from 'react'
import { FaCalendarCheck, FaTimes } from 'react-icons/fa'
import './BookSession.css'

const ALL_SLOTS = ['11:00 AM', '2:00 PM', '5:00 PM', '7:00 PM', '9:00 PM']

function getAvailableSlots(dateStr) {
  if (!dateStr) return ALL_SLOTS
  try {
    const avail = JSON.parse(localStorage.getItem('mlc_availability') || '{}')
    const day = avail[dateStr]
    if (!day) return ALL_SLOTS
    return ALL_SLOTS.filter(slot => day[slot] !== false)
  } catch { return ALL_SLOTS }
}

function saveBooking(data) {
  try {
    const bookings = JSON.parse(localStorage.getItem('mlc_bookings') || '[]')
    bookings.push({ ...data, id: Date.now().toString(), createdAt: new Date().toISOString() })
    localStorage.setItem('mlc_bookings', JSON.stringify(bookings))
  } catch {}
}

export default function BookSession() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', date: '' })
  const [submitted, setSubmitted] = useState(false)
  const [availableSlots, setAvailableSlots] = useState(ALL_SLOTS)

  useEffect(() => {
    setAvailableSlots(getAvailableSlots(formData.date))
    setSelectedSlot('')
  }, [formData.date])

  const handleSubmit = (e) => {
    e.preventDefault()
    saveBooking({ ...formData, slot: selectedSlot })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      setSelectedSlot('')
      setFormData({ name: '', email: '', phone: '', service: '', date: '' })
    }, 2500)
  }

  return (
    <>
      <button className="book-session-fab" onClick={() => setIsOpen(true)} aria-label="Book your session">
        <span className="fab-pulse" />
        <FaCalendarCheck className="fab-icon" />
        <span className="fab-text">Book Your Session</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content book-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>

            {submitted ? (
              <div className="book-success">
                <div className="success-icon">&#10003;</div>
                <h3>Booking Request Sent!</h3>
                <p>We'll get back to you shortly to confirm your session.</p>
              </div>
            ) : (
              <>
                <h3 className="book-title">Book Your Session</h3>
                <p className="book-subtitle">Choose a time that works for you</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+65 xxxx xxxx"
                    />
                  </div>

                  <div className="form-group">
                    <label>Service</label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      <option value="numerology">Numerology</option>
                      <option value="biogeometry">BioGeometry</option>
                      <option value="meditation">Meditation & Breathwork</option>
                      <option value="chakra">Chakra Reading</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time</label>
                    <div className="time-slots">
                      {availableSlots.length === 0 ? (
                          <p style={{ color: '#b0adc8', fontSize: '0.85rem' }}>No slots available for this date.</p>
                        ) : null}
                      {availableSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary book-submit" disabled={!selectedSlot}>
                    <span>Confirm Booking</span>
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
