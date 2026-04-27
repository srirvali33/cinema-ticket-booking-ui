import { useState, useCallback } from 'react'
import './SeatPicker.css';

// ── Seat layout: 6 rows × 8 cols ──────────────────────────────────────────
// 0 = available, 1 = reserved, 2 = aisle gap
const LAYOUT = [
  [1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
]

const SEAT_PRICE = 40
const EVENT_DATE = 'Dec 21, 2023'
const EVENT_TIME = '5 pm'

// Give each seat a unique id
const buildSeats = () =>
  LAYOUT.map((row, r) =>
    row.map((type, c) => ({
      id: `${r}-${c}`,
      row: r,
      col: c,
      seatNumber: r * 8 + c + 1,
      status: type === 1 ? 'reserved' : 'available', // 1 = reserved
    }))
  )

export function SeatPicker(props) {
  const {onSeatSelection} = props;
  const [seats, setSeats] = useState(buildSeats)
  const [selectedId, setSelectedId] = useState(null)

  const selectedSeat = seats.flat().find((s) => s.id === selectedId) ?? null

  const handleSelect = useCallback(
    (seat) => {
      if (seat.status === 'reserved') return
      setSelectedId((prev) => (prev === seat.id ? null : seat.id))
    },
    []
  )

  const handleConfirm = () => {
    if (!selectedSeat) return
    alert(
      `✅ Reservation confirmed!\nSeat ${selectedSeat.seatNumber} · Row ${selectedSeat.row + 1} · Col ${selectedSeat.col + 1}\nTotal: $${SEAT_PRICE}`
    );
    onSeatSelection();

  }

  return (
    <div className="sp-shell">
      {/* ── cinematic glow backdrop ── */}
      <div className="sp-backdrop" aria-hidden="true">
        <div className="sp-glow sp-glow--tl" />
        <div className="sp-glow sp-glow--br" />
        <svg className="sp-mask-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="260" rx="170" ry="200" fill="rgba(120,10,10,0.18)" />
        </svg>
      </div>

   
    <div  className="sp-container" role="main">
        {/* Status bar */}
        <div className="sp-statusbar">
         
          <div className="sp-icons">
            <i className="bi bi-reception-4" />
            <i className="bi bi-wifi" />
            <i className="bi bi-battery-full" />
          </div>
        </div>

        {/* Header */}
        <div className="sp-header">
          <h1 className="sp-title">Choose a Seat</h1>
        </div>

        {/* Legend */}
        <div className="sp-legend">
          <LegendDot color="var(--seat-available)" label="Available" />
          <LegendDot color="var(--seat-reserved)" label="Reserved" />
          <LegendDot color="var(--seat-selected)" label="Selected" />
        </div>

        {/* Seat map */}
        <div className="sp-map-wrap">
          <div className="sp-map">
            {seats.map((row, r) => (
              <div key={r} className="sp-row">
                {row.map((seat) => {
                  const isSelected = seat.id === selectedId
                  const cls = [
                    'sp-seat',
                    `sp-seat--${isSelected ? 'selected' : seat.status}`,
                    seat.status === 'available' || isSelected ? 'sp-seat--clickable' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <button
                      key={seat.id}
                      className={cls}
                      onClick={() => handleSelect(seat)}
                      aria-label={`Seat ${seat.seatNumber}, ${isSelected ? 'selected' : seat.status}`}
                      aria-pressed={isSelected}
                      disabled={seat.status === 'reserved'}
                    >
                      <SeatIcon />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="sp-info">
          <InfoRow icon="calendar3">
            {EVENT_DATE} &bull; {EVENT_TIME}
          </InfoRow>
          <InfoRow icon="person">
            {selectedSeat
              ? `Row ${selectedSeat.row + 1} Column ${selectedSeat.col + 1} · Seat ${selectedSeat.seatNumber}`
              : 'No seat selected'}
          </InfoRow>
          <InfoRow icon="cart3">
            Total {selectedSeat ? `$${SEAT_PRICE}` : '$0'}
          </InfoRow>
        </div>

        {/* CTA */}
        <div className="sp-footer">
          <button
            className={`sp-confirm-btn ${!selectedSeat ? 'sp-confirm-btn--disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!selectedSeat}
          >
            Confirm Reservation
          </button>
        </div>

        {/* Home indicator */}
        <div className="sp-home-bar" aria-hidden="true" />
      </div>
      </div>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function SeatIcon() {
  return (
    <svg viewBox="0 0 32 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* back rest */}
      <rect x="4" y="2" width="24" height="18" rx="5" fill="#8b1a1a" opacity="0.9" />
      {/* seat cushion */}
      <rect x="2" y="18" width="28" height="10" rx="4" fill="#8b1a1a" />
      {/* legs */}
      <rect x="5" y="27" width="5" height="7" rx="2" fill="#8b1a1a" opacity="0.7" />
      <rect x="22" y="27" width="5" height="7" rx="2" fill="#8b1a1a" opacity="0.7" />
      {/* armrests */}
      <rect x="0" y="14" width="4" height="12" rx="2" fill="#8b1a1a" opacity="0.5" />
      <rect x="28" y="14" width="4" height="12" rx="2" fill="#8b1a1a" opacity="0.5" />
    </svg>
  )
}

function LegendDot({ color, label }) {
  return (
    <div className="sp-legend-item">
      <span className="sp-legend-dot" style={{ background: color }} />
      <span className="sp-legend-label">{label}</span>
    </div>
  )
}

function InfoRow({ icon, children }) {
  return (
    <div className="sp-info-row">
      <i className={`bi bi-${icon} sp-info-icon`} />
      <span className="sp-info-text">{children}</span>
    </div>
  )
}

export default SeatPicker;
