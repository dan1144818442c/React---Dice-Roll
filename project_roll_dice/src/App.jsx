import React, { useState } from 'react';
import StartScreen from './components/startScreen';
import  Game from './components/Game';
import './App.css'

export default function App() {
  const [started, setStarted] = useState(false);
  const [targetScore, setTargetScore] = useState(0);

  const handleStart = (score) => {
    setTargetScore(score);
    setStarted(true);
  };

  return started ? <Game targetScore={targetScore} /> : <StartScreen onStart={handleStart} />;
}
