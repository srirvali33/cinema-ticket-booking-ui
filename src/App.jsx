import { useState } from 'react'
import MovieScreen from './moviescreen/moviescreen'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <MovieScreen/>
    </>
  )
}

export default App
