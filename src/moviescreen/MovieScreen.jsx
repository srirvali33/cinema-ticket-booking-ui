import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieScreen.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
`;

const TABS = ["All", "Sci-Fi", "Action", "Drama", "Crime", "Animation", "Thriller"];


const MOVIES= [

  {
    "id": 1,
    "title": "Inception",
    "genre": "Sci-Fi",
    "director": "Christopher Nolan",
    "durationMinutes": 148,
    "rating": "PG-13",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    "description": "A thief who steals corporate secrets through dream-sharing technology."
  },
  {
    "id": 2,
    "title": "The Dark Knight",
    "genre": "Action",
    "director": "Christopher Nolan",
    "durationMinutes": 152,
    "rating": "PG-13",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    "description": "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy."
  },
  {
    "id": 3,
    "title": "Interstellar",
    "genre": "Sci-Fi",
    "director": "Christopher Nolan",
    "durationMinutes": 169,
    "rating": "PG-13",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    "description": "Explorers travel through a wormhole in search of a new home for humanity."
  },
  {
    "id": 4,
    "title": "The Godfather",
    "genre": "Drama",
    "director": "Francis Ford Coppola",
    "durationMinutes": 175,
    "rating": "R",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    "description": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
  },
  {
    "id": 5,
    "title": "Pulp Fiction",
    "genre": "Crime",
    "director": "Quentin Tarantino",
    "durationMinutes": 154,
    "rating": "R",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMjAzNzAxNzYwMV5BMl5BanBnXkFtZTYwMzE2Mjk2._V1_.jpg",
    "description": "The lives of two mob hitmen, a boxer, and others intertwine in Los Angeles."
  },
  {
    "id": 6,
    "title": "Avatar",
    "genre": "Sci-Fi",
    "director": "James Cameron",
    "durationMinutes": 162,
    "rating": "PG-13",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMDg5MjRkNWEtYmU1Mi00MTExLTk5MDQtY2RiMWVkZWNiOThjXkEyXkFqcGc@._V1_.jpg",
    "description": "A paraplegic marine on Pandora falls in love with a native alien and joins her people."
  },
  {
    "id": 7,
    "title": "The Lion King",
    "genre": "Animation",
    "director": "Roger Allers",
    "durationMinutes": 88,
    "rating": "G",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    "description": "A young lion prince flees his kingdom only to learn the true meaning of responsibility."
  },
  {
    "id": 8,
    "title": "Avengers: Endgame",
    "genre": "Action",
    "director": "Russo Brothers",
    "durationMinutes": 181,
    "rating": "PG-13",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMDg5MjRkNWEtYmU1Mi00MTExLTk5MDQtY2RiMWVkZWNiOThjXkEyXkFqcGc@._V1_.jpg",
    "description": "The Avengers assemble once more to reverse the actions of Thanos."
  },
  {
    "id": 9,
    "title": "Parasite",
    "genre": "Thriller",
    "director": "Bong Joon-ho",
    "durationMinutes": 132,
    "rating": "R",
    "language": "Korean",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMDg5MjRkNWEtYmU1Mi00MTExLTk5MDQtY2RiMWVkZWNiOThjXkEyXkFqcGc@._V1_.jpg",
    "description": "Greed and class discrimination threaten a poor family when they scheme into a wealthy household."
  },
  {
    "id": 10,
    "title": "Dune",
    "genre": "Sci-Fi",
    "director": "Denis Villeneuve",
    "durationMinutes": 155,
    "rating": "PG-13",
    "language": "English",
    "releaseDate": null,
    "emoji": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    "description": "A noble family becomes embroiled in a war over the galaxy most valuable asset."
  }
]

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

      <img src={movie.emoji} alt={movie.title} style={{ width: "306px", height: "406px", objectFit: "cover" }} />
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

export function MovieScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  

  if (MOVIES.length === 0) {
    return <div>Loading...</div>;
  }

  const filtered =
    activeTab === "All"
      ? MOVIES
      : MOVIES.filter((m) => m.genre === activeTab);

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
        <div className="filter-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Movie Grid ── */}
        <div className="movie-grid">

          {displayed.length>0 && displayed.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrap">
                <PosterPlaceholder movie={movie} />
                <div className="poster-overlay" />
                <span className={`rating-badge ${getRatingClass(movie.rating)}`}>
                  {movie.rating}
                </span>
              </div>
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-genre">{movie.genre}</div>
              </div>
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
                <PosterPlaceholder movie={movie} />
                <div className="poster-overlay" />
                <span className={`rating-badge ${getRatingClass(movie.rating)}`}>
                  {movie.rating}
                </span>
              </div>
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-genre">{movie.genre}</div>
              </div>
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
        <nav className="bottom-nav">
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
        </nav>
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