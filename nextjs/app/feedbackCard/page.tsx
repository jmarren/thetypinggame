import React from 'react';
import Card from '@/components/Card';
import FeedbackCard from '@/components/FeedbackCard';
import type { Feedback } from '@/types';

const Page: React.FC = () => {

 
const feedback: Feedback = {
  totalMistakes: 0,
  accuracy: '84%', 
  mistypedChars: '13', 
  wordsPerMinute: '45', 
  backspaceUsage: 10, 
};

//  width={'500px'} height={'500px'}
  return (
    <FeedbackCard feedback={feedback} />


    // <Card width={'500px'} height={'500px'}>
    //     <div className='text-white'>
    //   {feedback}
    //     </div>
    // </Card>
  );
};

export default Page;
