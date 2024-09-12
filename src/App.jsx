import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Photo from './components/Photo'
import PhotoContainer from './components/PhotoContainer'
import axios from 'axios'
import './App.css'

function App() {

  console.log(JSON.parse(localStorage.getItem("guessState")))

  const [dateNow, setDate] = useState(processDate(new Date()));
  const [pictures, setPictures] = useState([]);
  const [answer, setAnswers] = useState([]);
  const [guess, setGuess] = useState(["","","","",""]);
  const [tries, setTries] = useState(localStorage.triesLeft);
  const [correctGuess, setCorrectGuess] = useState(JSON.parse(localStorage.getItem("guessState")))
  const [solved, setSovled] = useState(localStorage.solved)
  

  useEffect(() => {

    (async () => {
      const result = await axios.get(`http://localhost:3001/v1/puzzle/${new Date(dateNow).toISOString().split('T')[0]}`)
      const puzzle = result.data;

      setPictures(puzzle.answer.pictures);
      setAnswers(puzzle.answer.names);
    })();
    
  }, [])

  function submitGuess (e) {
    e.preventDefault();

    if (localStorage.getItem("triesComplete") == "true"){
      console.log("You can no longer guess :(");
      return;
    }

    const finalGuess = guess.map((e, i) => {
      if (JSON.parse(localStorage.guessState)[i] == "1"){
        return answer[i];
      }

      return e;
    });

    if (finalGuess.includes("")) {
      console.log("You haven't answered everything yet");
      return;
    }

    if (localStorage.getItem("triesLeft") == 1){
      localStorage.setItem("triesComplete", true);
    }

    localStorage.setItem("guess", JSON.stringify(guess));
    localStorage.setItem("triesLeft", tries-1);

    setTries(tries - 1);

    if ((finalGuess[0] == answer[0]) && (finalGuess[1] == answer[1]) && (finalGuess[2] == answer[2]) && (finalGuess[3] == answer[3]) && (finalGuess[4] == answer[4])) {
      console.log("You're correct!");
      setCorrectGuess(JSON.stringify([1,1,1,1,1]));
      localStorage.solved = true;
      setSovled(true);
      localStorage.guessState = JSON.stringify([1,1,1,1,1])
      return;
    }else {
      console.log("You're wrong :(");
      const newGuess = correctGuess.map((elem, i) => {
        if (finalGuess[i] == answer[i]){
          return 1;
        }
  
        return 0;
      });
      localStorage.setItem("guessState", JSON.stringify(newGuess));
      setCorrectGuess(newGuess);
    }

  }

  function processDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  
  if (localStorage.getItem("date") != dateNow) {
    localStorage.setItem("date", dateNow);
    localStorage.setItem("triesComplete", false);
    localStorage.setItem("triesLeft", 3);
    localStorage.setItem("guess", JSON.stringify(["","","","","",""]));
    localStorage.setItem("guessState", JSON.stringify([false, false, false, false, false]));
    localStorage.setItem("solved", false);
    return true;
  }

  

 
    return (
      <div className="h-screen mx-auto w-9/12 text-center">
        <h1>IRRIS Guessing Game</h1>

        <h3>Tries Left: {localStorage.triesLeft}</h3>
  
        <PhotoContainer>
          {pictures.map((picID, i) => {
            return <Photo key={picID} publicID={picID} num={i} guess={guess} updateGuess={setGuess} answerCheck={correctGuess} answer={answer} triesComplete={localStorage.triesComplete}/>
          })}
        </PhotoContainer>
        
        <input className="bg-black text-white w-1/2 py-3 mt-5 rounded hover:bg-gray-500" type='submit' onClick={submitGuess} />
      </div>
      
    )
  

  
}

export default App
