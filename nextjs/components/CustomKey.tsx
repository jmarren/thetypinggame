"use client";

import React, { useState, useEffect } from "react";

const CustomKey = ({ keyName, eventName }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === eventName || event.key.toUpperCase() === eventName) {
        setIsActive(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === eventName || event.key.toUpperCase() === eventName) {
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
  }, []);

  const toggleActive = () => {
    setIsActive((current) => !current);
  };

  return (
    <div className={isActive ? "customKeyActive" : "customKey"}>
      <div className="">{keyName}</div>
    </div>
  );
};
export default CustomKey;
