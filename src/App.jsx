import { useState } from 'react'
import {MovieScreen} from './moviescreen/MovieScreen'
import MovieTimes from './MovieTimes/MovieTimes';
import SeatSelection from './SeatSelection/SeatSelection';
import {DigitalTicket} from './digitalticket/DigitalTicket';
import './App.css';
import { usePageSelection } from './store/pagestore';

function App() {

 const page = usePageSelection((state) => state.selectedPage);
 const changePage = usePageSelection((state) => state.updateSelectedPage);
 const [selectedMovie, setSelectedMovie] = useState(null);
 const [selectedSeat, setSelectedSeat] = useState(null);


 function handlePageChange(newPage) {
  changePage(newPage);
 }

 switch (page) {
  case 'home':
  return <MovieScreen onMovieSelection={(movie) => {setSelectedMovie(movie); handlePageChange("movieshowtimes")}} />
  case 'seatpicker':
  return <SeatSelection onSeatSelection={(seat) => {setSelectedSeat(seat); handlePageChange("digitalticket")}} />
  case 'movieshowtimes':
  return<MovieTimes selectedMovie={selectedMovie} onMovieShowtimesSelection={() => {handlePageChange("seatpicker")}} />
  case 'digitalticket':
  return <DigitalTicket selectedSeat={selectedSeat} />
  default:
  return <MovieScreen onMovieSelection={() => handlePageChange("movieshowtimes")} />
 }
}
export default App;
