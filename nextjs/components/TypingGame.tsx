'use client'
import React, { useState, useEffect, useRef } from 'react';

const TypingGame = ({ templateString }) => {
    const [userInput, setUserInput] = useState("");
    const containerRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key.length === 1 || event.key === 'Backspace') {
            setUserInput((currentInput) => {
                if (event.key === 'Backspace') {
                    return currentInput.slice(0, -1);
                }
                return currentInput + event.key;
            });
        }
    };

    useEffect(() => {
        containerRef.current.focus();
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderText = (userInput, templateString) => {
        const paddedInput = userInput.padEnd(templateString.length, ' ');
        return templateString.split('').map((char, index) => {
            const inputChar = paddedInput[index];
            const color = inputChar === char ? 'green' : 'red';
            return (
                <div key={index} style={{ display: 'inline-block', width: '1ch', textAlign: 'center' }}>
                    <div style={{ color: 'black' }}>{char}</div>
                    <div style={{ color: inputChar.trim() ? color : 'transparent' }}>{inputChar}</div>
                </div>
            );
        });
    };

    return (
        <div ref={containerRef} style={{ outline: 'none' }}>
            <div style={{ fontFamily: 'monospace', textAlign: 'center', fontSize:'40px' }}>
                {renderText(userInput, templateString)}
            </div>
        </div>
    );
};

export default TypingGame;
