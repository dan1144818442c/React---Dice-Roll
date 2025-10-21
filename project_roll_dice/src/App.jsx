import React, { useState , useId }  from 'react';
import StartScreen from './components/startScreen';
import  Game from './components/Game';
import './App.css'




export default function App() {
  const [started, setStarted] = useState(false);
  const [targetScore, setTargetScore] = useState(0);
  const [winsPlayer1 , setWinsPlayer1] = useState(0)
  const [winsPlayer2 , setWinsPlayer2] = useState(0)
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const id1 = useId();
  const id2 = useId();

  const handleStart = (score) => {
    setTargetScore(score);
    setStarted(true);
  };
  const handlRestart = () =>{
    setTargetScore(0)
    setStarted(false)
  }
  const resetAllGame = () =>{
    setWinsPlayer1(0)
    setWinsPlayer2(0)
    localStorage.removeItem(`Number of wins player ${id1}`);
    localStorage.removeItem(`Number of wins player ${id2}`);

    handlRestart()
  }
  return started ?
   <Game 
   targetScore={targetScore}
   onRestart = {handlRestart}
   resetAllGame = {resetAllGame}
   player1Name={player1Name}
   player2Name={player2Name}
   player1Id = {id1}
   player2Id = {id2} 
   setPlayer1Name={setPlayer1Name}
   setPlayer2Name={setPlayer2Name}
   winsPlayer1={winsPlayer1}
   winsPlayer2={winsPlayer2}
   setWinsPlayer1={setWinsPlayer1}
   setWinsPlayer2={setWinsPlayer2}
   
   /> :
   <StartScreen 
    onStart={handleStart}
    player1Name={player1Name}
    player2Name={player2Name}
    setPlayer1Name={setPlayer1Name}
    setPlayer2Name={setPlayer2Name}
    />;
}
