"use client"

import React, { useState, useEffect, useRef } from 'react';
import { GameState } from './MainGame';
import { calculateCharactersPerLine, calculateLineHeight } from '@/utilities/gameUtils';

interface GameTextProps {
  templateString: string;
  gameState: GameState;
  incrementBackspace: () => void;
  updateStats: (newStats: any) => void;
  endGame: () => void;
  startGame: () => void;
  addIncorrect: (char: string) => void;
  addCorrect: (char: string) => void;
}

const GameText: React.FC<GameTextProps> = ({ templateString, gameState, incrementBackspace, endGame, startGame, addCorrect, addIncorrect }) => {
  const [userInput, setUserInput] = useState('');
  const inputString = templateString.replaceAll(' ', '-');
  const textContainerRef = useRef(null);


  useEffect(() => {

    if (textContainerRef.current) {
      const container = textContainerRef.current;
      const totalCharactersPerLine = calculateCharactersPerLine(container);
      const currentLine = Math.floor(userInput.length / totalCharactersPerLine);
      const lineHeight = calculateLineHeight(container);

      // Scroll to the current line
      container.scrollTop = currentLine * lineHeight;
    }

    if (userInput === inputString) {
      endGame();
    }
  }, [userInput]);



  useEffect(() => {
    if (gameState === GameState.NotStarted || gameState === GameState.Ended) {
      return;
    }
    const handleKeydown = (event: React.KeyboardEvent) => {
      const key = event.key;
      let nextUserInput;

      if (key === ' ') {
        event.preventDefault();
        nextUserInput = userInput + '-';
      } else if (key.length === 1 && key !== ' ') {
        nextUserInput = userInput + event.key;
      } else if (key === 'Backspace') {
        nextUserInput = userInput.slice(0, -1);
      } else {
        return;
      }

      if (key !== 'Backspace' && key !== inputString[nextUserInput.length - 1] && key !== ' ') {
        console.log('INCORRECT')
        console.log(inputString[nextUserInput.length - 1])
        addIncorrect(inputString[nextUserInput.length - 1]);
      }
      else if (key === ' ' && '-' !== inputString[nextUserInput.length - 1]) {
        console.log('INCORRECT')
        console.log(inputString[nextUserInput.length - 1])
        addIncorrect(inputString[nextUserInput.length - 1]);
      }
      else if (key === inputString[nextUserInput.length - 1]) {
        addCorrect(inputString[nextUserInput.length - 1]);
        console.log('CORRECT')
      }



      setUserInput(nextUserInput);

      if (key === 'Enter') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [gameState, startGame, userInput, inputString, addIncorrect, addCorrect]);




  const getStyledText = () => {
    let styledText = '';

    for (let i = 0; i < inputString.length; i++) {
      if (i < userInput.length) {
        if (userInput[i] === inputString[i]) {
          styledText += `<span style="color: green">${userInput[i]}</span>`;
        } else {
          styledText += `<span style="color: red">${userInput[i]}</span>`;
        }
      } else {
        styledText += `<span>${inputString[i]}</span>`;
      }
    }

    return styledText;
  };

  return <div className='text-2xl leading-loose font-[courier] h-full overflow-y-scroll' ref={textContainerRef} dangerouslySetInnerHTML={{ __html: getStyledText() }} />;
};

export default GameText;



