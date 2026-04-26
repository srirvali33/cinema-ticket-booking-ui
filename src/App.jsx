import { useState } from 'react'
import {MovieScreen} from './moviescreen/MovieScreen'
//import MovieShowtimes from './movieshowtimes/movieshowtimes'
//import SeatPicker from './SeatPicker/SeatPicker';
import DigitalTicket from './digitalticket/DigitalTicket.jsx';
import './App.css'

function App() {
  return (
    <>
      {/* <SeatPicker/> */}
     {/* <MovieScreen/> */}
     {/* <MovieShowtimes/> */}
     <DigitalTicket />
    </>
  )
}

export default App
