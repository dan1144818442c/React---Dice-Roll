import React, { useState } from 'react';

export default function StartScreen({ onStart }) {
  const [targetScore, setTargetScore] = useState('');

  const handleStart = () => {
    if (targetScore && !isNaN(targetScore)) {
      onStart(Number(targetScore));
    } else {
      alert('Please enter a valid number.');
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GAME - DICE-ROLL</h1>
      <div>
        <label>
          Target score:
          <input
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
