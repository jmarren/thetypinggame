"use client"

import React, { useState, useEffect, useRef } from 'react';
import GameText from '@/components/game/GameText';
import GameTimer from './GameTimer';
import GameStats from './GameStats';
import {incrementIncorrectCount, initializeKeyStats, finalizeStats, analyzeData, submitGame} from '@/utilities/gameUtils';
import type { Feedback } from '@/types';
import FeedbackCard from '../FeedbackCard';

export enum GameState {
  NotStarted,
  InProgress,
  Ended,
}

const MainGame: React.FC = () => {
  const templateString = 'This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.';
  const inputString = templateString.replaceAll(' ', '-');
  const [gameState, setGameState] = useState(GameState.NotStarted);
  const [keyStats, setKeyStats] = useState(initializeKeyStats(inputString));
  const backspaceCount = useRef(0);
  const [totalSeconds, setTotalSeconds] = useState(0)


  const updateSeconds = () => {
    setTotalSeconds(prevSeconds => prevSeconds + 1)
  }

  useEffect(() => {
    console.log('totalSeconds.current: ',  totalSeconds)
  }, [totalSeconds]);

  const [feedback, setFeedback] = useState<Feedback>({
    totalMistakes: 0,
    accuracy: ``,
    mistypedChars: ``,
    wordsPerMinute: ``,
    backspaceUsage: 0,
  });


  const updateStats = (newStats) => {
    setKeyStats(prevStats => ({ ...prevStats, ...newStats }));
  };

  const addIncorrect = (char: string) => {
    setKeyStats((prevStats) => incrementIncorrectCount(prevStats, char));
  }

  const finalStats = () => {

    const finalStats = finalizeStats(keyStats, totalSeconds, backspaceCount.current);
    const finalData = analyzeData(finalStats);
    submitGame(finalStats)
    setFeedback(finalData);
}


  const incrementBackspace = () => {
      backspaceCount.current++;
  }

  const startGame = () => {
    setGameState(GameState.InProgress);
  };

  const endGame = () => {
    finalStats();
    setGameState(GameState.Ended);
  };

  const resetGame = () => {
    setKeyStats(initializeKeyStats(inputString))
    setGameState(GameState.NotStarted);
    setTotalSeconds(0)

  };


  useEffect(() => {
    console.log('keyStats: ', keyStats)
  }, [keyStats]);

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && gameState === GameState.NotStarted) {
      startGame();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [gameState]);

const SAMPLE_TEXT_SHORT = 'This is a test to see if my typing game is working properly.'
const SAMPLE_TEXT_LONG = `This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.`;
const SAMPLE_TEXT_XTRA_LONG=`This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet. This is a test to see if my typing game is working properly.`;


  return (


    <>
    <div className='h-[400px]  px-10 pt-10 pb-6 overflow-hidden'>
      {gameState === GameState.NotStarted && (
        <>
        <div className='w-full h-full relative'>
      <div className='absolute w-full flex items-center justify-center h-full z-50' >
          <div>
          Press Enter to Begin
          </div>
      </div>
          <div className='absolute w-full h-full blur z-10 flex flex-col'>
              <GameTimer gameState={gameState} finalStats={finalStats} resetGame={resetGame} updateSeconds={updateSeconds}  /> 
              <div className='flex-grow overflow-hidden'>
              <GameText  gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString={SAMPLE_TEXT_SHORT} />
              </div>
        </div> 
        </div>
        </> 
      )}
      {gameState === GameState.InProgress && (
        <>
        <div className='w-full h-full relative'>
        <div className='absolute w-full h-full z-10 flex flex-col'>
              <GameTimer gameState={gameState} finalStats={finalStats} resetGame={resetGame} updateSeconds={updateSeconds}  /> 
        <div className='flex-grow overflow-hidden'>
              <GameText  gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString={SAMPLE_TEXT_SHORT} />
              </div>
        </div> 
        </div>
        </>
      )}
      {gameState === GameState.Ended && (
        <>
        <div className='w-full h-full relative'>
        <div className='blur absolute'>
              <GameTimer gameState={gameState} finalStats={finalStats} resetGame={resetGame} updateSeconds={updateSeconds}  /> 
              <GameText  gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString={SAMPLE_TEXT_SHORT} />
        </div> 
        <div className='absolute w-full h-full'>
          <div className='w-full flex flex-col items-center justify-center h-full  z-50' >
            <FeedbackCard feedback={feedback} resetGame={resetGame} />
            </div>
          </div>
          </div>
        </>
      )}
      </div>
    </>
   
  );
};

export default MainGame;
