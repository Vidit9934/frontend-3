import { useState, useEffect, useRef } from 'react'
import { FaCalendarCheck, FaTimes } from 'react-icons/fa'
import { collection, addDoc, query, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import './BookSession.css'

const ALL_SLOTS = ['11:00 AM', '2:00 PM', '5:00 PM', '7:00 PM', '9:00 PM']

function getDateBounds() {
  const today = new Date()
  const max = new Date()
  max.setDate(today.getDate() + 30)
  const fmt = (d) => d.toISOString().split('T')[0]
  return { min: fmt(today), max: fmt(max) }
}

export default function BookSession() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', date: '' })
  const [submitted, setSubmitted] = useState(false)
  const [availableSlots, setAvailableSlots] = useState(ALL_SLOTS)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const slotCacheRef = useRef({})
  const { min, max } = getDateBounds()

  useEffect(() => {
    if (!formData.date) { setAvailableSlots(ALL_SLOTS); return }
    if (slotCacheRef.current[formData.date]) {
      setAvailableSlots(slotCacheRef.current[formData.date])
      return
    }
    setLoadingSlots(true)
    setSelectedSlot('')

    Promise.all([
      getDocs(query(collection(db, 'bookings'), where('date', '==', formData.date))),
      getDoc(doc(db, 'availability', formData.date)),
    ]).then(([bookingsSnap, availDoc]) => {
      const takenSlots = bookingsSnap.docs
        .filter(d => d.data().status !== 'cancelled')
        .map(d => d.data().slot)
      const adminConfig = availDoc.exists() ? (availDoc.data().slots || {}) : {}
      const slots = ALL_SLOTS.filter(s => !takenSlots.includes(s) && adminConfig[s] !== false)
      slotCacheRef.current[formData.date] = slots
      setAvailableSlots(slots)
    }).catch(() => setAvailableSlots(ALL_SLOTS))
      .finally(() => setLoadingSlots(false))
  }, [formData.date])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedSlot) return
    setSubmitting(true)
    try {
      const writePromise = addDoc(collection(db, 'bookings'), {
        ...formData,
        slot: selectedSlot,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out. Check your internet or Firebase setup.')), 15000)
      )
      await Promise.race([writePromise, timeoutPromise])
      delete slotCacheRef.current[formData.date]
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setIsOpen(false)
        setSelectedSlot('')
        setFormData({ name: '', email: '', phone: '', service: '', date: '' })
      }, 2500)
    } catch (err) {
      console.error('Booking error:', err)
      alert('Booking failed: ' + (err?.message || 'Unknown error'))
    } finally {
      setSubmitting(false)
    }
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
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input type="tel" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+65 xxxx xxxx" />
                  </div>
                  <div className="form-group">
                    <label>Service</label>
                    <select required value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Select a service</option>
                      <option value="Numerology">Numerology</option>
                      <option value="BioGeometry">BioGeometry</option>
                      <option value="Meditation & Breathwork">Meditation & Breathwork</option>
                      <option value="Chakra Reading">Chakra Reading</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Date <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.78rem' }}>(within 30 days)</span></label>
                    <input type="date" required min={min} max={max}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time</label>
                    <div className="time-slots">
                      {loadingSlots ? (
                        <p style={{ color: '#b0adc8', fontSize: '0.85rem' }}>Checking availability…</p>
                      ) : availableSlots.length === 0 ? (
                        <p style={{ color: '#b0adc8', fontSize: '0.85rem' }}>No slots available for this date.</p>
                      ) : availableSlots.map((slot) => (
                        <button type="button" key={slot}
                          className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedSlot(slot)}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="btn-primary book-submit" disabled={!selectedSlot || submitting}>
                    <span>{submitting ? 'Confirming…' : 'Confirm Booking'}</span>
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
