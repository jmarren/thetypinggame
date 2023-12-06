"use client"

import React, { useState, useEffect, useRef } from 'react';
import GameText from '@/components/game/GameText';
import GameTimer from './GameTimer';
import GameStats from './GameStats';
import {incrementIncorrectCount, initializeKeyStats, finalizeStats, analyzeData} from '@/utilities/gameUtils';
import type { Feedback } from '@/types';

export enum GameState {
  NotStarted,
  InProgress,
  Ended,
}

const MainGame: React.FC = () => {
  const templateString = 'This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.';
  const inputString = templateString.replaceAll(' ', '●');
  const [gameState, setGameState] = useState(GameState.NotStarted);
  const [keyStats, setKeyStats] = useState(initializeKeyStats(inputString));
  const backspaceCount = useRef(0);


  const [feedback, setFeedback] = useState<Feedback>({
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

  const finalStats = (totalTime) => {
    console.log('TOTAL TIME: ', totalTime);
    const finalStats = finalizeStats(keyStats, totalTime, backspaceCount.current);
    const finalData = analyzeData(finalStats);
    console.log('FINAL DATA: ',  finalData);
    setFeedback(finalData);
    
  }


  const incrementBackspace = () => {
      backspaceCount.current++;
  }

  const startGame = () => {
    setGameState(GameState.InProgress);
  };

  const endGame = () => {
    setGameState(GameState.Ended);
  };

  const resetGame = () => {
    setGameState(GameState.NotStarted);
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



  return (


    <>
      {gameState === GameState.NotStarted && (
        <>
        <div className='w-full h-full relative'>
      <div className='absolute w-full flex items-center justify-center h-full border border-green-500 z-50' >
          <div>
          Press Enter to begin
          </div>
      </div>
          <div className='absolute w-full h-full blur z-10'>
              <GameTimer gameState={gameState} finalStats={finalStats}   /> 
              <GameText  gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString={SAMPLE_TEXT_SHORT} />
        </div> 
        </div>
        </> 
      )}
      {gameState === GameState.InProgress && (
        <>
        <div className='absolute'>
              <GameTimer gameState={gameState} finalStats={finalStats}   /> 
              <GameText  gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString={SAMPLE_TEXT_SHORT} />
        </div> 
        </>
      )}
      {gameState === GameState.Ended && (
        <>
        <div className='blur absolute'>
              <GameTimer gameState={gameState} finalStats={finalStats}   /> 
              <GameText  gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString={SAMPLE_TEXT_SHORT} />
        </div> 
        <div className='absolute'>
          <GameStats feedback={feedback} />
          </div>
        </>
      )}




    </>
    
    // <div className='absolute'>
    //   {gameState === GameState.NotStarted && (
    //     <button onClick={startGame}>Start Game</button>
    //   )}

    //   {gameState === GameState.InProgress && (
    //     <div className='absolute'>
    //       {/* Your game components when the game is in progress */}
    //       <button onClick={endGame}>End Game</button>
    //     </div>
    //   )}

      


/* {gameState === GameState.Ended ? (
  <div className='w-full h-full border-2 border-green-400'>
    <div className='flex items-center justify-center z-[11] border-yellow-500 border-2 '>
      <GameStats feedback={feedback} />
    </div>
    <button onClick={resetGame}>Reset Game</button>
  </div>
) : (
  <div className='w-full h-full border-2 border-red-400 z-[1]'>
    <GameTimer gameState={gameState} finalStats={finalStats} />
    <GameText gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString='This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.' />
  </div>
)} */






/*

 {gameState === GameState.Ended && (
        <div className='w-full h-full border-2 border-green-400'> 


        <div className='w-full h-full flex items-center justify-center z-[11] border-yellow-500 border-2 '>
        <GameStats feedback={feedback} />
        </div>
          <button onClick={resetGame}>Reset Game</button>
          
          <div className='w-full h-full border-2 border-red-400 z-[1]'>

           
        </div>
        
        </div>
      )} 
       

     <GameTimer gameState={gameState} finalStats={finalStats}   /> 
          <GameText gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} startGame={startGame} endGame={endGame} templateString='This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.' />


    </div>

    */
  );
};

export default MainGame;
