"use client"


import type { Feedback } from "@/types";
import FeedbackCard from "../FeedbackCard";





const GameStats: React.FC<{ feedback: Feedback }> = ({ feedback }) => {


  return (
    <div className='w-full h-full flex items-center justify-center border border-black'>
      <FeedbackCard feedback={feedback} />
      {/* <h1>Stats</h1>
      <p>Accuracy: {feedback.accuracy}</p>
      <p>Mistyped Characters: {feedback.mistypedChars}</p>
      <p>Words Per Minute: {feedback.wordsPerMinute}</p>
      <p>Backspace Usage: {feedback.backspaceUsage}</p> */}
    </div>
  )
  };

  export default GameStats;