"use client";

import {useEffect, useRef, useState} from 'react';


const InputText = ({templateString}) => {
    const containerRef = useRef();
    const [userInput, setUserInput] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setUserInput((currentInput) => currentInput.slice(0, -1));
        } else if (event.key.length === 1) {
            setUserInput((currentInput) => currentInput + event.key);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, []);

    useEffect(() => {
        console.log('userInput: ', userInput)
    }, [userInput]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    const renderStyledString = (userInput, templateString) => {
        return (
            <div>
                {templateString.split('').map((char, index) => {
                    let style = {};
                    if (index < userInput.length) {
                        style.color = userInput[index] === char ? 'green' : 'red';
                    }
                    else {
                        style.visibility = 'hidden';
                    }
                    return <span key={index} style={style} className='whitespace-pre-wrap'>{userInput[index]}</span>;
                })}
            </div>
        );
    };
    return (  

        <div
        className="
        border 
        border-black
        absolute 
        py-[3rem]
        w-[90%]
        h-[80%]
        text-3xl
        leading-[8rem]
        "
         >

<div ref={containerRef}  className='break-words'> {/* tabIndex makes the div focusable */}
            {renderStyledString(userInput, templateString)}
        </div>
        </div> 
    )
}
export default InputText;



// useEffect(() => {
    
    //   const handleKeydown = (event) => {
    
    //   }
    
    //   const handleKeyup = (event) => {
    
    //   }
      
    
    //   window.addEventListener('keydown', handleKeydown );
    //   window.addEventListener('keyup', handleKeyup);
    
    //   return () => {
    //     window.removeEventListener('keydown', handleKeydown);
    //     window.removeEventListener('keyup', handleKeyup);
    //   }
    // }, []);