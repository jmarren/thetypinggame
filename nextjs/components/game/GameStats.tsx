"use client"


import type { Feedback } from "../../types.d.ts";
import FeedbackCard from "@/components/modals/FeedbackCard";





const GameStats: React.FC<{ feedback: Feedback, resetGame: ()=> void }> = ({ feedback, resetGame }) => {


  return (
    <div className='w-full h-full flex items-center justify-center border border-black'>
      <FeedbackCard feedback={feedback} resetGame={resetGame} />
    </div>
  )
  };

  export default GameStats;