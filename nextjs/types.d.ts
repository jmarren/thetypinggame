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


 
  export enum ModalType {
    None,
    Leaderboard,
    Poems,
    Practice, 
    Account
}