import { useState, useEffect } from 'react'
import './Admin.css'

const ADMIN_PIN = 'sharan2024'
const TIME_SLOTS = ['11:00 AM', '2:00 PM', '5:00 PM', '7:00 PM', '9:00 PM']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getWeekDates(weekOffset = 0) {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay() + weekOffset * 7)
  start.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function toDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function loadAvailability() {
  try { return JSON.parse(localStorage.getItem('mlc_availability') || '{}') }
  catch { return {} }
}

function loadBookings() {
  try { return JSON.parse(localStorage.getItem('mlc_bookings') || '[]') }
  catch { return [] }
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('mlc_admin') === '1')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [tab, setTab] = useState('availability')
  const [weekOffset, setWeekOffset] = useState(0)
  const [availability, setAvailability] = useState(loadAvailability)
  const [bookings, setBookings] = useState(loadBookings)
  const [saved, setSaved] = useState(false)

  const weekDates = getWeekDates(weekOffset)
  const todayStr = toDateStr(new Date())

  useEffect(() => {
    if (authed && tab === 'bookings') setBookings(loadBookings())
  }, [authed, tab])

  const login = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('mlc_admin', '1')
      setAuthed(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('mlc_admin')
    setAuthed(false)
    setPin('')
  }

  const isSlotEnabled = (dateStr, slot) => {
    const day = availability[dateStr]
    if (!day || day[slot] === undefined) return true
    return day[slot]
  }

  const toggleSlot = (dateStr, slot) => {
    setAvailability(prev => ({
      ...prev,
      [dateStr]: { ...(prev[dateStr] || {}), [slot]: !isSlotEnabled(dateStr, slot) }
    }))
  }

  const enableAll = (dateStr) => {
    setAvailability(prev => ({
      ...prev,
      [dateStr]: Object.fromEntries(TIME_SLOTS.map(s => [s, true]))
    }))
  }

  const disableAll = (dateStr) => {
    setAvailability(prev => ({
      ...prev,
      [dateStr]: Object.fromEntries(TIME_SLOTS.map(s => [s, false]))
    }))
  }

  const handleSave = () => {
    localStorage.setItem('mlc_availability', JSON.stringify(availability))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const clearBookings = () => {
    if (window.confirm('Clear all bookings? This cannot be undone.')) {
      localStorage.removeItem('mlc_bookings')
      setBookings([])
    }
  }

  if (!authed) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-lock-icon">🔐</div>
          <h2 className="admin-login-title">Admin Panel</h2>
          <p className="admin-login-sub">My LifeChoices — Sharan</p>
          <input
            type="password"
            className={`admin-pin-input ${pinError ? 'error' : ''}`}
            placeholder="Enter PIN"
            value={pin}
            onChange={e => { setPin(e.target.value); setPinError(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            autoFocus
          />
          {pinError && <p className="pin-error">Incorrect PIN. Try again.</p>}
          <button className="admin-primary-btn" onClick={login}>Enter Panel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div>
          <span className="admin-brand">My LifeChoices</span>
          <span className="admin-header-sep">|</span>
          <span className="admin-header-label">Admin Panel</span>
        </div>
        <button className="admin-logout-btn" onClick={logout}>Logout</button>
      </header>

      <div className="admin-tabs-bar">
        <button
          className={`admin-tab-btn ${tab === 'availability' ? 'active' : ''}`}
          onClick={() => setTab('availability')}
        >
          📅 Availability
        </button>
        <button
          className={`admin-tab-btn ${tab === 'bookings' ? 'active' : ''}`}
          onClick={() => setTab('bookings')}
        >
          📋 Bookings
          {bookings.length > 0 && <span className="bookings-count">{bookings.length}</span>}
        </button>
      </div>

      <div className="admin-content">

        {/* ── AVAILABILITY TAB ── */}
        {tab === 'availability' && (
          <div className="avail-section">
            <div className="avail-week-nav">
              <button className="week-arrow" onClick={() => setWeekOffset(o => o - 1)}>← Prev Week</button>
              <span className="week-range-label">
                {weekDates[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                {' – '}
                {weekDates[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <button className="week-arrow" onClick={() => setWeekOffset(o => o + 1)}>Next Week →</button>
            </div>

            <div className="avail-table-wrap">
              <table className="avail-table">
                <thead>
                  <tr>
                    <th className="avail-th day-col">Day</th>
                    {TIME_SLOTS.map(s => <th key={s} className="avail-th">{s}</th>)}
                    <th className="avail-th">Quick</th>
                  </tr>
                </thead>
                <tbody>
                  {weekDates.map(date => {
                    const dateStr = toDateStr(date)
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
                    const isToday = dateStr === todayStr
                    return (
                      <tr key={dateStr} className={isPast ? 'row-past' : ''}>
                        <td className={`avail-day-cell ${isToday ? 'is-today' : ''}`}>
                          <span className="day-name">{DAY_LABELS[date.getDay()]}</span>
                          <span className="day-num">{date.getDate()}</span>
                          {isToday && <span className="today-chip">Today</span>}
                        </td>
                        {TIME_SLOTS.map(slot => {
                          const enabled = isSlotEnabled(dateStr, slot)
                          return (
                            <td key={slot} className="avail-slot-cell">
                              <button
                                className={`slot-toggle-btn ${enabled ? 'on' : 'off'}`}
                                onClick={() => !isPast && toggleSlot(dateStr, slot)}
                                disabled={isPast}
                                title={enabled ? 'Click to disable' : 'Click to enable'}
                              >
                                {enabled ? '✓' : '✕'}
                              </button>
                            </td>
                          )
                        })}
                        <td className="avail-quick-cell">
                          <button className="quick-btn on-all" onClick={() => enableAll(dateStr)} disabled={isPast} title="Enable all">All On</button>
                          <button className="quick-btn off-all" onClick={() => disableAll(dateStr)} disabled={isPast} title="Disable all">All Off</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="avail-legend-row">
              <span className="legend-item"><span className="legend-dot on" />Enabled (bookable)</span>
              <span className="legend-item"><span className="legend-dot off" />Disabled (hidden from users)</span>
              <button className={`admin-primary-btn save-btn ${saved ? 'btn-saved' : ''}`} onClick={handleSave}>
                {saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {tab === 'bookings' && (
          <div className="bookings-section">
            <div className="bookings-header-row">
              <h3 className="bookings-title">All Bookings ({bookings.length})</h3>
              {bookings.length > 0 && (
                <button className="clear-btn" onClick={clearBookings}>Clear All</button>
              )}
            </div>

            {bookings.length === 0 ? (
              <div className="empty-bookings">
                <p>No bookings yet.</p>
                <span>When users book sessions, they'll appear here.</span>
              </div>
            ) : (
              <div className="bookings-grid">
                {[...bookings].reverse().map((b, i) => (
                  <div key={b.id || i} className="booking-card">
                    <div className="booking-card-top">
                      <span className="booking-name">{b.name}</span>
                      <span className={`booking-service-badge service-${b.service}`}>{b.service}</span>
                    </div>
                    <div className="booking-card-row">
                      <span>📧 {b.email}</span>
                    </div>
                    <div className="booking-card-row">
                      <span>📱 {b.phone}</span>
                    </div>
                    <div className="booking-card-row booking-datetime">
                      <span>📅 {b.date}</span>
                      <span>🕐 {b.slot}</span>
                    </div>
                    <div className="booking-submitted">
                      Submitted: {new Date(b.createdAt).toLocaleString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
