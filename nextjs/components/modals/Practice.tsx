import React, { useState, useEffect } from 'react';
import CardGrid from '../CardGrid';
import Slider from '../Slider';
import { AssessmentType } from '@/types';
import XButton from '../XButton';

interface PracticeProps {
    setText: (text: string) => void;
    toggleModal: () => void;
    updateAssessmentType: (type: AssessmentType) => void;
}

const Practice: React.FC<PracticeProps> = ({ setText, toggleModal, updateAssessmentType }) => {
    const [charsSelected, setCharsSelected] = useState<string[]>([]);
    const [areCharsSelected, setAreCharsSelected] = useState(false);
    const [lengthSelected, setLengthSelected] = useState('10');




    const fetchText = () => {
        if (!areCharsSelected) return;
        console.log('fetching text')

        const chars = charsSelected.join('');
        const length = lengthSelected;

        fetch(`https://mechanicalturk.one/api/text/${chars}/${length}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.text)
                setText(data.text)
                toggleModal()
                updateAssessmentType(AssessmentType.None)
            })
            .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        if (charsSelected.length > 0) {
            setAreCharsSelected(true);
        } else {
            setAreCharsSelected(false);
        }
    }, [charsSelected]);

    const updateLength = (length: string) => {
        setLengthSelected(length);
    }



    const toggleSelectChars = (char: string) => {
        if (charsSelected.includes(char)) {
            setCharsSelected(charsSelected.filter((c) => c !== char));
        } else {
            setCharsSelected([...charsSelected, char]);
        }
    }

    // const lengthsAvailable = ['10', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'];
    const lengthsAvailable = ['10', '25', '50', '100', '150', '200', '500']

    const characters = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        '`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/',
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?', ' '
    ];

    return (<>
        <div className='text-3xl w-full text-left'>

            <>Choose the Characters You&apos;d like to Practice</>
            <CardGrid items={characters} toggleSelect={toggleSelectChars} selected={charsSelected} />
        </div>





        <div className='w-full h-[4.5rem]  flex items-end'>

            <div className='w-full'>
                <Slider options={lengthsAvailable} updateLength={updateLength} />

            </div>
        </div>
        <div className='h-[2rem] w-full'>
        </div>




        <div className='flex items-center w-full justify-center'>
            <button
                className=' w-[8rem]  bg-green-400 rounded-md py-2 px-3 text-xl active:scale-95 text-white hover:bg-green-300  active:ring active:ring-white'
                onClick={fetchText}
            >
                Create
            </button>
        </div>
    </>)
};

export default Practice;




