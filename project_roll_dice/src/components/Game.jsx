import React, { useState } from 'react';
import dice_img1 from "../assets/dice-1.png";
import dice_img2 from "../assets/dice-2.png";
import dice_img3 from "../assets/dice-3.png";
import dice_img4 from "../assets/dice-4.png";
import dice_img5 from "../assets/dice-5.png";
import dice_img6 from "../assets/dice-6.png";
const diceImages = {
  1: dice_img1,
  2: dice_img2,
  3: dice_img3,
  4: dice_img4,
  5: dice_img5,
  6: dice_img6
};

export default function Game({ targetScore }) {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer1Score, setCurrentPlayer1Score] = useState(0);
  const [currentPlayer2Score, setCurrentPlayer2Score] = useState(0);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [turn, setTurn] = useState(1);

  const rollDice = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    setDice1(d1);
    setDice2(d2);

    if (d1 === 6 && d2 === 6) {zeroCurrentScoreOfCurrentUser()
        return 0 };
    return d1 + d2 ;
  };

  const rollTurn = () => {
    const total = rollDice();
    if (turn === 1) setCurrentPlayer1Score(prev => prev + total);
    else setCurrentPlayer2Score(prev => prev + total);
  };

  const zeroCurrentScoreOfCurrentUser = () => {
    if (turn === 1) setCurrentPlayer1Score(0);
    else setCurrentPlayer2Score(0);
  };

  const replaceTurnAndAddCurrentScore = () => {
    if (turn === 1) {
      setTurn(2);
      setPlayer1Score(prev => prev + currentPlayer1Score);
      setCurrentPlayer1Score(0);
      if (player1Score == targetScore) alert("Player 1 wins!");
    } else {
      setTurn(1);
      setPlayer2Score(prev => prev + currentPlayer2Score);
      setCurrentPlayer2Score(0);
      if (player2Score == targetScore) alert("Player 2 wins!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2> Target Score: {targetScore}</h2>
      <h3>Turn: Player {turn}</h3>

      <div style={{ marginTop: "20px" }}>
        <p>Player 1: {player1Score}</p>
        <p>Player 2: {player2Score}</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={rollTurn} disabled={turn !== 1} style={{ marginRight: "10px", padding: "10px 20px" }}>
          Player 1 Roll
        </button>
        {turn === 1 && <p>Last roll: {currentPlayer1Score}</p>}

        <button onClick={rollTurn} disabled={turn !== 2} style={{ padding: "10px 20px" }}>
          Player 2 Roll
        </button>
        {turn === 2 && <p>Last roll: {currentPlayer2Score}</p>}

        <button onClick={replaceTurnAndAddCurrentScore} style={{ padding: "10px 20px" }}>
          raplace turn
        </button>
       <div>
        <img src={diceImages[dice1]} style={{ width: "150px", marginRight: "20px" }} />
        <img src={diceImages[dice2]} style={{ width: "150px" }} />
       </div>
        

      </div>
    </div>
  );
}
