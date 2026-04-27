import { useState } from 'react'
import {MovieScreen} from './moviescreen/MovieScreen'
import MovieShowtimes from './movieshowtimes/MovieShowtimes.jsx'
import {SeatPicker} from './seatpicker/SeatPicker.jsx';
import {DigitalTicket} from './digitalticket/DigitalTicket.jsx';
import './App.css';
import { usePageSelection } from './store/pagestore';

function App() {

 const page = usePageSelection((state) => state.selectedPage);
 const changePage = usePageSelection((state) => state.updateSelectedPage);


 function handlePageChange(newPage) {
  changePage(newPage);
 }

 switch (page) {
  case 'home':
  return <MovieScreen onMovieSelection={() => {handlePageChange("movieshowtimes")}} />
  case 'seatpicker':
  return <SeatPicker onSeatSelection={() => {handlePageChange("digitalticket")}} />
  case 'movieshowtimes':
  return<MovieShowtimes onMovieShowtimesSelection={() => {handlePageChange("seatpicker")}} />
  case 'digitalticket':
  return <DigitalTicket/>
  default:
  return <MovieScreen onMovieSelection={() => handlePageChange("movieshowtimes")} />
 }
}
export default App;
