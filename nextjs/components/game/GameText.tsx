"use client"

import React, { useState, useEffect, useRef } from 'react';
import { GameState } from './MainGame';
import { calculateCharactersPerLine, calculateLineHeight } from '@/utilities/gameUtils';
import next from 'next';

interface GameTextProps {
  templateString: string;
  gameState: GameState;
  incrementBackspace: () => void;
  updateStats: (newStats: any) => void;
  endGame: () => void;
  startGame: () => void;
  addIncorrect: (char: string) => void;
  addCorrect: (char: string) => void;
  modalOpen: boolean;
}

const GameText: React.FC<GameTextProps> = ({ templateString, gameState, incrementBackspace, endGame, startGame, addCorrect, addIncorrect, modalOpen }) => {
  const [userInput, setUserInput] = useState('');
  // const inputString = templateString.replaceAll(' ', '-');
  const inputString = templateString;
  const textContainerRef = useRef(null);


  useEffect(() => {

    if (textContainerRef.current) {
      const container = textContainerRef.current as HTMLDivElement;
      const totalCharactersPerLine = calculateCharactersPerLine(container);
      const currentLine = Math.floor(userInput.length / totalCharactersPerLine);
      const lineHeight = calculateLineHeight(container);

      // Scroll to the current line
      container.scrollTop = currentLine * lineHeight;
    }

    if (userInput === inputString) {
      endGame();
    }
  }, [userInput, endGame, inputString]);



  useEffect(() => {
    if (gameState === GameState.NotStarted || gameState === GameState.Ended || modalOpen) {
      return;
    }
    const handleKeydown = (event: KeyboardEvent) => {
      console.log('ModalOpen? : ', modalOpen)
      if (modalOpen) return;
      const key = event.key;
      let nextUserInput;

      if (key === ' ') {
        event.preventDefault();
        if (inputString[userInput.length] === ' ') {
        nextUserInput = userInput + ' ';
        }
        else {
          nextUserInput = userInput + '-';
        }
      } else if (key.length === 1 && key !== ' ') {
        nextUserInput = userInput + event.key;
      } else if (key === 'Backspace') {
        nextUserInput = userInput.slice(0, -1);
      } else {
        return;
      }

      if (key !== 'Backspace' && key !== inputString[nextUserInput.length - 1] && key !== ' ') {
        addIncorrect(inputString[nextUserInput.length - 1]);
      }
      else if (key === ' ' && ' ' !== inputString[nextUserInput.length - 1]) {
        addIncorrect(inputString[nextUserInput.length - 1]);
      }
      else if (key === inputString[nextUserInput.length - 1]) {
        addCorrect(inputString[nextUserInput.length - 1]);
      }



      setUserInput(nextUserInput);

      if (key === 'Enter' && !modalOpen) {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [gameState, startGame, userInput, inputString, addIncorrect, addCorrect, modalOpen]);




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



