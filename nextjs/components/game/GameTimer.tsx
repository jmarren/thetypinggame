import React, { useState, useEffect } from 'react';

enum GameState {
  NotStarted,
  InProgress,
  Ended,
}

interface GameTimerProps {
  gameState: GameState;
  finalStats: (totalTime: number) => void;
  resetGame: () => void;
}


const GameTimer: React.FC<GameTimerProps> = ({ gameState, finalStats, resetGame}) => {
  const [time, setTime] = useState(0);



  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === GameState.InProgress) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (gameState === GameState.InProgress) {
        console.log('FINAL TIME (TIMER COMPONENT):  ', time)
        finalStats(time);
      }
      clearInterval(interval);
    };
  }, [gameState, time]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
  <div className='font-[Sora] text-slate-600  flex gap-4'>
    <div>
      {gameState === GameState.NotStarted ? '0:00' : formatTime(time)}
      </div>
    <button onClick={resetGame}>
      Reset
    </button>
    </div>
)};

export default GameTimer;
