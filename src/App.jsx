import { useState } from 'react'
import MovieScreen from './moviescreen/moviescreen'
import MovieShowtimes from './movieshowtimes/movieshowtimes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <MovieScreen/>
     {/* <MovieShowtimes/> */}
    </>
  )
}

export default App
