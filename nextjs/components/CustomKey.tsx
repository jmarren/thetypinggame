"use client";

import React, { useState, useEffect } from "react";
import {useAuth } from './AuthContext';

interface CustomKeyProps {
  keyName: string;
  eventName: string;
  keyColor?: string;
}

const CustomKey: React.FC<CustomKeyProps> = ({ keyName, eventName, keyColor }) => {
  const [isActive, setIsActive] = useState(false);




  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key && (event.key === eventName || event.key.toUpperCase() === eventName)) {
        setIsActive(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key && (event.key === eventName || event.key.toUpperCase() === eventName)) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [eventName]);

  const toggleActive = () => {
    setIsActive((current) => !current);
  };

  return (

    <div className={isActive ? "customKeyActive" : "customKey"}  style={{ backgroundColor: keyColor }}>
      <div className="">{keyName}</div>
    </div>

  );
};
export default CustomKey;