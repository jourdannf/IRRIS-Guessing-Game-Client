import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Photo from './components/Photo'
import PhotoContainer from './components/PhotoContainer'
import axios from 'axios'
import './App.css'
import ComingSoonPage from './pages/ComingSoonPage'
import { data } from 'autoprefixer'

function App() {

  const [dateNow, setDate] = useState(processDate(new Date()));
  const [pictures, setPictures] = useState([]);
  const [answer, setAnswers] = useState([]);
  const [guess, setGuess] = useState(["","","","",""]);
  const [tries, setTries] = useState(localStorage.triesLeft);
  const [correctGuess, setCorrectGuess] = useState(localStorage.guessState ? JSON.parse(localStorage.getItem("guessState")) : []);
  const [freqArr, setFreqArr] = useState(localStorage.freqArr ? JSON.parse(localStorage.freqArr) : [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  const [dataAvail, setDataAvail] = useState(true);

  useEffect(() => {

    (async () => {
      const result = await axios.get(`https://irris-guessing-game-server.onrender.com/v1/puzzle/${new Date(dateNow).toISOString().split('T')[0]}`)
      if (result.status != 200) {
        setDataAvail(false);
      }else {
        const puzzle = result.data;

        setPictures(puzzle.answer.pictures);
        setAnswers(puzzle.answer.names);
      }
     
    })();
    
  }, []);
  
  //Function that adds to the frequency chart for each guess for each photo
  //Keeps track of the members you've already guessed for each photo
  function addFreq (arr) {
    const names = ["i.l", "liv", "yunseul", "nina", "nobody"];
    const finalResult = [];

    //Lopp through all the guesses for each photo
    for (let i = 0; i < guess.length; i ++) {
      //Loop through all the options for each photo
      const addedFreq = arr[i].map((e, j) => {
        if (names[j] == guess[i]) {
            return 1;
        }else {
            return e;
        }
      });

      finalResult.push(addedFreq);

    }

    console.log(finalResult);

    return finalResult

  }

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

    
    const historyArr = addFreq(freqArr);
    localStorage.freqArr = JSON.stringify(historyArr);
    setFreqArr(historyArr);

    localStorage.setItem("guess", JSON.stringify(guess));
    localStorage.setItem("triesLeft", tries-1);

    setTries(tries - 1);

    if ((finalGuess[0] == answer[0]) && (finalGuess[1] == answer[1]) && (finalGuess[2] == answer[2]) && (finalGuess[3] == answer[3]) && (finalGuess[4] == answer[4])) {
      console.log("You're correct!");
      setCorrectGuess(JSON.stringify([1,1,1,1,1]));
      localStorage.solved = true;
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
    localStorage.setItem("guessState", JSON.stringify([0,0,0,0,0]));
    localStorage.setItem("solved", false);
    localStorage.setItem("freqArr", JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]));
    return true;
  }

  

 
    return (
      dataAvail ?
        <div className="h-100 mx-auto w-9/12 text-center text-lg relative">
          <div className="relative top-1/2">
            <h1 className="relative top-10 text-5xl font-bold">IRRIS Guessing Game</h1>

            <h3 className="fixed right-5 top-5 font-semibold">Tries Left: {localStorage.triesLeft}</h3>

            <PhotoContainer>
              {pictures.map((picID, i) => {
                return <Photo key={picID} publicID={picID} num={i} guess={guess} updateGuess={setGuess} answerCheck={correctGuess} answer={answer} triesComplete={localStorage.triesComplete} freqArr={freqArr} />
              })}
            </PhotoContainer>

            <input className="bg-black text-white w-1/2 py-3 mt-5 rounded hover:bg-gray-500 hover:cursor-pointer" type='submit' onClick={submitGuess} />
          </div>
        
        </div>
        : <ComingSoonPage />
      
    )
  

  
}

export default App
