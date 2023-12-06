import React, { useState, useEffect } from 'react';

enum GameState {
  NotStarted,
  InProgress,
  Ended,
}

interface GameTimerProps {
  gameState: GameState;
  finalStats: (totalTime: number) => void;
}


const GameTimer: React.FC<GameTimerProps> = ({ gameState, finalStats}) => {
  const [time, setTime] = useState(0);


  useEffect(() => {
    if (gameState === GameState.Ended) {
      finalStats(time);
    }
  }, [gameState]);




  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === GameState.InProgress) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div>{gameState === GameState.NotStarted ? '0:00' : formatTime(time)}</div>;
};

export default GameTimer;
