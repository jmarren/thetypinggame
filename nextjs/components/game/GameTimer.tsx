import React, { useState, useEffect } from 'react';

enum GameState {
  NotStarted,
  InProgress,
  Ended,
}

interface GameTimerProps {
  gameState: GameState;
  finalStats: () => void;
  resetGame: () => void;
  updateSeconds: () => void;
}


const GameTimer: React.FC<GameTimerProps> = ({ gameState, finalStats, resetGame, updateSeconds}) => {
  const [time, setTime] = useState(0);
   
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === GameState.InProgress) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        updateSeconds();
      }, 1000);
    }

    // if (gameState === GameState.Ended) {
    //   console.log('FINAL TIME (TIMER COMPONENT):  ', time) 
    // }

    // return () => {
    //   if (gameState === GameState.InProgress) {
    //   }
    //   clearInterval(interval);
    // };
  }, [gameState]);

  // */

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
  <div className='font-[Sora] text-slate-600  flex gap-4'>
    <div className='w-[4rem]'>
      {gameState === GameState.NotStarted ? '0:00' : formatTime(time)}
      </div>
    <button onClick={resetGame}>
      Reset
    </button>
    </div>
)};

export default GameTimer;
