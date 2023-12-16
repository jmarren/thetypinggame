import React, { useState, useEffect } from 'react';
import CardGrid from '../CardGrid';
import Slider from '../Slider';
import { AssessmentType } from '@/types';

interface AssessmentsProps {
  setText: (text: string) => void;
  toggleModal: () => void;
  updateAssessmentType: (type: AssessmentType) => void;
}

const Assessments: React.FC<AssessmentsProps> = ({setText, toggleModal, updateAssessmentType}) => {
    const [testSelected, setTestSelected] = useState(null);
    const [isTestSelected, setIsTestSelected] = useState(false);
    // const [lengthSelected, setLengthSelected] = useState('10');
    // const [isLengthSelected, setIsLengthSelected] = useState(false);


const fetchText = () => {
    if (!testSelected) return;
    console.log('fetching text')

    switch (testSelected) {
      case 'first-8':
        updateAssessmentType(AssessmentType.EightFingers);
        break;
      case 'home-row':
        updateAssessmentType(AssessmentType.HomeRow);
        break;
      case 'top-row':
        updateAssessmentType(AssessmentType.TopRow);
        break;
      case 'bottom-row':
        updateAssessmentType(AssessmentType.BottomRow);
        break;
      case 'all-letters':
        updateAssessmentType(AssessmentType.AllLetters);
        break;
      case 'numbers':
        updateAssessmentType(AssessmentType.Numbers);
        break;
      case 'symbols':
        updateAssessmentType(AssessmentType.Symbols);
        break;
      case 'all':
        updateAssessmentType(AssessmentType.All);
        break;
      default:
        updateAssessmentType(AssessmentType.None);
        break;
    }


    fetch(`http://localhost:3004/text/assessments/${testSelected}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
      console.log(data.text)
      setText(data.text)
      toggleModal()
      
    })
    .catch(error => console.error('Error:', error));
  }



const tests = [
    'first-8', 'home-row', 'top-row', 'bottom-row', 'all-letters', 'numbers', 'symbols', 'all'
];

    return ( <>
            <div className='text-3xl w-full text-left'>
                
                <>Assessments</> 
                <div className='flex flex-col mt-4 justify-center items-center'>
                {tests.map((test,i) => {
                    return (
                        <div key={i} className={test === testSelected ? 'text-lg font-[courier] bg-slate-200 w-full text-slate-400 border bg-yellow-200' : 'w-full text-lg font-[courier] bg-slate-200 text-slate-400 border border-slate-300'}><button className='w-full' onClick={() => setTestSelected(test)}>{test}</button></div>
                    )
                })}
                </div>
             </div>

           <div className='h-[2rem] w-full'>
            </div>

     


            <div className='flex items-center w-full justify-center'>
           <button 
           className=' w-[10rem]  bg-green-400 rounded-md py-2 px-3 text-sm active:scale-95 text-white hover:bg-green-300  active:ring active:ring-white'
           onClick={fetchText}
           >
             Take Assessment
            </button>
            </div>          
      </>)
};

export default Assessments;



           
