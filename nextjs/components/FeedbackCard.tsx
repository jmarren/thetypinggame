import React from 'react';
import Card from '@/components/Card';
import type { Feedback } from '@/types';


type FeedbackCardProps = {
    feedback: Feedback;
    };

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
    return (
        <Card >
            <div className=' p-4  font-[Sora] text-sm text-shadow-black '>
            <div className=' text-yellow-300 text-center text-2xl text-shadow-black'>Great Job!</div>
            <div className='  font-[Sora] text-sm flex  flex-col items-left justify-between  '>
               <hr className='my-4 text-blue-900' /> 
                <div className='relative flex justify-between'>
                    <span className='mx-2  text-yellow-300 text-shadow-black  '>
                        Accuracy 
                    </span>
                    <span className='mx-2 ml-20 text-white ' >
                        {feedback.accuracy}
                    </span></div>


                    <hr className='my-4 text-blue-900' /> 
                    


                <div className='relative flex justify-between'>
                    <span className='mx-2  text-yellow-300 text-shadow-black'>
                        Errors 
                    </span>
                    <span className='mx-2 ml-20 text-white' >
                        {feedback.mistypedChars}
                    </span>
                    </div>
                    <hr className='my-4 text-blue-900' /> 

                <div className='relative flex justify-between'>
                    <span className='mx-2  text-yellow-300 text-shadow-black'>
                        Words Per Minute 
                    </span>
                    <span className='mx-2 ml-20 text-white' >
                        {feedback.wordsPerMinute}
                    </span>
                    </div>
                    <hr className='my-4 text-blue-900' /> 

                <div className='relative flex justify-between'>
                    <span className='mx-2  text-yellow-300 text-shadow-black'>
                    Backspace 
                    </span>
                    <span className='mx-2 ml-20 text-white' >
                    {feedback.backspaceUsage}
                    </span>
                    </div>

                    {/* <hr className='my-4 text-blue-900' />  */}
            </div>
            </div>
        </Card>
    );
};

export default FeedbackCard;