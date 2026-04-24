import { useState } from 'react'
import {MovieScreen} from './MovieScreen/MovieScreen'
//import MovieShowtimes from './movieshowtimes/movieshowtimes'
//import SeatPicker from './SeatPicker/SeatPicker';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      {/* <SeatPicker/> */}
     <MovieScreen/>
     {/* <MovieShowtimes/> */}
    </>
  )
}

export default App
