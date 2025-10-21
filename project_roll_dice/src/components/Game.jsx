import React, { useState, useEffect } from 'react';

import dice_img1 from "../assets/dice-1.png";
import dice_img2 from "../assets/dice-2.png";
import dice_img3 from "../assets/dice-3.png";
import dice_img4 from "../assets/dice-4.png";
import dice_img5 from "../assets/dice-5.png";
import dice_img6 from "../assets/dice-6.png";
import styles from './Game.module.css';
import Player from './Player';
import AIPlayer  from './AIPlayer';

const diceImages = {
  1: dice_img1,
  2: dice_img2,
  3: dice_img3,
  4: dice_img4,
  5: dice_img5,
  6: dice_img6
};


export default function Game(
  {
    targetScore,
    onRestart,
    resetAllGame,
    player1Name,
    player2Name,
    player1Id,
    player2Id,
    setPlayer1Name,
    setPlayer2Name,
    winsPlayer1,
    winsPlayer2,
    setWinsPlayer1,
    setWinsPlayer2
  }) {

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer1Score, setCurrentPlayer1Score] = useState(0);
  const [currentPlayer2Score, setCurrentPlayer2Score] = useState(0);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [turn, setTurn] = useState(1);
  const [numberOfThrows, setNumberOfThrows] = useState(0);

  useEffect(() => {
        const savedWins1 = localStorage.getItem(`Number of wins playerID : ${player1Id}`);
        const savedWins2 = localStorage.getItem(`Number of wins player ${player2Id}`);
        if (savedWins1) setWinsPlayer1(parseInt(savedWins1));
        if (savedWins2) setWinsPlayer2(parseInt(savedWins2));
              }, 
              []);
  
  useEffect(() => {
  if (turn === 2) {
    // השהייה קטנה כדי לאפשר אנימציות/עדכון UI לפני שה־AI מתחיל
    const timer = setTimeout(() => {
      aiTurn();
    }, 500);

    return () => clearTimeout(timer); // ניקוי כשיתבטל
  }
  else {
    
  }
    }, [turn]);

useEffect(() => {
  if (numberOfThrows > 6) {
   
    setNumberOfThrows(0); 
    setCurrentPlayer1Score(0)
    setCurrentPlayer2Score(0)
    

   
    setTurn(prev => (prev === 1 ? 2  : 1));
    }
    }, [numberOfThrows]);


  const rollDice = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDice1(d1);
    setDice2(d2);
     setNumberOfThrows(prev => prev + 1);
    if (d1 === 6 && d2 === 6) { zeroCurrentScoreOfCurrentUser(); return 0; }
    return d1 + d2;
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

  function checkWin(playerNamwe , playerId, otherPlayerName, otherPlayerId , newScore, targetScore, setWinsCurrent , winsCurrent, setWinsOther , WinsOther) {
    if (newScore === targetScore) {
      alert(`${playerNamwe} wins!`);
      setWinsCurrent(prev =>{ 
            const numWins_ = prev +1;
            localStorage.setItem(`Number of wins player ${playerId}` , numWins_);
            console.log(numWins_)
            return numWins_;});
      onRestart();
     } 
    else if (newScore > targetScore) {
      alert(`${otherPlayerName} wins!`);
      setWinsOther(prev => {
      const numWins = prev + 1;
      localStorage.setItem(`Number of wins player ${otherPlayerId}`, numWins);
      console.log(numWins)
      return numWins;
    });
      onRestart();
    }
    console.log(newScore)
  }

  const aiTurn = () => {
    let aiCurrent = 0;

    const aiPlay = () => {
    const rollTotal = rollDice();
    aiCurrent += rollTotal;
    setCurrentPlayer2Score(aiCurrent)
    setTimeout(() => {
      const newScore = player2Score + aiCurrent;

        if (newScore >= targetScore || Math.random() < 0.3) {
          setPlayer2Score(newScore);
          setCurrentPlayer2Score(0);
          checkWin(
            player2Name,
            player2Id,
            player1Name,
            player1Id,
            newScore,
            targetScore,
            setWinsPlayer2,
            winsPlayer2,
            setWinsPlayer1,
            winsPlayer1
          );
          setNumberOfThrows(0);
          setTurn(1); 
        } else {
         
          aiPlay();
        }
      }, 800); 
    };

    aiPlay();
  };

  const replaceTurnAndAddCurrentScore = () => {
    if (turn === 1) {

      const newScore = player1Score + currentPlayer1Score;
      setPlayer1Score(newScore);
      setCurrentPlayer1Score(0);
      checkWin(
            player1Name,
            player1Id,
            player2Name,
            player2Id,
            newScore,
            targetScore,
            setWinsPlayer1,
            winsPlayer1 ,
            setWinsPlayer2 , 
            winsPlayer2
            ); 
            
      setNumberOfThrows(0);
      setTurn(2);
      } 
      else {
      
        // const newScore = player2Score + currentPlayer2Score;
        // setPlayer2Score(newScore); 
        // setCurrentPlayer2Score(0);
        // checkWin(
        // player2Name,
        // player2Id,
        // player1Name,
        // player1Id,
        // newScore,
        // targetScore,
        // setWinsPlayer2,
        // winsPlayer2,
        // setWinsPlayer1,
        // winsPlayer1
        //   );

        // AI turn: by  use effect
        

    
  };

      
    };

    return (
      <div className={styles.container}>
        <h2>Target Score: {targetScore}</h2>
        <h3>Turn: Player {turn}</h3>

        <div className={styles.players}>
        <Player
            name={player1Name}
            score={player1Score}
            currentScore={currentPlayer1Score}
            isTurn={turn === 1}
            wins={winsPlayer1}
            onRoll={rollTurn}
          />
          {/* <Player
            name={player2Name}
            score={player2Score}
            currentScore={currentPlayer2Score}
            isTurn={turn === 2}
            wins={winsPlayer2}
            onRoll={rollTurn}

          /> */}
          <AIPlayer
          name={player2Name}
          score={player2Score}
          currentScore={currentPlayer2Score}
          isTurn={turn === 2}
          wins={winsPlayer2}
          
          />
          
        </div>

        <div className={styles.buttons}>

    <button onClick={replaceTurnAndAddCurrentScore}>Replace Turn</button>
    </div>
        <div className={styles.diceContainer}>
          <img src={diceImages[dice1]} className={styles.diceImg} />
          <img src={diceImages[dice2]} className={styles.diceImg} />
        </div>

        <button onClick={onRestart}>Restart</button>
        <button onClick={resetAllGame}>reset all game</button>
      </div>
    );
  }
