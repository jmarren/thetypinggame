'use client'

import { useState, useEffect, useRef } from 'react'
import type { PrevStats, KeyData } from '../types.d.ts'


// export type KeyData = {
//     [key: string]: {
//       incorrect: number;
//       // Add other properties if they exist
//     };
//   };
  
export type PrevStats = {
  keyData: KeyData;
  gameStats: {
    totalMistakes: number;
    // Add other properties if they exist
  };
};

export interface KeyData {
  correct: number;
  incorrect: number;
  total: number;
}

export interface GameStats {
  totalTime: number;
  totalCharacters: number;
  charactersPerSecond: number;
  totalWords: number;
  wordsPerMinute: number;
  totalMistakes: number;
  backspaceCount: number;
}

export interface KeyStats {
  keyData: Record<string, KeyData>;
  gameStats: GameStats;
}


export type Feedback = {
  accuracy: string;
  mistypedChars: string;
  wordsPerMinute: string;
  backspaceUsage: number;
};



function initializeKeyStats(inputString: string) {
  const stats = {
    keyData: {},
    gameStats: {
      totalTime: 0,
      totalCharacters: inputString.length,
      charactersPerSecond: 0,
      totalWords: inputString.split('●').length,
      wordsPerMinute: 0,
      totalMistakes: 0,
      backspaceCount: 0
    }
  };

  for (let char of inputString) {
    if (!stats.keyData[char]) {
      stats.keyData[char] = { correct: 0, incorrect: 0, total: 0 };
    }
    stats.keyData[char].total += 1;
  }

  return stats;
}





const TypingGame2 = ({modalOpen}) => {
const inputString = 'This is a test to see if my typing game is working properly. Lets find out! Lorem ipsum dolor sit amet.'

const templateString = inputString.replaceAll(' ', '●')
const [feedback, setFeedback] = useState({
  accuracy: ``,
  mistypedChars: ``,
  typingSpeed: ``,
  backspaceInfo: ``
});
const textContainerRef = useRef(null); // Ref for the text container
const [userInput, setUserInput] = useState('')
const [matching, setMatching] = useState('');
const [incorrect, setIncorrect] = useState('');
const [remaining, setRemaining] = useState(templateString)
const [gameInactive, setGameInactive] = useState(true);
const [gameCompleted, setGameCompleted] = useState(false)
const backspaceCount = useRef(0);
const [elapsedTime, setElapsedTime] = useState(0);
const [totalTime, setTotalTime] = useState<Number | null>(null)  
const [keyStats, setKeyStats] = useState(initializeKeyStats(templateString));
const [statsFinalized, setStatsFinalized] = useState(false);
const gameStatsRef = useRef<HTMLDialogElement>(null);
const [feedbackReady, setFeedbackReady] = useState(false)
 


useEffect(() => {
    let interval;

    if (!gameInactive) {
        // Start the timer
        interval = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000); // Increment elapsed time every second
    } else {
        // Game over, reset the timer
        setElapsedTime(0);
    }

    return () => clearInterval(interval); // Cleanup on component unmount
}, [gameInactive]);





useEffect(() => {
  const calculateCharactersPerLine = (container) => {
    // Approximate characters per line - this might need adjustments
    const charWidth = 10; // Average width of a character in pixels
    return Math.floor(container.offsetWidth / charWidth);
  };


  const calculateLineHeight = (container) => {
    // You might need a more accurate way to calculate this
    return parseFloat(getComputedStyle(container).lineHeight);
  };


  if (textContainerRef.current) {
    const container = textContainerRef.current;
    const totalCharactersPerLine = calculateCharactersPerLine(container);
    const currentLine = Math.floor(userInput.length / totalCharactersPerLine);
    const lineHeight = calculateLineHeight(container);

    // Scroll to the current line
    container.scrollTop = currentLine * lineHeight;
  }


  const incrementIncorrectCount = (char: string) => {
    setKeyStats((prevStats: PrevStats) => {
      // Check if the character exists in the keyData stats
      if (prevStats.keyData[char]) {
        return {
          ...prevStats,
          keyData: {
            ...prevStats.keyData,
            [char]: {
              ...prevStats.keyData[char],
              incorrect: prevStats.keyData[char].incorrect + 1
            }
          },
          gameStats: {
            ...prevStats.gameStats,
            totalMistakes: prevStats.gameStats.totalMistakes + 1
          }
        };
      }
  
      // If the character doesn't exist in keyData, return the previous state
      return prevStats;
    });
  };
  

    if (userInput.length < 1) return;


    let correct = ''
    let wrong = ''
    let i = 0;  

    while (i < userInput.length) {
        if (templateString[i] === userInput[i] && wrong.length === 0) {
            correct = correct + templateString[i];
            i++;
        } else {
            wrong = wrong + userInput[i]
            i++
        }
    }
    if (wrong.length > incorrect.length) {
      incrementIncorrectCount(remaining[0])
    }

    setMatching(correct);
    setIncorrect(wrong);

}, [userInput]);

useEffect(() => {
    console.log(keyStats)

}, [keyStats]);

useEffect(() => {




  function finalizeStats(totalTime) {
    setKeyStats(prevStats => {
      // Clone the previous state to avoid direct mutation
      const updatedStats = {
        ...prevStats,
        gameStats: {
          ...prevStats.gameStats,
          totalTime: totalTime
        }
      };
  
      // If backspaceCount is tracked outside keyStats, update it accordingly
      if (backspaceCount.current) {
        updatedStats.gameStats.backspaceCount = backspaceCount.current;
      }
  
      // Calculate characters per second
      if (totalTime > 0) {
        updatedStats.gameStats.charactersPerSecond = updatedStats.gameStats.totalCharacters / totalTime;
      } else {
        updatedStats.gameStats.charactersPerSecond = 0;
      }
  
      // Calculate words per minute
      const minutes = totalTime / 60;
      if (minutes > 0) {
        updatedStats.gameStats.wordsPerMinute = updatedStats.gameStats.totalWords / minutes;
      } else {
        updatedStats.gameStats.wordsPerMinute = 0;
      }
  
      console.log('FINAL STATS: ', updatedStats);
      return updatedStats;
    });
    setStatsFinalized(true);
  }

    setRemaining(templateString.substring(matching.length, templateString.length));
    if (matching === templateString) {
        setGameInactive(true)
        setTotalTime(elapsedTime)
        finalizeStats(elapsedTime)
        setGameCompleted(true)
    }

}, [matching]);


useEffect(() => {
  const analyzeData = (keyStats) => {
    const { keyData, gameStats } = keyStats;
  
    // Overall Accuracy
    const totalMistakes = gameStats.totalMistakes;
    const totalTyped = gameStats.totalCharacters;
    const accuracy = ((totalTyped - totalMistakes) / totalTyped) * 100;
  
    // Most Mistyped Characters
    let mostMistyped = Object.entries(keyData)
      .filter(([key, value]) => value.incorrect > 0)
      .sort(([key1, value1], [key2, value2]) => value2.incorrect - value1.incorrect)
      .map(([key,]) => key)
      .slice(0, 3); // Top 3 mistyped characters
  
    // Typing Speed
    const wpm = gameStats.wordsPerMinute;
  
    // Backspace Usage
    const backspaceUsage = gameStats.backspaceCount;
  
    // Construct feedback
    const feedback = {
      accuracy: `Accuracy: ${accuracy.toFixed(2)}%.`,
      mistypedChars: `Most Missed: ${mostMistyped.join(', ').replaceAll('●', 'space')}.`,
      typingSpeed: `Speed: ${wpm.toFixed(1)} words per minute.`,
      backspaceInfo: `Backspace: ${backspaceUsage} times.`
    };
  
    return feedback;
  };

  setFeedback(analyzeData(keyStats));
  setFeedbackReady(true)

  console.log(feedback);

  setStatsFinalized(false);



}, [statsFinalized]);


useEffect(() => {
  if (feedbackReady && gameCompleted && gameStatsRef.current) gameStatsRef.current.showModal();

  fetch('http://localhost:3004/submit-game', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },    
    credentials: 'include', // Necessary for cookies to be sent
    body: JSON.stringify(keyStats)
  })
  .then(data => console.log(data))
  .catch(error => console.error(error.message))

}, [gameCompleted]);


    return (
        <>
        <div className='flex-col'>
        <div className='w-full'>
          <dialog ref={gameStatsRef} className='p-10  rounded-lg shadow-md flex-col'>
            <div className='w-[80%]'>{feedback.accuracy}</div><div className='w-[80%]'>{feedback.mistypedChars}</div><div className='w-[80%]'>{feedback.typingSpeed}</div><div className='w-[80%]'>{feedback.backspaceInfo}</div>
            </dialog>
         <h1>{gameInactive ? 'Game Over' : 'Game In Progress'}</h1>
        <p>Elapsed Time: {elapsedTime} seconds</p>
        {gameInactive && totalTime ? <p>Time : {totalTime}s</p> : <></> }
        </div>
        <div className='flex items-center justify-center'>
            {gameInactive ? <div className='absolute z-10 text-xl'>Press Enter to Begin</div> : null}
        <div ref={textContainerRef} className={gameInactive ? ' w-[80vw] max-h-[25rem] text-3xl text-center p-10 leading-loose break-all overflow-y-scroll  rounded-xl blur-md' : ' text-center w-[80vw] max-h-[25rem] text-3xl  p-10 leading-loose break-all overflow-y-scroll  rounded-xl'} >
            <span className='text-green-700 bg-yellow-100 max-w-[80vw]'>{matching}</span>
            <span className='text-red-500 max-w-[80vw]'>{incorrect}</span>
            <span className='text-slate-200 max-w-[80vw]'>{remaining}</span>
        </div>
        </div> 
        </div>
        </>

    )
}

export default TypingGame2;