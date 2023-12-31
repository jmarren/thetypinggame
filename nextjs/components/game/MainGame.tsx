"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameText from '@/components/game/GameText';
import GameTimer from './GameTimer';
import { incrementIncorrectCount, incrementCorrectCount, initializeKeyStats, finalizeStats, analyzeData, submitGame } from '@/utilities/gameUtils';
import { Feedback, AssessmentType, KeyStats } from '../../types';
import FeedbackCard from '../modals/FeedbackCard';




export enum GameState {
  NotStarted,
  InProgress,
  Ended,
}



const MainGame: React.FC<{ templateString: string, modalOpen: boolean, isAssessment: boolean, assessmentType: AssessmentType }> = ({ templateString, modalOpen, isAssessment, assessmentType }) => {


const inputString = (templateString);
  const [gameState, setGameState] = useState(GameState.NotStarted);
  const [keyStats, setKeyStats] = useState(initializeKeyStats(inputString));
  const backspaceCount = useRef(0);
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [feedbackOpen, setFeedbackOpen] = useState(false);




const toggleFeedback = () => {
  if (feedbackOpen) setGameState(GameState.NotStarted);
  setFeedbackOpen(!feedbackOpen)

}

  const updateSeconds = () => {
    setTotalSeconds(prevSeconds => prevSeconds + 1)
  }

  const [feedback, setFeedback] = useState<Feedback>({
    totalMistakes: 0,
    accuracy: ``,
    mistypedChars: ``,
    wordsPerMinute: ``,
    backspaceUsage: 0,
  });


  const updateStats = (newStats: KeyStats) => {
    setKeyStats((prevStats: KeyStats) => ({ ...prevStats, ...newStats }));
  };

  const addIncorrect = (char: string) => {
    setKeyStats((prevStats: KeyStats) => incrementIncorrectCount(prevStats, char));
  }

  const addCorrect = (char: string) => {
    setKeyStats((prevStats: KeyStats) => incrementCorrectCount(prevStats, char))
  }






  const finalStats = () => {

    const AssessmentTypeToString = {
      [AssessmentType.None]: 'None', 
      [AssessmentType.EightFingers]: 'First Eight',
      [AssessmentType.HomeRow]: 'Home Row',
      [AssessmentType.TopRow]: 'Top Row',
      [AssessmentType.BottomRow]: 'Bottom Row',
      [AssessmentType.AllLetters]: 'All Letters', 
      [AssessmentType.Numbers]: 'Numbers',
      [AssessmentType.Symbols]: 'Symbols',
      [AssessmentType.All]: 'All',
    };
    const assessmentTypeString = AssessmentTypeToString[assessmentType];

    console.log('=========== finalStats Function ===========')
    console.log('isAssessment: ',  isAssessment)
    console.log('assessmentType: ',  assessmentType)
    const finalStats = finalizeStats(keyStats, totalSeconds, backspaceCount.current);
    const finalData = analyzeData(finalStats);
    submitGame(finalStats, isAssessment, assessmentTypeString)
    setFeedback(finalData);
    setFeedbackOpen(true);
    console.log('====================================')
  }


  const incrementBackspace = () => {
    backspaceCount.current++;
  }


  const endGame = () => {
    finalStats();
    setGameState(GameState.Ended);
  };

  const resetGame = () => {
    setKeyStats(initializeKeyStats(inputString))
    setGameState(GameState.NotStarted);
    setTotalSeconds(0)
  };

  const startGame = useCallback(() => {
    if (modalOpen) return;
    setGameState(GameState.InProgress);
  },[modalOpen]);


  useEffect(() => {
    setGameState(GameState.NotStarted);
  }, [templateString]);


  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalOpen) return;
      if (event.key === 'Enter' && gameState === GameState.NotStarted && !modalOpen) {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, modalOpen, startGame]);

  const SAMPLE_TEXT_SHORT = 'This is a test to see if my typing game is working properly.'
  const SAMPLE_TEXT_LONG = `This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.`;
  const SAMPLE_TEXT_XTRA_LONG = `This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet. This is a test to see if my typing game is working properly.`;


  return (


    <>
      <div className='h-full pr-10 pl-16 pt-10 pb-6 overflow-hidden'>
        {gameState === GameState.NotStarted && (
          <>
            <div className='w-full h-full relative'>
              <div className='absolute w-full flex items-center justify-center h-full z-50' >
                <div>
                  Press Enter to Begin
                </div>
              </div>
              <div className='absolute w-full h-full blur z-10 flex flex-col'>
                <GameTimer gameState={gameState} finalStats={finalStats} resetGame={resetGame} updateSeconds={updateSeconds} />
                <div className='flex-grow overflow-hidden'>
                  <GameText modalOpen={modalOpen} gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} addCorrect={addCorrect} startGame={startGame} endGame={endGame} templateString={templateString} />
                </div>
              </div>
            </div>
          </>
        )}
        {gameState === GameState.InProgress && (
          <>
            <div className='w-full h-full relative'>
              <div className='absolute w-full h-full z-10 flex flex-col'>
                <GameTimer gameState={gameState} finalStats={finalStats} resetGame={resetGame} updateSeconds={updateSeconds} />
                <div className='flex-grow overflow-hidden'>
                  <GameText modalOpen={modalOpen} gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} addCorrect={addCorrect} startGame={startGame} endGame={endGame} templateString={templateString} />
                </div>
              </div>
            </div>
          </>
        )}
        {gameState === GameState.Ended && (
          <>
            <div className='w-full h-full relative'>
              <div className='blur absolute'>
                <GameTimer gameState={gameState} finalStats={finalStats} resetGame={resetGame} updateSeconds={updateSeconds} />
                <GameText modalOpen={modalOpen} gameState={gameState} updateStats={updateStats} incrementBackspace={incrementBackspace} addIncorrect={addIncorrect} addCorrect={addCorrect} startGame={startGame} endGame={endGame} templateString={templateString} />
              </div>
            </div>

          </>
        )}
      </div>
      {gameState === GameState.Ended && (
        <div className=' absolute w-full h-full top-0 left-0 flex items-center justify-center z-50' >
          {feedbackOpen && <FeedbackCard feedback={feedback} resetGame={resetGame} toggleModal={toggleFeedback}/>}
        </div>

      )}
    </>

  );
};

export default MainGame;
