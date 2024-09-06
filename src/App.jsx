import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Photo from './components/Photo'
import PhotoContainer from './components/PhotoGrid'
import axios from 'axios'
import './App.css'

function App() {

  const [dateNow, setDate] = useState(processDate(new Date()));
  const [pictures, setPictures] = useState([]);
  const [answer, setAnswers] = useState([]);
  const [guess, setGuess] = useState(["","","","",""]);
  const [tries, setTries] = useState(3);
  const [correctGuess, setCorrectGuess] = useState(localStorage.getItem("guessState").split(",").map(e => Number(e)))

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
      if (localStorage.guessState.split(",")[i] == "1"){
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

    localStorage.setItem("guess", guess);
    localStorage.setItem("triesLeft", tries-1);

    setTries(tries - 1);

    if ((finalGuess[0] == answer[0]) && (finalGuess[1] == answer[1]) && (finalGuess[2] == answer[2]) && (finalGuess[3] == answer[3]) && (finalGuess[4] == answer[4])) {
      console.log("You're correct!");
      setCorrectGuess([1,1,1,1,1]);
      return;
    }else {
      console.log("You're wrong :(");
      const newGuess = correctGuess.map((elem, i) => {
        if (finalGuess[i] == answer[i]){
          return 1;
        }
  
        return 0;
      });
      localStorage.setItem("guessState", newGuess);
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
    localStorage.setItem("guess", ["","","","","",""]);
    localStorage.setItem("guessState", [false, false, false, false, false])
    return true;
  }

  

  if (localStorage.getItem("triesComplete") == "false"){
    return (
      <div className="h-screen mx-auto w-9/12 text-center">
        <h1>IRRIS Guessing Game</h1>
  
        <PhotoContainer>
          {pictures.map((picID, i) => {
            return <Photo key={picID} publicID={picID} num={i} guess={guess} updateGuess={setGuess} answerCheck={correctGuess} answer={answer}/>
          })}
        </PhotoContainer>
        
        <input className="bg-black text-white w-1/2 py-3 mt-5 rounded hover:bg-gray-500" type='submit' onClick={submitGuess} />
      </div>
      
    )
  }

  
}

export default App
