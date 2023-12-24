import React from 'react';
import Card from '@/components/Card';
import type { Feedback } from '@/types';
import ModalCard from './ModalCard';
// import { useState } from 'react';


type FeedbackCardProps = {
    feedback: Feedback;
    resetGame: () => void;
    toggleModal: () => void;
    };

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, resetGame, toggleModal }) => {
    return (
        <ModalCard toggleModal={toggleModal} >
            <div  className='text-white font-[Sora] text-sm text-shadow-black '>
            <div className=' text-center text-2xl text-shadow-black'>Great Job!</div>
            <div className='  font-[Sora] text-xs flex  flex-col items-left justify-between  '>
               <hr className='my-4 text-blue-900' /> 
                <div className='relative flex justify-between'>
                    <span className='mx-2  text-shadow-black  '>
                        Accuracy 
                    </span>
                    <span className='mx-2 ml-20 ' >
                        {feedback.accuracy}
                    </span>
                    </div>
                    <hr className='my-4 text-blue-900' /> 
                    


                <div className='relative flex justify-between'>
                    <span className='mx-2  text-shadow-black'>
                        Most Missed
                    </span>
                    <span className='mx-2 ml-20' >
                        {feedback.mistypedChars}
                    </span>
                    </div>
                    <hr className='my-4 text-blue-900' /> 

                <div className='relative flex justify-between'>
                    <span className='mx-2  text-shadow-black'>
                        Words Per Minute 
                    </span>
                    <span className='mx-2 ml-20' >
                        {feedback.wordsPerMinute}
                    </span>
                    </div>
                    <hr className='my-4 text-blue-900' /> 

                <div className='relative flex justify-between'>
                    <span className='mx-2  text-shadow-black'>
                    Mistakes
                    </span>
                    <span className='mx-2 ml-20' >
                    {feedback.totalMistakes}
                    </span>
                    </div>
                    <hr className='my-4 text-blue-900' /> 
                <div className='flex justify-center mt-2'>
                    <button className='p-2 px-4 w-[9rem] bg-blue-600 rounded-full hover:bg-blue-500 active:scale-95' onClick={resetGame}>
                        Play Again!
                    </button>
                </div>
            </div>
            </div>
        </ModalCard>
    );
};

export default FeedbackCard;