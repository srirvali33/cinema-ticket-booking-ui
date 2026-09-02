import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieScreen.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
`;

const TABS = ["All", "Sci-Fi", "Action", "Drama", "Crime", "Animation", "Thriller"];


const NAV = [
  { icon: "🎬", label: "Movies" },
  { icon: "🎟️", label: "Tickets" },
  { icon: "🔖", label: "Saved" },
  { icon: "👤", label: "Profile" },
];

function getRatingClass(r) {
  if (r >= 8) return "top";
  if (r >= 7) return "high";
  if (r >= 6) return "mid";
  return "low";
}

function PosterPlaceholder({ movie }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: movie.gradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >

      <img src={movie.image} alt={movie.title} style={{ width: "306px", height: "406px", objectFit: "cover" }}/>
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          textAlign: "center",
          padding: "0 12px",
        }}
      >
        {movie.title}
      </span>
    </div>
  );
}

export function MovieScreen(props) {
  const {onMovieSelection} = props;
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movielist, setMovieList]= useState([]);

  
  useEffect(()=>{

    fetch("https://cinema-booking-api-f19p.onrender.com/api/movies/movielist").then((data)=>data.json())
    .then((data)=>setMovieList(data))
  },[])

  if (movielist.length === 0) {
    return <div>It might take few seconds to minutes.Please wait for a while...</div>;
  }

  const filtered =
    activeTab === "All"
      ? movielist
      : movielist.filter((m) => m.genre === activeTab);

  const displayed = searchQuery
    ? filtered.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : filtered;

  return (
    <>
      <style>{styles}</style>

      <div className="cinema-app">
        {/* ── Header ── */}
        <header className="app-header">
          <div className="logo-box">🎬</div>

          <div className="lang-pill">
            <span style={{ fontSize: "13px" }}>🌐</span>
            Eng
          </div>

          <div className="header-spacer" />

          <button className="login-btn">Log in</button>
        </header>

        {/* ── Section Header ── */}
        <div className="section-header">
          <h1 className="section-title">Now in Theatres</h1>
          <button className="search-btn" onClick={() => setShowSearch(true)}>
            🔍
          </button>
        </div>

        {/* ── Filter Tabs ── */}
        {/* <div className="filter-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* ── Movie Grid ── */}
        <div className="movie-grid">

          {displayed.length>0 && displayed.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrap" onClick={() => onMovieSelection(movie)}>
                <PosterPlaceholder movie={movie} />
                <div className="poster-overlay" />
                <span className={`rating-badge ${getRatingClass(movie.rating)}`}>
                  {movie.rating}
                </span>
              </div>
              {/* <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-genre">{movie.genre}</div>
              </div> */}
            </div>

            
          ))}

          {displayed.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "40px 0",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              No movies found
            </div>
          )}

        </div>



        {/* ── Movie Grid ── */}
        <div>Upcoming movies</div>
        <div className="movie-grid">

          {displayed.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrap">
                <PosterPlaceholder movie={movie}  />
                <div className="poster-overlay" />
                <span className={`rating-badge ${getRatingClass(movie.rating)}`}>
                  {movie.rating}
                </span>
              </div>
              {/* <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-genre">{movie.genre}</div>
              </div> */}
            </div>     
          ))}

          {displayed.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "40px 0",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              No movies found
            </div>
          )}
        </div>

        {/* ── Bottom Nav ── */}
        {/* <nav className="bottom-nav">
          {NAV.map((item, i) => (
            <div
              key={i}
              className={`nav-item ${activeNav === i ? "active" : ""}`}
              onClick={() => setActiveNav(i)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {activeNav === i && <div className="nav-dot" />}
            </div>
          ))}
        </nav> */}
      </div>

      {/* ── Search Overlay ── */}
      {showSearch && (
        <div
          className="search-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSearch(false);
          }}
        >
          <div className="search-box">
            <input
              autoFocus
              className="search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="search-close"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieScreen;
