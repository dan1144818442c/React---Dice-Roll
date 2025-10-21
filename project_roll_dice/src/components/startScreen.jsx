import React, { useState } from 'react';

export default function StartScreen({ onStart ,player1Name ,player2Name ,setPlayer1Name ,setPlayer2Name}) {
  const [targetScore, setTargetScore] = useState('');

  const handleStart = () => {
    if (targetScore && !isNaN(targetScore) && targetScore > 0  ) {
      if (targetScore <= 100 ){
        onStart(Number(targetScore));
        }
      else{
        alert('Please enter a number between 0 to 100 ')
      }
    }
    else{ 
      alert('Please enter a valid number.');
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GAME - DICE-ROLL</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label>
          Player 1 Name:
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Player 2 Name:
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div>
        <label>
          Target score:
          <input
            type='number'
            value={targetScore}
            onChange={(e) => setTargetScore(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <button onClick={handleStart} style={{ marginTop: "20px", padding: "10px 20px" }}>
        start game
      </button>
    </div>
  );
}
