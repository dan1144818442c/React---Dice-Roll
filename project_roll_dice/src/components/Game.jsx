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

  const [players, setPlayers] = useState({
    1: { score: 0, currentScore: 0, wins: winsPlayer1, id: player1Id, name: player1Name },
    2: { score: 0, currentScore: 0, wins: winsPlayer2, id: player2Id, name: player2Name }
  });

  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [turn, setTurn] = useState(1);
  const [numberOfThrows, setNumberOfThrows] = useState(0);

  useEffect(() => {
        const savedWins1 = localStorage.getItem(`Number of wins playerID : ${player1Id}`);
        const savedWins2 = localStorage.getItem(`Number of wins player@2 ${player2Id}`);
        if (savedWins1) setWinsPlayer1(parseInt(savedWins1));
        if (savedWins2) setWinsPlayer2(parseInt(savedWins2));
              }, 
              []);
  

  const player1Score = players[1].score;
  const player2Score = players[2].score;

  const getOtherPlayerId = (currentPlayerId) => {
      return currentPlayerId === 1 ? 2 : 1;
  };

  useEffect(() => {
      let winnerId = null;
      let winningPlayer = null;
      let losingPlayer = null;

      if (player1Score >= targetScore) {
          if (player1Score === targetScore) {
              winnerId = 1;
              winningPlayer = players[1];
              losingPlayer = players[2];
          } else { 
              winnerId = 2;
              winningPlayer = players[2];
              losingPlayer = players[1];
          }
      }
      
  
      if (player2Score >= targetScore && winnerId === null) {
          if (player2Score === targetScore) {
              winnerId = 2;
              winningPlayer = players[2];
              losingPlayer = players[1];
          } else { 
              winnerId = 1;
              winningPlayer = players[1];
              losingPlayer = players[2];
          }
      }


    if (winnerId !== null) {
        alert(`${winningPlayer.name} wins!`); 
        
        const newWins = winningPlayer.wins + 1;
        localStorage.setItem(`Number of wins player ${winningPlayer.id}`, newWins);
        
        if (winnerId === 1) {
            setWinsPlayer1(newWins);
        } else {
            setWinsPlayer2(newWins);
        }
        
        onRestart();
      }
  }, [
      player1Score, 
      player2Score, 
      targetScore, 
      onRestart,
      players,
      setWinsPlayer1, 
      setWinsPlayer2
  ]);


  useEffect(() => {
  if (turn === 2) {
    const timer = setTimeout(() => {
      aiTurn();
    }, 500);

    return () => clearTimeout(timer); 
  }
    }, [turn]);

useEffect(() => {
  if (numberOfThrows > 6) {
   
    setNumberOfThrows(0); 
    setPlayers(prev => ({
      ...prev,
      1: { ...prev[1], currentScore: 0 },
      2: { ...prev[2], currentScore: 0 }
    }));
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
    // if (turn === 1) setCurrentPlayer1Score(prev => prev + total);
    // else setCurrentPlayer2Score(prev => prev + total);
    setPlayers(prev => (
      { ...prev ,
       [turn]:{ ...prev[turn] ,  currentScore: prev[turn].currentScore + total
       }
       }));
    };

  const zeroCurrentScoreOfCurrentUser = () => {
    setPlayers(prev => ({
      ...prev , 
      [turn] : {...prev[turn] , currentScore : 0}
    }))
  }

  function get_other_turn(){
    if (turn == 1) {
      return 2;
    }
    else{
      return 1
    }
  }

  function checkWin (currentPlayer, otherPlayer) {
    if (currentPlayer.score === targetScore) {
      alert(`${currentPlayer.name} wins!`);
    setPlayers(prev => {
      const newWins = prev[turn].wins + 1;  


      localStorage.setItem(`Number of wins player ${currentPlayer.id}`, newWins);

      return {
        ...prev,
        [turn]: { ...prev[turn], wins: newWins }
      };

    })
  onRestart();
}
    else if (currentPlayer.score > targetScore) {
      alert(`${otherPlayer.name} wins!`);
      setPlayers(prev => {
      const newWins = prev[get_other_turn()].wins + 1; 
      localStorage.setItem(`Number of wins player ${otherPlayer.id}`, newWins);

      return {
        ...prev,
        [get_other_turn()]: { ...prev[get_other_turn()], wins: newWins }
      };
    });
    onRestart();
    };
      
    }

  

const aiTurn = () => {
  let aiCurrent = 0;

  const aiPlay = () => {
    const rollTotal = rollDice();
    aiCurrent += rollTotal;

    setPlayers(prev => ({
      ...prev,
      2: { ...prev[2], currentScore: aiCurrent }
    }));

    setTimeout(() => {
      setPlayers(prev => {
        const newScore = prev[2].score + aiCurrent;
        const updated = {
          ...prev,
          2: { ...prev[2], score: newScore, currentScore: 0 }
        };

        return updated;
      });

      if (Math.random() < 0.3 || aiCurrent + players[2].score >= targetScore) {
        replaceTurnAndAddCurrentScore()
       
      } else {
        aiPlay();
      }
    }, 800);
  };

  aiPlay();
};


  const replaceTurnAndAddCurrentScore = () => {
    setPlayers(prev => {
      const current = prev[turn];
      const newScore = current.score + current.currentScore;
      const update = {...prev ,
        [turn] : {...prev[turn] , score : newScore , current : 0 }
      };
      return update;

    });
      setNumberOfThrows(0);
      setTurn( get_other_turn());
      } 
    
      
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
        

    
  
    return (
      <div className={styles.container}>
        <h2>Target Score: {targetScore}</h2>
        <h3>Turn: Player {turn}</h3>

        <div className={styles.players}>
        <Player
            name={players[1].name}
            score={players[1].score}
            currentScore={players[1].currentScore}
            isTurn={turn === 1}
            wins={players[1].wins}
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
          name={players[2].name}
          score={players[2].score}
          currentScore={players[2].currentScore}
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
