// gameUtils.ts    

import type { Feedback, KeyStats } from '@/types.d.ts'

export function initializeKeyStats(inputString: string): KeyStats {
  // console.log(inputString); 
  // console.log(inputString.split('-').length)
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
  // export function calculateCharactersPerLine(container) {
  //       const charWidth = 10; // Average width of a character in pixels
  //       return Math.floor(container.offsetWidth / charWidth);
  // }
export function calculateCharactersPerLine(container) {
  // Create a temporary element
  const tempElement = document.createElement('span');
  tempElement.innerText = 'a'; // Use a common character
  tempElement.style.display = 'inline-block';
  tempElement.style.visibility = 'hidden'; // Hide the element

  // Append the element to the container
  container.appendChild(tempElement);

  // Measure the width of the element
  const charWidth = tempElement.offsetWidth;

  // Remove the element
  container.removeChild(tempElement);

  // Calculate and return the number of characters per line
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
          incorrect: prevStats.keyData[char].incorrect + 1,
          total: prevStats.keyData[char].total + 1
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


export function incrementCorrectCount(prevStats, char) {
  // Check if the character exists in the keyData stats
  if (prevStats.keyData[char]) {
    return {
      ...prevStats,
      keyData: {
        ...prevStats.keyData,
        [char]: {
          ...prevStats.keyData[char],
          correct: prevStats.keyData[char].correct + 1,
          total: prevStats.keyData[char].total + 1
        }
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
  try {
    const response = await fetch('http://localhost:3004/games/submit-game', {
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
    // console.log(message);
  } catch (error) {
    console.error('Error submitting game data', error);
  }
};



