import { useState } from "react";
import "./MovieTimes.css";

/* ─── data ───────────────────────────────────────────────────────── */
const DATES = [
  { label: "Today", day: "23", dow: "" },
  { label: "Fri", day: "24", dow: "Fri" },
  { label: "Sat", day: "25", dow: "Sat" },
  { label: "Sun", day: "26", dow: "Sun" },
  { label: "Mon", day: "27", dow: "Mon" },
  { label: "Tue", day: "28", dow: "Tue" },
  { label: "Wed", day: "29", dow: "Wed" },
  { label: "Thu", day: "30", dow: "Thu" },
  { label: "May", day: "1",  dow: "May", faded: true },
  { label: "Sat", day: "2",  dow: "Sat",  faded: true },
  { label: "Sun", day: "3",  dow: "Sun",  faded: true },
];

const THEATERS = [
  {
    id: 1,
    name: "Regal Crossroads – Bellevue",
    address: "1200 156th Avenue NE (0.59mi)",
    formats: [
      {
        label: "Standard",
        times: ["10:15 AM", "12:45 PM", "3:20 PM", "6:00 PM", "8:35 PM"],
      },
      {
        label: "IMAX",
        times: ["11:00 AM", "2:00 PM", "5:10 PM", "8:20 PM"],
      },
    ],
  },
  {
    id: 2,
    name: "Regal Bella Bottega",
    address: "8890 NE 161st Avenue (4.49mi)",
    formats: [
      {
        label: "Standard",
        times: ["10:00 AM", "12:30 PM", "3:00 PM", "5:45 PM", "8:15 PM"],
      },
    ],
  },
  {
    id: 3,
    name: "Regal Issaquah Highlands",
    address: "940 NE Park Drive (7.83mi)",
    formats: [
      {
        label: "Standard",
        times: ["11:15 AM", "1:50 PM", "4:30 PM", "7:05 PM"],
      },
      {
        label: "RPX",
        times: ["12:00 PM", "3:10 PM", "6:20 PM", "9:00 PM"],
      },
    ],
  },
  {
    id: 4,
    name: "AMC Factoria 8",
    address: "3505 Factoria Blvd SE (3.1mi)",
    formats: [
      {
        label: "Standard",
        times: ["10:30 AM", "1:10 PM", "3:50 PM", "6:30 PM", "9:10 PM"],
      },
      {
        label: "Dolby Cinema",
        times: ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
      },
    ],
  },
  {
    id: 5,
    name: "Cinemark Lincoln Square",
    address: "700 Bellevue Way NE (1.2mi)",
    formats: [
      {
        label: "Standard",
        times: ["9:45 AM", "12:15 PM", "2:50 PM", "5:25 PM", "8:00 PM"],
      },
      {
        label: "XD",
        times: ["10:45 AM", "1:45 PM", "4:45 PM", "7:45 PM"],
      },
    ],
  },
  {
    id: 6,
    name: "AMC Kirkland 6",
    address: "293 Central Way (6.4mi)",
    formats: [
      {
        label: "Standard",
        times: ["10:00 AM", "12:40 PM", "3:15 PM", "5:55 PM", "8:35 PM"],
      },
    ],
  },
];

/* ─── icons (inline SVG to avoid deps) ──────────────────────────── */
const IconYT = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.7 12 21.7 12 21.7s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
  </svg>
);
const IconPin = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
  </svg>
);
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconCal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

/* ─── helpers ────────────────────────────────────────────────────── */
function parseTime(t) {
  const [time, period] = t.split(" ");
  const [h, m] = time.split(":").map(Number);
  return { h, m, period };
}
function renderTime(t) {
  const { h, m, period } = parseTime(t);
  return (
    <>
      {h}:{String(m).padStart(2, "0")}
      <span className="smg-ampm">{period}</span>
    </>
  );
}

/* ─── component ──────────────────────────────────────────────────── */
export function MovieTimes(props) {
  const {onMovieShowtimesSelection} = props;
  const [activeDate, setActiveDate] = useState(0);
  const [activeTab, setActiveTab] = useState("showtimes");
  const [selectedTime, setSelectedTime] = useState(null); // "theaterId-formatIdx-timeIdx"

  const handleTime = (key) =>{
    setSelectedTime((prev) => (prev === key ? null : key));
    onMovieShowtimesSelection();
  }
    


  return (
    <div className="smg-root">

      {/* ── HERO ── */}
      <div className="smg-hero d-flex gap-4 align-items-end">
        {/* Poster placeholder (gradient + text since no img asset) */}
        <div
          className="smg-poster d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            height: 220,
            background: "linear-gradient(135deg,#4a1a8a,#c0392b,#f39c12)",
            borderRadius: 10,
          }}
          
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 900,
              fontSize: "0.9rem",
              textAlign: "center",
              color: "#fff",
              padding: 8,
              textShadow: "0 2px 6px rgba(0,0,0,.6)",
            }}
          >
            <img src="https://m.media-amazon.com/images/M/MV5BMDg5MjRkNWEtYmU1Mi00MTExLTk5MDQtY2RiMWVkZWNiOThjXkEyXkFqcGc@._V1_.jpg" height={"230px"} width={"162px"}/>
          </span>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="smg-badge">PG</span>
            <span className="smg-meta">1HR 38MINS</span>
          </div>
          <h1 className="smg-title">The Super Mario Galaxy Movie</h1>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="smg-tabs d-flex">
        {["showtimes", "details"].map((t) => (
          <button
            key={t}
            className={`smg-tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "showtimes" && (
        <>
          {/* ── DATES ── */}
          <div className="smg-dates">
            {DATES.map((d, i) => (
              <button
                key={i}
                className={`smg-date-btn ${activeDate === i ? "active" : ""} ${d.faded ? "faded" : ""}`}
                onClick={() => setActiveDate(i)}
              >
                {d.label}
                <span className="smg-date-num">{d.day}</span>
              </button>
            ))}
            <button className="smg-select-day">Select<br />Day</button>
          </div>

          {/* ── THEATER CARDS ── */}
          <div className="smg-theaters" onClick={() => onSeatSelection()}>
            {THEATERS.map((theater) => (
              <div key={theater.id} className="smg-theater-card">
                <div className="smg-theater-name">{theater.name}</div>
                <div className="smg-theater-addr">
                  <IconPin size={12} />
                  {theater.address}
                </div>

                {theater.formats.map((fmt, fi) => (
                  <div key={fi}>
                    {theater.formats.length > 1 && (
                      <div className="smg-format-label">{fmt.label}</div>
                    )}
                    <div className="smg-times">
                      {fmt.times.map((t, ti) => {
                        const key = `${theater.id}-${fi}-${ti}`;
                        return (
                          <button
                            key={ti}
                            className={`smg-time-btn ${selectedTime === key ? "selected" : ""}`}
                            onClick={() => handleTime(key)}
                          >
                            {renderTime(t)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "details" && (
        <div style={{ padding: "32px", color: theme.textMuted, maxWidth: 700 }}>
          <h2
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700,
              fontSize: "1.4rem",
              color: "#fff",
              marginBottom: 12,
            }}
          >
            About the Film
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            Mario and Luigi are back for an out-of-this-world adventure as they
            blast off through the cosmos to rescue Princess Peach from the
            clutches of Bowser, who has discovered a legendary power source hidden
            deep within a distant galaxy.
          </p>
          <p style={{ lineHeight: 1.7, marginTop: 12 }}>
            <strong style={{ color: "#ccc" }}>Rating:</strong> PG &nbsp;·&nbsp;
            <strong style={{ color: "#ccc" }}>Runtime:</strong> 1hr 38mins &nbsp;·&nbsp;
            <strong style={{ color: "#ccc" }}>Genre:</strong> Animation, Adventure, Comedy
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieTimes;
