import { useState, useCallback } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Margin, usePDF } from 'react-to-pdf';
import { Container, Row, Col, Button } from 'react-bootstrap'
import './DigitalTicket.css';

/* ── Ticket decoration: scalloped edge as SVG ──── */
const ScallopEdge = ({ flip = false, color = '#f5f0eb' }) => (
  <svg
    viewBox="0 0 300 16"
    preserveAspectRatio="none"
    style={{ display: 'block', width: '100%', height: 16, transform: flip ? 'scaleY(-1)' : 'none' }}
    aria-hidden="true"
  >
    <path
      d={Array.from({ length: 20 }, (_, i) => {
        const x = i * 15
        return `M${x},0 Q${x + 7.5},16 ${x + 15},0`
      }).join(' ')}
      fill={color}
    />
  </svg>
)

/* ── SVG Barcode (decorative) ──────────────────── */
const Barcode = () => {
  const bars = [
    3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 1, 1, 4, 1, 2, 3, 1,
    2, 1, 4, 1, 1, 2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 2, 1, 1, 3,
    2, 4, 1, 1, 2, 3, 1, 1, 2, 1, 4, 1, 2, 1, 3, 1, 1, 2, 1, 4,
  ]
  let cx = 0
  return (
    <svg viewBox="0 0 200 60" style={{ width: '100%', height: 60 }} aria-label="Barcode">
      {bars.map((w, i) => {
        const x = cx
        cx += w + 1
        return i % 2 === 0
          ? <rect key={i} x={x} y={4} width={w} height={52} fill="#111" />
          : null
      })}
    </svg>
  )
}

/* ── Cinema poster art (SVG abstract) ─────────── */
const PosterArt = () => (
  <svg
    viewBox="0 0 300 220"
    style={{ display: 'block', width: '100%', height: '100%' }}
    aria-hidden="true"
  >
  </svg>
)

/* ── Icons ─────────────────────────────────────── */
const IconHome = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
)

const IconDownload = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v12M7 11l5 5 5-5" />
    <path d="M4 20h16" />
  </svg>
)

/* ── Main DigitalTicket component ──────────────── */
export default function DigitalTicket() {
  const [downloaded, setDownloaded] = useState(false)
  const [ripple, setRipple]         = useState(false)

  const handleDownload = useCallback(() => {
    setRipple(true)
    setTimeout(() => setRipple(false), 600)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }, []);

  const { toPDF, targetRef } = usePDF({
    filename: 'ticket.pdf',
    page: { margin: Margin.MEDIUM, size: 'landscape' },
  });

  return (
    <div className="app-shell" ref={targetRef}>
     
        {/* Status bar */}
       
        {/* Screen content */}
        <div className="screen-content">

          {/* Page title */}
          <h1 className="page-title">Digital Ticket</h1>

          {/* Confirmation message */}
          <p className="confirmation-msg">
            Your Reservation has been made.
          </p>

          {/* ── Ticket ───────────────────────────── */}
          <div className="ticket-wrapper">
            <article className="ticket" aria-label="Event ticket">

              {/* Top stub */}
              <div className="ticket-top">
                
                <div className="ticket-info">
                  <p className="ticket-detail">Date: Dec 21 | Time: 5 pm</p>
                  <p className="ticket-detail">Row 4 Column 8 | Seat 10</p>
                </div>
                <div className="tear-line">
                </div>
              </div>

              <div className="ticket-bottom">
                <div className="barcode-area">
                  <Barcode />
                </div>
              </div>

            </article>
          </div>

          {/* ── Download section ─────────────────── */}
          <div className="download-section">
            <span className="download-label">
              {downloaded ? 'Downloaded!' : 'Download PDF'}
            </span>
            <button
              className={`download-btn${ripple ? ' ripple' : ''}`}
              onClick={(e) => toPDF(e) && handleDownload()}
              aria-label="Download PDF ticket"
            >
              <IconDownload />
            </button>
          </div>

        </div>
      </div>
   
  )
}
