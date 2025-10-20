import React from 'react';
import styles from './Game.module.css';

export default function Player({ name, score, currentScore, isTurn, onRoll  , wins}) {
  return (
    <div className={styles.playerContainer}>
      <h3>{name}</h3>
      <p>Total Score: {score}</p>
      <p>Current Score: {isTurn ? currentScore : 0}</p>
      <p>Wins: {wins}</p>
      <button onClick={onRoll} disabled={!isTurn}>Roll</button>
    </div>
  );
}
