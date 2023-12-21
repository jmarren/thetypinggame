export enum ModalType {
    None,
    Leaderboard,
    Poems,
    Practice, 
    Account,
    Assessments,
}

export interface Feedback {
    totalMistakes: number;
    accuracy: string;
    mistypedChars: string;
    wordsPerMinute: string;
    backspaceUsage: number;
  };




export enum AssessmentType {
    None,
    EightFingers,
    HomeRow,
    TopRow,
    BottomRow,
    AllLetters,
    Numbers,
    Symbols,
    All,
}


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

  export type PrevStats = {
    keyData: KeyData;
    gameStats: {
      totalMistakes: number;
      // Add other properties if they exist
    };
  };
