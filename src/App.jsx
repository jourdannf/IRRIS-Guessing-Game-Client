import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Photo from './components/Photo'
import PhotoContainer from './components/PhotoContainer'
import axios from 'axios'
import './App.css'
import ComingSoonPage from './pages/ComingSoonPage'
import WinnerPage from './pages/WinnerPage'
import LoserPage from './pages/LoserPage'
import { data } from 'autoprefixer'

import ilLogo from "./assets/il_lapis_lazuli.svg"
import livLogo from "./assets/liv_garnet.svg"
import ninaLogo from "./assets/nina_labradorite.svg"
import noneLogo from "./assets/none_logo.svg"
import yunseulLogo from "./assets/yunseul_rhodonite.svg"

function App() {

  const [dateNow, setDate] = useState(processDate(new Date()));
  const [pictures, setPictures] = useState([]);
  const [answer, setAnswers] = useState([]);
  const [guess, setGuess] = useState(JSON.parse(localStorage.getItem("guess")));
  const [tries, setTries] = useState(localStorage.triesLeft);
  const [correctGuess, setCorrectGuess] = useState(localStorage.guessState ? JSON.parse(localStorage.getItem("guessState")) : []);
  const [freqArr, setFreqArr] = useState(localStorage.freqArr ? JSON.parse(localStorage.freqArr) : [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  const [dataAvail, setDataAvail] = useState(true);
  const [showScore, setScore] = useState(localStorage.getItem("score"));
  const [showModal, setShowModal] = useState(true);

  

  useEffect(() => {

    (async () => {
      const result = await axios.get(`http://localhost:3001/v1/puzzle/${new Date(dateNow.replace(/-/g, '/')).toISOString().split('T')[0]}`)
        .catch((e) => {
          console.log(e);
        })

      if (!result) {
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

  function calcScore (guess, answer) {
    let score = 0;

    for (let i = 0; i < guess.length; i++){
      if (guess[i] == answer[i]){
        score += 1;
      }
    }

    return score;
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
    
    // const historyArr = addFreq(freqArr);
    // localStorage.freqArr = JSON.stringify(historyArr);
    // setFreqArr(historyArr);

    localStorage.setItem("guess", JSON.stringify(guess));
    localStorage.setItem("triesLeft", tries-1);

    setTries(tries - 1);

    if ((guess[0] == answer[0]) && (guess[1] == answer[1]) && (guess[2] == answer[2]) && (guess[3] == answer[3]) && (guess[4] == answer[4])) {
      console.log("You're correct!");
      console.log((answer[0]))
      console.log(answer)
      setCorrectGuess(JSON.stringify([1,1,1,1,1]));
      localStorage.solved = true;
      localStorage.guessState = JSON.stringify([1,1,1,1,1])
      localStorage.setItem("score", false)
      setScore("false");
      return;
    }else {
      if (localStorage.getItem("score") == "false"){
        console.log("It's false")
        localStorage.setItem("score", true);
        setScore("true");
      }

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
    localStorage.setItem("guess", JSON.stringify(["i.l","i.l","i.l","i.l","i.l"]));
    localStorage.setItem("guessState", JSON.stringify([0,0,0,0,0]));
    localStorage.setItem("solved", false);
    localStorage.setItem("freqArr", JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]));
    localStorage.setItem("score", false);
    return true;
  }

  const ans = JSON.parse(localStorage.getItem("guess"));

 
    return (

      dataAvail && localStorage.triesComplete == "false" ?
        <div className=" w-screen text-center text-lg relative h-full font-dosis">
          <div id="header" className={`bg-fuchsia-950 h-20 w-screen relative ${showModal ? "blur" : ""} flex justify-between px-12 place-items-center`}>
            <h1 className={`relative text-5xl font-bold text-left text-white hidden sm:block font-lilita`}>IRRISGUESS</h1>

            <div className="flex h-12 w-64 justify-end">
              <a className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 " href="https://github.com/jourdannf/IRRIS-Guessing-Game-Client/">
                <svg fill="#000000" width="35px" height="35px" viewBox="0 0 0.9 0.9" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M0.45 0.084a0.375 0.375 0 0 0 -0.119 0.731c0.019 0.003 0.026 -0.008 0.026 -0.018 0 -0.009 0 -0.038 0 -0.07 -0.094 0.017 -0.119 -0.023 -0.126 -0.044a0.137 0.137 0 0 0 -0.038 -0.053c-0.013 -0.007 -0.032 -0.024 0 -0.025a0.075 0.075 0 0 1 0.058 0.038 0.08 0.08 0 0 0 0.109 0.031 0.079 0.079 0 0 1 0.024 -0.05c-0.083 -0.009 -0.171 -0.042 -0.171 -0.185a0.146 0.146 0 0 1 0.038 -0.101 0.135 0.135 0 0 1 0.004 -0.099s0.031 -0.01 0.103 0.038a0.354 0.354 0 0 1 0.188 0c0.072 -0.049 0.103 -0.038 0.103 -0.038a0.135 0.135 0 0 1 0.004 0.099 0.145 0.145 0 0 1 0.038 0.101c0 0.144 -0.088 0.176 -0.171 0.185a0.089 0.089 0 0 1 0.025 0.069c0 0.05 0 0.09 0 0.103 0 0.01 0.007 0.022 0.026 0.018A0.375 0.375 0 0 0 0.45 0.084"/></svg>
              </a>
              
              <button type="button" className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 " onClick={() => setShowModal(!showModal)}>
                <svg width="30" height="30" viewBox="0 0 0.78 0.78" xmlns="http://www.w3.org/2000/svg"><path d="M0.375 0.075a0.3 0.3 0 1 0 0 0.6 0.3 0.3 0 0 0 0 -0.6m-0.265 0.035A0.375 0.375 0 1 1 0.64 0.64 0.375 0.375 0 0 1 0.11 0.11z" fill="#5C5F62"/><path d="M0.417 0.488H0.337V0.445c0 -0.074 0.018 -0.085 0.052 -0.104q0.005 -0.003 0.011 -0.007c0.027 -0.017 0.048 -0.039 0.048 -0.071 0 -0.036 -0.028 -0.059 -0.062 -0.059 -0.032 0 -0.062 0.015 -0.064 0.057H0.236c0.002 -0.086 0.07 -0.131 0.15 -0.131 0.086 0 0.146 0.054 0.146 0.131 0 0.052 -0.026 0.086 -0.068 0.111l-0.009 0.005c-0.03 0.018 -0.038 0.023 -0.038 0.067zm0.006 0.075a0.05 0.05 0 0 1 -0.05 0.05 0.05 0.05 0 0 1 -0.046 -0.069 0.05 0.05 0 0 1 0.046 -0.03c0.027 0 0.05 0.022 0.05 0.049z" fill="#5C5F62"/></svg>
              </button>

              <button type="button" className="border-neutral-800  rounded-3xl border-2 text-center text-sm font-semibold p-4">
                Support Me
              </button>
            </div>
            

            <h3 className={`absolute right-5 sm:right-12 top-28 font-semibold ${showModal ? "blur" : ""} text-lg sm:text-2xl`}>Tries Left: {localStorage.triesLeft}</h3>
          </div>  


          <div className="flex-col mx-auto sm:w-9/12 relative h-[calc(100vh-80px)] place-content-center">

            <PhotoContainer showModal={showModal}>
              {pictures.map((picID, i) => {
                return <Photo key={picID} publicID={picID} num={i} guess={guess} updateGuess={setGuess} answerCheck={correctGuess} answer={answer} triesComplete={localStorage.triesComplete} freqArr={freqArr} />
              })}
            </PhotoContainer>

            {showScore == "true" && 
            <div className={`bg-red-100 mt-5 mx-auto h-14 w-3/4 sm:w-1/2 rounded font-bold ${showModal ? "blur" : ""} place-items-center flex justify-center text-base sm:text-lg`}>
              You've only guessed {(ans[0] == answer[0]) + (ans[1] == answer[1]) + (ans[2] == answer[2]) + (ans[3] == answer[3]) + (ans[4] == answer[4])}/5 correctly. Try again!
            </div>
            }

            <input className={`bg-black text-white w-3/4 sm:w-1/2 py-3 mt-5 rounded hover:bg-gray-500 hover:cursor-pointer ${showModal ? "blur": ""} mb-10 sm:mb-0 text-lg font-bold`} type='submit' onClick={submitGuess} />

          </div>
          

          {/* Modal Wrapper */}

          <div className={`fixed z-10 inset-0 ${showModal ? "" : "hidden"}`}  >
            <div className="flex itmes-center justify-center bg-gray-500 bg-opacity-75 transition-all h-screen place-items-center w-screen" onClick={() => setShowModal(!showModal)}>

              {/* Modal Box */}
              <div className="bg-white px-10 rounded text-left text-sm h-3/4 relative w-screen sm:w-[447px] sm:h-[500px] overflow-scroll" onClick={e => e.stopPropagation()}>

                <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-529 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute right-2 top-2" onClick={() => setShowModal(!showModal)}>
                  <span className="sr-only">Close menu</span>
                  {/* Heroicon name: outline/x */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                
                <h2 className="text-3xl mb-2 mt-20 font-lilita">HOW TO PLAY</h2>

                <p className='text-base'>View the photos.</p>
                <p className='text-base'>Guess the IRRIS member featured in each photo using the picture key based off their representative stones below.</p>
                <p className='text-base'>Submit your answer.</p>
                <p className='text-base'>You get three tries.</p>

                <br/>

                <h3 className="text-3xl mb-2 mt-9 font-lilita">PICTURE KEY</h3>

                <div className='flex flex-wrap'>
                  <div className='text-xl w-28'><img src={ilLogo} alt="" width="40px" className='inline' /> I.L </div>
                  <div className='text-xl w-28'><img src={livLogo} alt="" width="40px" className="inline" /> Liv </div>
                  <div className='text-xl w-28'><img src={yunseulLogo} alt="" width="40px" className="inline" /> Yunseul </div>
                  <div className='text-xl w-28'><img src={ninaLogo} alt="" width="40px" className="inline" /> Nina </div>
                  <div className='text-xl w-28'><img src={ninaLogo} alt="" width="40px" className="inline" /> Neither </div>
                  
                  
                  
                </div>
                
                
              </div>
            </div>
          </div>
        
        </div>
        : !dataAvail ? <ComingSoonPage /> :

        localStorage.solved == "true" ? <WinnerPage /> : <LoserPage />
      
    )
  

  
}

export default App
