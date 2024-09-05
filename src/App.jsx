import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Photo from './components/Photo'
import axios from 'axios'
import './App.css'

function App() {

  const [date, setDate] = useState(new Date());
  const [pictures, setPictures] = useState([]);
  const [answer, setAnswers] = useState([]);
  const [guess, setGuess] = useState([]);

  useEffect(() => {

    (async () => {
      const result = await axios.get(`http://localhost:3001/v1/puzzle/${date.toISOString().split('T')[0]}`)
      const puzzle = result.data;

      setPictures(puzzle.answer.pictures);
      setAnswers(puzzle.answer.names);
    })();
    
  }, [date])

  function onSubmit (e) {
    e.preventDefault();

    if ((guess[0] == answer[0]) && (guess[1] == answer[1]) && (guess[2] == answer[2]) && (guess[3] == answer[3]) && (guess[4] == answer[4])) {
      console.log("You're correct!")
    }

    console.log("You're wrong :(")
  }


  return (
    <>
      <h1>IRRIS Guessing Game</h1>

      {pictures.map((picLink, i) => {
        return <Photo key={i} link={picLink} num={i+1} guess={guess} />
      })}
      <Photo />
      <br />
      <input type='submit' />
    </>
    
  )
}

export default App
