import { useState } from 'react'
import {MovieScreen} from './moviescreen/MovieScreen'
import {MovieShowTimes} from './movieshowtimes/MovieShowTimes'
import {SeatPicker} from './seatpicker/SeatPicker';
import {DigitalTicket} from './digitalticket/DigitalTicket';
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
  return<MovieShowTimes onMovieShowtimesSelection={() => {handlePageChange("seatpicker")}} />
  case 'digitalticket':
  return <DigitalTicket/>
  default:
  return <MovieScreen onMovieSelection={() => handlePageChange("movieshowtimes")} />
 }
}
export default App;
