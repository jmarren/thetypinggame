// gameUtils.ts    

import type { Feedback, KeyStats } from '@/types.d.ts'

export function initializeKeyStats(inputString: string): KeyStats {
    const stats = {
        keyData: {},
        gameStats: {
          totalTime: 0,
          totalCharacters: inputString.length,
          charactersPerSecond: 0,
          totalWords: inputString.split('-').length,
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
  //----------------------------------------------------------
  export function calculateCharactersPerLine(container) {
        const charWidth = 10; // Average width of a character in pixels
        return Math.floor(container.offsetWidth / charWidth);
  }
    //----------------------------------------------------------

  export function calculateLineHeight(container) {
    return parseFloat(getComputedStyle(container).lineHeight);
  }
    //----------------------------------------------------------

  export function incrementIncorrectCount(prevStats, char) {
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
}
    //----------------------------------------------------------

  export function finalizeStats(prevStats, totalTime, backspaceCount) {
     // Clone the previous state to avoid direct mutation
  const updatedStats = {
    ...prevStats,
    gameStats: {
      ...prevStats.gameStats,
      totalTime: totalTime
    }
  };

  // If backspaceCount is tracked outside keyStats, update it accordingly
  if (backspaceCount) {
    updatedStats.gameStats.backspaceCount = backspaceCount;
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

  return updatedStats;
}
    //----------------------------------------------------------

  export function analyzeData(keyStats) {
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
    // const feedback = {
    //   accuracy: `Accuracy: ${accuracy.toFixed(2)}%.`,
    //   mistypedChars: `Most Missed: ${mostMistyped.join(', ').replaceAll('●', 'space')}.`,
    //   typingSpeed: `Speed: ${wpm.toFixed(1)} words per minute.`,
    //   backspaceInfo: `Backspace: ${backspaceUsage} times.`
    // };
  
    const feedback: Feedback = {
      totalMistakes: totalMistakes,
      accuracy: accuracy.toFixed(2),
      mistypedChars: mostMistyped.join(', ').replaceAll('-', 'space'),
      wordsPerMinute: wpm.toFixed(1),
      backspaceUsage: backspaceUsage
    };

  


    return feedback;
}


export const submitGame = async (keyStats) => {

  const { keyData, gameStats } = keyStats;
  // console.log('submitting game data ------------')
  // console.log('keydata', keyData);
  // console.log('gamestats', gameStats);
  // console.log('-------------------')
  try {
    const response = await fetch('http://localhost:3004/submit-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({keyData, gameStats }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const message = await response.text();
    console.log(message);
  } catch (error) {
    console.error('Error submitting game data', error);
  }
};



